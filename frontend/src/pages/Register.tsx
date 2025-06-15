import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
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

		if (!username.trim() || !password.trim()) {
			setError("Preencha todos os campos.");
			setLoading(false);
			return;
		}

		try {
			await register(username, password);
			setSuccess("Usuário registrado com sucesso!");
			setUsername("");
			setPassword("");
			setTimeout(() => {
				navigate("/login");
			}, 1500);
		} catch {
			setError("Erro ao registrar usuário.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box maxWidth={400} mx="auto" mt={10}>
			<Typography
				variant="h5"
				fontWeight={600}
				gutterBottom
				mb={6}
				textTransform={"uppercase"}
				color="purple"
				letterSpacing={2}
				textAlign="center">
				Registrar Usuário
			</Typography>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleRegister();
				}}>
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
					margin="normal"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

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

				<Button
					variant="contained"
					fullWidth
					disabled={loading}
					sx={{ mt: 2, backgroundColor: "purple", borderRadius: "20px" }}
					type="submit">
					{loading ? "Registrando…" : "Registrar"}
				</Button>

				<Button
					variant="contained"
					fullWidth
					sx={{ mt: 2, backgroundColor: "purple", borderRadius: "20px" }}
					onClick={() => navigate("/login")}>
					Voltar ao login
				</Button>
			</form>
		</Box>
	);
};

export default Register;
