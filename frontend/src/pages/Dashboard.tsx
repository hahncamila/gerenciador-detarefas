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
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const navigate = useNavigate();
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
			const [ano, mes, dia] = dataString.split("-");
			return `${dia}/${mes}/${ano}`;
		} catch {
			return "Data inválida";
		}
	};

	const tarefasFiltradas = tarefas.filter((t) => {
		const statusMatch = statusFiltro ? t.status === statusFiltro : true;
		const usuarioMatch = usuarioFiltro
			? t.responsible?.username === usuarioFiltro
			: true;
		const dataMatch = dataFiltro ? t.dueDate === dataFiltro : true;

		return statusMatch && usuarioMatch && dataMatch;
	});

	return (
		<Box width="100%">
			<Typography variant="h5" fontWeight={600} gutterBottom mb={6}>
				Minhas Tarefas
			</Typography>

			<Box display="flex" gap={2} mb={3} flexWrap="wrap">
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
				<Button
					variant="outlined"
					onClick={() => {
						setStatusFiltro("");
						setUsuarioFiltro("");
						setDataFiltro("");
						fetchTarefas();
					}}
					sx={{
						borderRadius: "20px",
						borderColor: "#A020F0",
						color: "#A020F0",
					}}>
					Limpar filtros
				</Button>
			</Box>

			<Grid container spacing={2}>
				{tarefasFiltradas.map((tarefa: any) => (
					<Grid key={tarefa.id} item xs={12} width={"100%"}>
						<Card
							sx={{
								backgroundColor: "#E6E6FA",
								borderRadius: "20px",
								width: "100%",
							}}>
							<CardContent
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}>
								<Box>
									<Typography variant="h5" color="purple">
										{tarefa.title || "Sem título"}
									</Typography>
									<Typography maxWidth={"300px"}>
										<b>Descrição: </b> {tarefa.description || "Sem descrição"}
									</Typography>
									<Typography>
										<b>Status: </b> {traduzirStatus(tarefa.status)}
									</Typography>
									<Typography>
										<b>Responsável: </b>{" "}
										{tarefa.responsible?.username || "Não atribuído"}
									</Typography>
									<Typography>
										<b>Data de entrega: </b> {formatarData(tarefa.dueDate)}
									</Typography>
								</Box>

								<Box
									sx={{
										display: "flex",
										justifyContent: "flex-end",
										flexDirection: "column",
									}}>
									<Button
										variant="contained"
										sx={{
											mt: 2,
											backgroundColor: "#A020F0",
											borderRadius: "20px",
											height: "40px",
											ml: 4,
											mb: 2,
										}}
										onClick={() => navigate(`/tasks/${tarefa.id}/edit`)}>
										Editar tarefa
									</Button>
									<Button
										variant="outlined"
										sx={{
											borderRadius: "20px",
											height: "40px",
											borderColor: "#A020F0",
											color: "#A020F0",
										}}
										onClick={async () => {
											if (
												window.confirm(
													`Tem certeza que deseja excluir a tarefa "${tarefa.title}"?`
												)
											) {
												try {
													await axios.delete(
														`http://localhost:8080/tasks/${tarefa.id}`
													);
													fetchTarefas();
												} catch (error) {
													console.error("Erro ao excluir tarefa", error);
													alert("Erro ao excluir tarefa");
												}
											}
										}}>
										Excluir tarefa
									</Button>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default Dashboard;
