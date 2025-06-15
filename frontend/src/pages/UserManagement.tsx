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
	Tooltip,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
	username: string;
	id: number;
	role: string;
}

const UserManagement = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [loggedUser, setLoggedUser] = useState<string>("");

	useEffect(() => {
		axios
			.get("http://localhost:8080/users")
			.then((r) => setUsers(r.data))
			.catch((err) => console.error("Erro ao buscar usuários", err));

		const token = localStorage.getItem("token");
		if (token) {
			const payload = JSON.parse(atob(token.split(".")[1]));
			setLoggedUser(payload.upn);
		}
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
			<Typography
				variant="h5"
				fontWeight={600}
				gutterBottom
				textTransform={"uppercase"}
				color="purple"
				letterSpacing={2}
				textAlign="center">
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
						backgroundColor: "#DCDCDC",
					}}>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell
									sx={{
										fontWeight: 600,
										color: "purple",
										textTransform: "uppercase",
									}}>
									Nome
								</TableCell>
								<TableCell
									sx={{
										fontWeight: 600,
										color: "purple",
										textTransform: "uppercase",
									}}>
									Tipo de usuário
								</TableCell>
								<TableCell
									sx={{
										fontWeight: 600,
										textAlign: "right",
										color: "purple",
										textTransform: "uppercase",
									}}>
									Remover usuário
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((user) => {
								const isSelf = user.username === loggedUser;
								return (
									<TableRow key={user.id}>
										<TableCell>{user.username}</TableCell>
										<TableCell>{user.role}</TableCell>

										<TableCell align="right">
											<Tooltip
												title={
													isSelf
														? "Você não pode remover seu próprio usuário"
														: "Remover usuário"
												}>
												<span>
													<IconButton
														onClick={() => handleDelete(user.id)}
														disabled={isSelf}>
														<Delete
															sx={{
																color: isSelf ? "gray" : "purple",
															}}
														/>
													</IconButton>
												</span>
											</Tooltip>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</Paper>
			</Box>
		</Box>
	);
};

export default UserManagement;
