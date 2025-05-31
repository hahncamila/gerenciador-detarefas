package com.desafio.taskmanager.repository;

import com.desafio.taskmanager.model.Task;
import com.desafio.taskmanager.model.TaskStatus;
// import com.desafio.taskmanager.model.User; 
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class TaskRepository implements PanacheRepository<Task> {

    public List<Task> filterTasks(TaskStatus status, LocalDate dueDate, Long userId) {
        StringBuilder query = new StringBuilder("1=1");
        Map<String, Object> params = new HashMap<>();


        if (userId != null) {
            query.append(" AND responsible.id = :userId");
            params.put("userId", userId);
        }
        if (status != null) {
            query.append(" AND status = :status");
            params.put("status", status);
        }
        if (dueDate != null) {
            query.append(" AND dueDate = :dueDate");
            params.put("dueDate", dueDate);
        }

        return find(query.toString(), params).list();
    }
}
