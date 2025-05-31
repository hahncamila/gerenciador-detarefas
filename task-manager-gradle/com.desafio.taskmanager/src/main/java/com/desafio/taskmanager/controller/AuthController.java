package com.desafio.taskmanager.controller;

import com.desafio.taskmanager.service.AuthService;
import com.desafio.taskmanager.model.User;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Map;

@Path("/auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AuthController {

    @Inject
    AuthService authService;

    @POST
    @Path("/register")
    public Response register(Map<String, Object> body) {
    String username = (String) body.get("username");
    String password = (String) body.get("password");

    java.util.List<String> roles = (java.util.List<String>) body.get("roles");
    User user = authService.register(username, password, roles);

    return Response.ok(Map.of(
        "id", user.getId(),
        "username", user.getUsername(),
        "roles", user.getRoles()
    )).build();
}
    @POST
    @Path("/login")
    public Response login(Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        String token = authService.login(username, password);

        return Response.ok(Map.of("token", token)).build();
    }

}
