package com.desafio.taskmanager.service;

import com.desafio.taskmanager.model.User;
import com.desafio.taskmanager.model.Role;
import com.desafio.taskmanager.repository.UserRepository;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional; 
import org.mindrot.jbcrypt.BCrypt;

import java.util.HashSet;
import java.util.Set;

@ApplicationScoped
public class AuthService {

    @Inject
    UserRepository userRepository;

    @Transactional
    public User register(String username, String password, java.util.List<String> roles) {
    if (userRepository.findByUsername(username).isPresent()) {
        throw new RuntimeException("Username já existe");
    }

    User user = new User();
    user.setUsername(username);
    user.setPassword(BCrypt.hashpw(password, BCrypt.gensalt()));

    if (roles != null && roles.contains("ADMIN")) {
        user.setRole(Role.ADMIN);
    } else {
        user.setRole(Role.USER);
    }

    userRepository.persist(user);
    return user;
}


    public String login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!BCrypt.checkpw(password, user.getPassword())) {
            throw new RuntimeException("Senha incorreta");
        }

        Set<String> roles = new HashSet<>();
        roles.add(user.getRole().name());

        return Jwt.issuer("taskmanager")
        .upn(user.getUsername())
        .groups(roles)
        .signWithSecret("MySuperSecretSigningKey12345678901234");
    }
}
