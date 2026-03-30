package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController // Yen? Ithu oru Web API nu Spring-ku solla.
@RequestMapping("/api/users") // Yen? Intha URL-la thaan frontend pesum.
@CrossOrigin(origins = "http://localhost:5173") // Yen? Vite frontend-ah block pannama allow panna.
public class UserController {

    @Autowired // Yen? Service-ah connect panna.
    private UserService userService;

    // 1. User Register panna (Post Request)
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    // 2. Ella user-aiyum paaka (Get Request)
    @GetMapping("/all")
    public List<User> getAll() {
        return userService.getAllUsers();
    }

    // Login request-ah handle panna (Post Request)
    @PostMapping("/login")
        public User login(@RequestBody User user) { // Inga User object correct-ah irukanum
        return userService.loginUser(user.getEmail(), user.getPassword());
    }
}
