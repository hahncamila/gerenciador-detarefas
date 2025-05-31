package com.desafio.taskmanager.security;

import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Set;

@ApplicationScoped
public class JWTUtil {

    public String generateToken(String username, Set<String> roles) {
        return Jwt.issuer("taskmanager")
                .upn(username)
                .groups(roles)
                .sign();
    }
}
