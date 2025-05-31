package com.desafio.taskmanager.controller;

import com.desafio.taskmanager.model.Task;
import com.desafio.taskmanager.model.User;
import com.desafio.taskmanager.service.TaskService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Path("/tasks")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
// REMOVIDO @Authenticated
public class TaskController {

    @Inject
    TaskService taskService;

    // REMOVIDO @Inject UserController userController; 
    // REMOVIDO @Context SecurityIdentity securityIdentity;

    public static class TaskRequest {
        public String title;
        public String description;
        public String status;
        public Long responsibleId;
        public LocalDate dueDate;
    }

    // REMOVIDO private User getCurrentUser()

    @GET
    public List<Task> listTasks(@QueryParam("status") String status,
                                 @QueryParam("dueDate") String dueDateStr,
                                 @QueryParam("userId") Long userId) {
        LocalDate dueDate = null;
        if (dueDateStr != null && !dueDateStr.isEmpty()) {
            dueDate = LocalDate.parse(dueDateStr);
        }
        //REMOVIDO currentUser
        return taskService.listTasks(status, dueDate, userId);
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Long id) {
        return taskService.findById(id)
                .map(task -> Response.ok(task).build()) 
                .orElse(Response.status(Response.Status.NOT_FOUND).build());
    }

    @POST
    public Response create(TaskRequest req) {
        try {
            Task task = taskService.createTask(req.title, req.description, req.status, req.responsibleId, req.dueDate);
            return Response.status(Response.Status.CREATED).entity(task).build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(Map.of("error", e.getMessage())).build();
        }
    }

    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") Long id, TaskRequest req) {
        try {
            // REMOVIDO currentUser
            Task task = taskService.updateTask(id, req.title, req.description, req.status, req.responsibleId, req.dueDate);
            return Response.ok(task).build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(Map.of("error", e.getMessage())).build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        taskService.deleteTask(id);
        return Response.noContent().build();
    }
}