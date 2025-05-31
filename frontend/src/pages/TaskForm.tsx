import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
// import { apiWithAuth, register } from "../services/authService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
	username: string;
	id: number;
}

const TaskForm = () => {
	const navigate = useNavigate();
	const [users, setUsers] = useState<User[]>([]);
	const [form, setForm] = useState({
		title: "",
		description: "",
		status: "PENDING",
		responsibleId: "",
		dueDate: "",
	});

	// const [isAdmin, setIsAdmin] = useState("");
	// const [username] = useState("");
	// const [password] = useState("");

	// register(username, password, ["ADMIN"]).then((isAdmin) => {
	// 	setIsAdmin(isAdmin);
	// });

	useEffect(() => {
		// apiWithAuth()
		// 	.get("/users")
		// 	.then((r) => setUsers(r.data));

		axios.get("http://localhost:8080/users").then((r) => setUsers(r.data));
	}, []);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = (e: any) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		try {
			// await apiWithAuth().post("/tasks", form);
			await axios.post("http://localhost:8080/tasks", form);
			alert("Tarefa salva com sucesso!");
			navigate("/dashboard");
		} catch (err) {
			console.error("Erro ao salvar tarefa", err);
		}
	};

	return (
		<Box maxWidth={600}>
			<Typography variant="h5" fontWeight={600} gutterBottom>
				Criar ou Editar Tarefa
			</Typography>
			<TextField
				name="title"
				label="Título"
				fullWidth
				required
				error={!form.title}
				margin="normal"
				value={form.title}
				onChange={handleChange}
			/>
			<TextField
				name="description"
				label="Descrição"
				fullWidth
				multiline
				required
				error={!form.description}
				rows={4}
				margin="normal"
				value={form.description}
				onChange={handleChange}
			/>
			<TextField
				name="status"
				label="Status"
				select
				fullWidth
				required
				error={!form.status}
				margin="normal"
				value={form.status}
				onChange={handleChange}>
				<MenuItem value="PENDING">Pendente</MenuItem>
				<MenuItem value="IN_PROGRESS">Em andamento</MenuItem>
				<MenuItem value="COMPLETED">Concluída</MenuItem>
				<MenuItem value="CANCELLED">Cancelada</MenuItem>
			</TextField>

			<TextField
				select
				name="responsibleId"
				label="Responsável"
				fullWidth
				margin="normal"
				value={form.responsibleId}
				onChange={handleChange}>
				{users.map((u) => (
					<MenuItem key={u.id} value={u.id}>
						{u.username}
					</MenuItem>
				))}
			</TextField>

			<TextField
				name="dueDate"
				label="Data de Finalização"
				type="date"
				fullWidth
				required
				error={!form.dueDate}
				margin="normal"
				InputLabelProps={{ shrink: true }}
				value={form.dueDate}
				onChange={handleChange}
			/>
			<Button
				variant="contained"
				sx={{ mt: 2, backgroundColor: "#A020F0", borderRadius: "20px" }}
				onClick={handleSubmit}>
				Salvar
			</Button>
		</Box>
	);
};

export default TaskForm;
