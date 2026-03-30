package com.example.demo.controller;

import com.example.demo.model.Cart;
import com.example.demo.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    // 1. Get all items for a user
    @GetMapping("/{email}")
    public List<Cart> getCart(@PathVariable String email) {
        return cartRepository.findByUserEmail(email);
    }

    // 2. Add or Update item in cart
    @PostMapping("/add")
    public Cart addToCart(@RequestBody Cart cartItem) {
        // Real-la quantity update check pannanum, ippo simplify panna direct save panrom
        return cartRepository.save(cartItem);
    }

    // 3. Delete all items after checkout
    @DeleteMapping("/clear/{email}")
    public void clearCart(@PathVariable String email) {
        cartRepository.deleteByUserEmail(email);
    }
}