/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Box,
	Typography,
	Grid,
	Card,
	CardContent,
	TextField,
	MenuItem,
	Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
	const [tarefas, setTarefas] = useState<any[]>([]);
	const [statusFiltro, setStatusFiltro] = useState("");
	const [usuarioFiltro, setUsuarioFiltro] = useState("");
	const [dataFiltro, setDataFiltro] = useState("");

	const fetchTarefas = async () => {
		try {
			const params: any = {};
			if (statusFiltro) params.status = statusFiltro;
			if (usuarioFiltro) params.responsavel = usuarioFiltro;
			if (dataFiltro) params.dueDate = dataFiltro;

			const res = await axios.get("http://localhost:8080/tasks", { params });
			setTarefas(res.data);
		} catch (err) {
			console.error("Erro ao buscar tarefas", err);
		}
	};

	useEffect(() => {
		fetchTarefas();
	}, []);

	const traduzirStatus = (status: string) => {
		switch (status) {
			case "PENDING":
				return "Pendente";
			case "IN_PROGRESS":
				return "Em andamento";
			case "COMPLETED":
				return "Concluída";
			case "CANCELLED":
				return "Cancelada";
			default:
				return status;
		}
	};

	const formatarData = (dataString: string) => {
		try {
			const data = new Date(dataString);
			if (isNaN(data.getTime())) return "Data inválida";
			return data.toLocaleDateString("pt-BR");
		} catch {
			return "Data inválida";
		}
	};

	const tarefasFiltradas = tarefas.filter((t) => {
		const statusMatch = statusFiltro ? t.status === statusFiltro : true;
		const usuarioMatch = usuarioFiltro
			? t.responsible?.username === usuarioFiltro
			: true;
		const dataMatch = dataFiltro
			? new Date(t.dueDate).toLocaleDateString() ===
			  new Date(dataFiltro).toLocaleDateString()
			: true;

		return statusMatch && usuarioMatch && dataMatch;
	});

	return (
		<Box>
			<Typography variant="h5" fontWeight={600} gutterBottom>
				Minhas Tarefas
			</Typography>

			<Box display="flex" gap={2} mb={3}>
				<TextField
					label="Filtrar por status"
					select
					size="small"
					value={statusFiltro}
					onChange={(e) => setStatusFiltro(e.target.value)}
					sx={{ minWidth: 200 }}>
					<MenuItem value="">Todos</MenuItem>
					<MenuItem value="PENDING">Pendente</MenuItem>
					<MenuItem value="IN_PROGRESS">Em andamento</MenuItem>
					<MenuItem value="COMPLETED">Concluída</MenuItem>
					<MenuItem value="CANCELLED">Cancelada</MenuItem>
				</TextField>

				<TextField
					label="Filtrar por usuário"
					select
					size="small"
					value={usuarioFiltro}
					onChange={(e) => setUsuarioFiltro(e.target.value)}
					sx={{ minWidth: 200 }}>
					<MenuItem value="">Todos</MenuItem>
					{[
						...new Set(
							tarefas.map((t) => t.responsible?.username).filter(Boolean)
						),
					].map((username) => (
						<MenuItem key={username} value={username}>
							{username}
						</MenuItem>
					))}
				</TextField>

				<TextField
					label="Filtrar por data de entrega"
					type="date"
					size="small"
					value={dataFiltro}
					onChange={(e) => setDataFiltro(e.target.value)}
					sx={{ minWidth: 200 }}
					InputLabelProps={{ shrink: true }}
				/>
				<Button
					variant="contained"
					onClick={fetchTarefas}
					sx={{ backgroundColor: "#A020F0", borderRadius: "20px" }}>
					Filtrar
				</Button>
			</Box>

			<Grid container spacing={2} mt={2}>
				{tarefasFiltradas.map((tarefa: any) => (
					<Grid key={tarefa.id} item xs={12} sm={6} md={4}>
						<Card>
							<CardContent>
								<Typography variant="h6" color="purple">
									{tarefa.title || "Sem título"}
								</Typography>
								<Typography>Status: {traduzirStatus(tarefa.status)}</Typography>
								<Typography>
									Responsável: {tarefa.responsible?.username || "Não atribuído"}
								</Typography>
								<Typography>
									Data de entrega: {formatarData(tarefa.dueDate)}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default Dashboard;
