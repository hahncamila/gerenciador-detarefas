package com.desafio.taskmanager.service;

import com.desafio.taskmanager.model.Task;
import com.desafio.taskmanager.model.TaskStatus;
import com.desafio.taskmanager.model.User;
import com.desafio.taskmanager.model.Role;
import com.desafio.taskmanager.repository.TaskRepository;
import com.desafio.taskmanager.repository.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@ApplicationScoped
public class TaskService {

    @Inject
    TaskRepository taskRepository;

    @Inject
    UserRepository userRepository;

    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // REMOVIDO: User currentUser
    public List<Task> listTasks(String statusStr, LocalDate dueDate, Long userId) {
        TaskStatus status = null;
        if (statusStr != null && !statusStr.isEmpty()) {
            try {
                status = TaskStatus.valueOf(statusStr.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Status inválido: " + statusStr);
            }
        }

        // Sem autenticação
        return taskRepository.filterTasks(status, dueDate, userId);

    }

    public Optional<Task> findById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID não pode ser nulo");
        }
        return taskRepository.findByIdOptional(id);
    }

    // REMOVIDO: User currentUser
    public Optional<Task> findByIdForUser(Long id) { 
        Optional<Task> taskOpt = findById(id);
        // Sem autenticação, apenas retorna a task se for encontrada
        return taskOpt;
    }

    @Transactional
    public Task createTask(String title, String description, String statusStr, Long responsibleId, LocalDate dueDate) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Título é obrigatório");
        }
        if (description == null || description.trim().isEmpty()) {
            throw new IllegalArgumentException("Descrição é obrigatória");
        }
        if (responsibleId == null) {
            throw new IllegalArgumentException("Responsável é obrigatório");
        }

        TaskStatus status;
        try {
            status = statusStr != null ? TaskStatus.valueOf(statusStr.toUpperCase()) : TaskStatus.PENDING;
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Status inválido: " + statusStr);
        }

        User responsible = userRepository.findById(responsibleId);
        if (responsible == null) {
            throw new RuntimeException("Usuário responsável não encontrado");
        }

        Task task = new Task(title.trim(), description.trim(), responsible, dueDate, status);
        taskRepository.persist(task);
        return task;
    }

    @Transactional
    // REMOVIDO: User currentUser
    public Task updateTask(Long id, String title, String description, String statusStr,
                           Long responsibleId, LocalDate dueDate) {
        Task task = taskRepository.findById(id);
        if (task == null) {
            throw new RuntimeException("Tarefa não encontrada");
        }

        if (title != null && !title.trim().isEmpty()) {
            task.setTitle(title.trim());
        }
        if (description != null && !description.trim().isEmpty()) {
            task.setDescription(description.trim());
        }
        if (statusStr != null && !statusStr.isEmpty()) {
            try {
                TaskStatus status = TaskStatus.valueOf(statusStr.toUpperCase());
                task.setStatus(status);
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Status inválido: " + statusStr);
            }
        }
        if (dueDate != null) {
            task.setDueDate(dueDate);
        }
        if (responsibleId != null) {
            User responsible = userRepository.findById(responsibleId);
            if (responsible == null) {
                throw new RuntimeException("Usuário responsável não encontrado");
            }
            task.setResponsible(responsible);
        }

        return task;
    }

    @Transactional
    // REMOVIDO: User currentUser
    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id);
        if (task == null) {
            throw new RuntimeException("Tarefa não encontrada");
        }

        taskRepository.delete(task);
    }

    // REMOVIDO: User currentUser
    public Map<String, Object> getTaskStats() {
        List<Task> tasks = taskRepository.listAll(); // Sem autenticação

        long totalTasks = tasks.size();
        long pendingTasks = tasks.stream().filter(t -> t.getStatus() == TaskStatus.PENDING).count();
        long inProgressTasks = tasks.stream().filter(t -> t.getStatus() == TaskStatus.IN_PROGRESS).count();
        long completedTasks = tasks.stream().filter(t -> t.getStatus() == TaskStatus.COMPLETED).count();

        return Map.of(
                "total", totalTasks,
                "pending", pendingTasks,
                "inProgress", inProgressTasks,
                "completed", completedTasks
        );
    }
}