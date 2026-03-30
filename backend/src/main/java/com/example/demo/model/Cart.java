package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Entity
@Table(name = "cart_items")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_email") // 👈 DB-la 'user_email' nu irukkuradhaala ithu must!
    private String userEmail; 

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_name")
    private String productName;

    private double price;
    private int quantity;
}