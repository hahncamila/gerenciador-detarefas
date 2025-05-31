package com.desafio.taskmanager.controller;

import com.desafio.taskmanager.model.Role;
import com.desafio.taskmanager.model.User;
import com.desafio.taskmanager.service.UserService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.Map;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
//@RolesAllowed("ADMIN")
public class UserController {

    @Inject
    UserService userService;

    public static class UserRequest {
        public String username;
        public String password;
        public Role role;
    }

    @GET
    public List<User> listAll() {
        return userService.listAll();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Long id) {
        return userService.findById(id)
                .map(user -> Response.ok(user).build())
                .orElse(Response.status(Response.Status.NOT_FOUND).build());
    }

    @POST
    public Response create(UserRequest req) {
        try {
            User user = userService.createUser(req.username, req.password, req.role);
            return Response.status(Response.Status.CREATED).entity(user).build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(Map.of("error", e.getMessage())).build();
        }
    }

    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") Long id, UserRequest req) {
        try {
            User user = userService.updateUser(id, req.username, req.password, req.role);
            return Response.ok(user).build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(Map.of("error", e.getMessage())).build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        userService.deleteUser(id);
        return Response.noContent().build();
    }
}
