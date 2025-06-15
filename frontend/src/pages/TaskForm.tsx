import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { isAdmin } from "../services/authUtils";

interface User {
	username: string;
	id: number;
}

const TaskForm = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const [users, setUsers] = useState<User[]>([]);
	const [admin, setAdmin] = useState(false);
	const [username, setUsername] = useState<string>("");

	const [form, setForm] = useState({
		title: "",
		description: "",
		status: "PENDING",
		responsibleId: "",
		dueDate: "",
	});

	useEffect(() => {
		const token = localStorage.getItem("token");
		const base64Payload = token?.split(".")[1];
		const payload = base64Payload ? JSON.parse(atob(base64Payload)) : null;
		const usernameFromToken = payload?.upn;
		setUsername(usernameFromToken);
		const adminStatus = isAdmin();
		setAdmin(adminStatus);

		if (adminStatus) {
			axios
				.get("http://localhost:8080/users")
				.then((r) => setUsers(r.data))
				.catch(() => setUsers([]));
		}
		if (id) {
			axios.get(`http://localhost:8080/tasks/${id}`).then((r) => {
				const task = r.data;
				setForm({
					title: task.title || "",
					description: task.description || "",
					status: task.status || "PENDING",
					responsibleId: task.responsible?.id || "",
					dueDate: task.dueDate?.split("T")[0] || "",
				});
			});
		} else {
			if (!adminStatus) {
				axios
					.get("http://localhost:8080/users")
					.then((r) => {
						const user = r.data.find(
							(u: User) => u.username === usernameFromToken
						);
						if (user) {
							setForm((prev) => ({
								...prev,
								responsibleId: user.id,
							}));
						}
					})
					.catch(() => {});
			}
		}
	}, [id]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		try {
			if (id) {
				await axios.put(`http://localhost:8080/tasks/${id}`, form);
				alert("Tarefa atualizada com sucesso!");
			} else {
				await axios.post("http://localhost:8080/tasks", form);
				alert("Tarefa criada com sucesso!");
			}
			navigate("/dashboard");
		} catch (err) {
			console.error("Erro ao salvar tarefa", err);
			alert("Erro ao salvar tarefa");
		}
	};

	return (
		<Box width="100%">
			<Typography
				variant="h5"
				fontWeight={600}
				gutterBottom
				mb={6}
				textTransform={"uppercase"}
				color="purple"
				letterSpacing={2}
				textAlign="center">
				{id ? "Editar Tarefa" : "Criar Tarefa"}
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
			</TextField>

			{admin ? (
				<TextField
					select
					name="responsibleId"
					label="Responsável"
					fullWidth
					required
					error={!form.responsibleId}
					margin="normal"
					value={form.responsibleId}
					onChange={handleChange}>
					{users.map((u) => (
						<MenuItem key={u.id} value={u.id}>
							{u.username}
						</MenuItem>
					))}
				</TextField>
			) : (
				<TextField
					label="Responsável"
					fullWidth
					margin="normal"
					disabled
					value={username}
				/>
			)}

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
				sx={{
					mt: 2,
					mb: 4,
					backgroundColor: "purple",
					borderRadius: "20px",
					alignItems: "right",
					ml: "auto",
					display: "block",
				}}
				onClick={handleSubmit}>
				{id ? "Atualizar" : "Salvar"}
			</Button>
		</Box>
	);
};

export default TaskForm;
