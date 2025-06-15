import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";

const Login = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		setLoading(true);
		setError("");

		try {
			await login(username, password);
			navigate("/dashboard");
			window.location.reload();
		} catch {
			setError("Usuário ou senha inválidos");
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
				Entrar
			</Typography>

			{error && (
				<Typography color="error" variant="body2" mb={2}>
					{error}
				</Typography>
			)}

			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleLogin();
				}}>
				<TextField
					label="Usuário"
					name="username"
					fullWidth
					margin="normal"
					value={username}
					required
					onChange={(e) => setUsername(e.target.value)}
				/>

				<TextField
					label="Senha"
					type="password"
					name="password"
					fullWidth
					required
					margin="normal"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Button
					disabled={loading}
					variant="contained"
					fullWidth
					sx={{ mt: 2, backgroundColor: "purple", borderRadius: "20px" }}
					type="submit">
					{loading ? "Entrando…" : "Entrar"}
				</Button>
			</form>

			<Button
				variant="contained"
				disabled={loading}
				fullWidth
				sx={{ mt: 2, backgroundColor: "purple", borderRadius: "20px" }}
				onClick={() => navigate("/register")}>
				Registrar
			</Button>

			<Button
				variant="outlined"
				fullWidth
				sx={{
					mt: 2,
					borderRadius: "20px",
					borderColor: "purple",
					color: "purple",
				}}
				onClick={() => navigate("/register-admin")}>
				Registrar Admin
			</Button>
		</Box>
	);
};

export default Login;
