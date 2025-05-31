import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../services/authService";

const RegisterAdmin = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);

	const handleRegister = async () => {
		setLoading(true);
		setError("");
		setSuccess("");
		try {
			await register(username, password, ["ADMIN"]);
			setSuccess("Administrador registrado com sucesso!");
			setUsername("");
			setPassword("");
			setTimeout(() => {
				navigate("/login");
				window.location.reload();
			}, 1500);
		} catch {
			setError("Erro ao registrar administrador.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box maxWidth={400} mx="auto" mt={10}>
			<Typography variant="h4" gutterBottom>
				Registrar Admin
			</Typography>

			{error && (
				<Typography color="error" variant="body2" mb={2}>
					{error}
				</Typography>
			)}

			{success && (
				<Typography color="primary" variant="body2" mb={2}>
					{success}
				</Typography>
			)}

			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleRegister();
				}}>
				<TextField
					label="Admin"
					fullWidth
					margin="normal"
					value={username}
					name="username"
					required
					onChange={(e) => setUsername(e.target.value)}
				/>

				<TextField
					label="Senha"
					type="password"
					fullWidth
					margin="normal"
					value={password}
					required
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Button
					variant="contained"
					fullWidth
					disabled={loading}
					sx={{ mt: 2, backgroundColor: "#A020F0", borderRadius: "20px" }}
					type="submit">
					{loading ? "Registrando…" : "Registrar Admin"}
				</Button>

				<Button
					variant="text"
					fullWidth
					sx={{
						mt: 2,
						backgroundColor: "#A020F0",
						borderRadius: "20px",
						color: "white",
					}}
					onClick={() => navigate("/")}>
					Voltar ao Login
				</Button>
			</form>
		</Box>
	);
};

export default RegisterAdmin;
