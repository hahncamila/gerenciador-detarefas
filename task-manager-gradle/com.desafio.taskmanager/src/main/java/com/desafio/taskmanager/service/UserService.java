package com.desafio.taskmanager.service;

import com.desafio.taskmanager.model.Role;
import com.desafio.taskmanager.model.User;
import com.desafio.taskmanager.repository.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import org.mindrot.jbcrypt.BCrypt;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class UserService {

    @Inject
    UserRepository userRepository;

    public List<User> listAll() {
        return userRepository.listAll();
    }

    public Optional<User> findById(Long id) {
        return userRepository.findByIdOptional(id);
    }

    public User createUser(String username, String password, Role role) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username já existe");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(BCrypt.hashpw(password, BCrypt.gensalt()));
        user.setRole(role != null ? role : Role.USER);
        userRepository.persist(user);

        return user;
    }
    public User updateUser(Long id, String username, String password, Role role) {
        User user = userRepository.findByIdOptional(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (username != null) user.setUsername(username);
        if (password != null) user.setPassword(BCrypt.hashpw(password, BCrypt.gensalt()));
        if (role != null) user.setRole(role);

        userRepository.persist(user);
        return user;
    }
    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
