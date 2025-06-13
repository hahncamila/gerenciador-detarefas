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
import { apiWithAuth } from "../services/authService";

interface User {
	username: string;
	id: number;
	role: string;
}

const UserManagement = () => {
	const [users, setUsers] = useState<User[]>([]);
	useEffect(() => {
		apiWithAuth()
			.get("/users")
			.then((r) => setUsers(r.data));
	}, []);

	const handleDelete = async (id: number) => {
		try {
			await apiWithAuth().delete(`/users/${id}`);
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
				<Paper
					elevation={3}
					sx={{
						width: "100%",
						maxWidth: 500,
						p: 3,
						backgroundColor: "#E6E6FA",
					}}>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: 600 }}>Nome</TableCell>
								<TableCell sx={{ fontWeight: 600 }}>Tipo de usuário</TableCell>
								<TableCell sx={{ fontWeight: 600, textAlign: "right" }}>
									Remover usuário
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((user) => (
								<TableRow key={user.id}>
									<TableCell>{user.username}</TableCell>
									<TableCell>{user.role}</TableCell>

									<TableCell align="right">
										<IconButton onClick={() => handleDelete(user.id)}>
											<Delete sx={{ color: "#A020F0" }} />
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
