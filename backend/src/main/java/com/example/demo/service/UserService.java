package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service // Yen? Ithu "Business Logic" irukura area nu Spring-ku solla.
public class UserService {

    @Autowired // Yen? Repository-ah inga auto-connect panna.
    private UserRepository userRepository;

    // User-ah save panna oru function
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    // Ella user-aiyum paaka oru function
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // User login panna oru logic
    // UserService.java
    public User loginUser(String email, String password) {
        // Direct-ah query panna prachana varaathu
        return userRepository.findByEmailAndPassword(email, password);
    }
}