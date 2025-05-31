import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { isAdmin } from "../services/authUtils";

const MainLayout = () => {
	const navigate = useNavigate();
	const [admin, setAdmin] = useState(false);

	useEffect(() => {
		setAdmin(isAdmin());
	}, []);

	return (
		<>
			<AppBar position="static">
				<Toolbar sx={{ flexGrow: 1, backgroundColor: "#A020F0", gap: 2 }}>
					<Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
						Gerenciador de Tarefas
					</Typography>
					<Button
						color="inherit"
						sx={{ border: "1px solid white", borderRadius: "20px" }}
						onClick={() => navigate("/dashboard")}>
						Lista de tarefas
					</Button>
					<Button
						color="inherit"
						sx={{ border: "1px solid white", borderRadius: "20px" }}
						onClick={() => navigate("/tasks/new")}>
						Nova Tarefa
					</Button>
					{admin && (
						<Button
							color="inherit"
							sx={{ border: "1px solid white", borderRadius: "20px" }}
							onClick={() => navigate("/users")}>
							Usuários
						</Button>
					)}
					<Button
						color="inherit"
						sx={{ border: "1px solid white", borderRadius: "20px" }}
						onClick={() => {
							localStorage.removeItem("token");
							navigate("/login");
							window.location.reload();
						}}>
						Sair
					</Button>
				</Toolbar>
			</AppBar>
			<Container sx={{ mt: 4 }}>
				<Outlet />
			</Container>
		</>
	);
};

export default MainLayout;
