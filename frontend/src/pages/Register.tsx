import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();

	const handleRegister = async () => {
		setError("");
		setSuccess("");

		try {
			await register(username, password);
			setSuccess("Usuário registrado com sucesso!");
			setUsername("");
			setPassword("");
			navigate("/login");
		} catch {
			setError("Erro ao registrar usuário.");
		}
	};

	return (
		<Box maxWidth={400} mx="auto" mt={10}>
			<Typography variant="h4" gutterBottom>
				Registrar usuário
			</Typography>
			<TextField
				label="Nome de usuário"
				fullWidth
				margin="normal"
				required
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<TextField
				label="Senha"
				type="password"
				fullWidth
				required
				margin="normal"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			{error && (
				<Typography color="error" mt={1}>
					{error}
				</Typography>
			)}
			{success && (
				<Typography color="primary" mt={1}>
					{success}
				</Typography>
			)}
			<Button
				variant="contained"
				fullWidth
				sx={{ mt: 2, backgroundColor: "#A020F0", borderRadius: "20px" }}
				onClick={handleRegister}>
				Registrar
			</Button>
		</Box>
	);
};

export default Register;
