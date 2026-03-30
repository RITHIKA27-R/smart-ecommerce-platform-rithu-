package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity // Yen? "Ithu oru DB Table" nu Spring-kitta solla.
@Table(name = "users") // Yen? MySQL-la table peru 'users'-nu irukanum.
@Data // Yen? Getter/Setter-ah Lombok automatic-ah ezhutha.
public class User {

    @Id // Yen? Ithu thaan Unique ID (Primary Key).
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Yen? ID 1, 2, 3-nu auto-increment aaga.
    private Long id;

    @Column(nullable = false) // Yen? Name illama register panna koodathu.
    private String name;

    @Column(unique = true, nullable = false) // Yen? Oru email-la oru user thaan irukanum.
    private String email;

    private String password;
    private String role; // Example: ADMIN or CUSTOMER
}