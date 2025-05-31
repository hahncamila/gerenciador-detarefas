import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import TaskForm from "../pages/TaskForm";
import UserManagement from "../pages/UserManagement";
import MainLayout from "../layout/MainLayout";
import RegisterAdmin from "../pages/RegisterAdmin";

const AppRouter = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/register-admin" element={<RegisterAdmin />} />
			<Route element={<MainLayout />}>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/tasks/new" element={<TaskForm />} />
				<Route path="/tasks/:id/edit" element={<TaskForm />} />
				<Route path="/users" element={<UserManagement />} />
			</Route>
			<Route path="*" element={<Navigate to="/login" />} />
		</Routes>
	);
};

export default AppRouter;
