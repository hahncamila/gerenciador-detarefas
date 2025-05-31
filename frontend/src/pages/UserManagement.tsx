/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Box,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	IconButton,
	Paper,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
	username: string;
	id: number;
}

const UserManagement = () => {
	const [users, setUsers] = useState<User[]>([]);
	useEffect(() => {
		// apiWithAuth()
		// 	.get("/users")
		// 	.then((r) => setUsers(r.data));

		axios.get("http://localhost:8080/users").then((r) => setUsers(r.data));
	}, []);

	const handleDelete = async (id: number) => {
		try {
			await axios.delete(`http://localhost:8080/users/${id}`);
			setUsers((prev) => prev.filter((u) => u.id !== id));
		} catch (err) {
			console.error("Erro ao deletar usuário", err);
		}
	};

	return (
		<Box>
			<Typography variant="h5" fontWeight={600} gutterBottom textAlign="left">
				Gestão de Usuários
			</Typography>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="50vh"
				p={2}>
				<Paper elevation={3} sx={{ width: "100%", maxWidth: 500, p: 3 }}>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: 600, borderBottom: "none" }}>
									Nome
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((user) => (
								<TableRow
									key={user.id}
									sx={{
										display: "flex",
										justifyContent: "space-between",
										borderBottom: "none",
									}}>
									<TableCell
										sx={{
											borderBottom: "none",
										}}>
										{user.username}
									</TableCell>
									<TableCell
										sx={{
											borderBottom: "none",
										}}>
										<IconButton onClick={() => handleDelete(user.id)}>
											<Delete />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Paper>
			</Box>
		</Box>
	);
};

export default UserManagement;
