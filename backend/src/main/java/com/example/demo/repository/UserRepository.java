package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // Yen? Ithu oru Database access component nu Spring-ku solla.
// UserRepository.java
public interface UserRepository extends JpaRepository<User, Long> {
    // Spring Data JPA automatic-ah intha query-ah ezhuthidum
    User findByEmailAndPassword(String email, String password);
}