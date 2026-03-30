package com.example.demo.controller;

import com.example.demo.model.Cart;
import com.example.demo.service.CartService; // 👈 Service-ah import pannunga
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    private CartService cartService; // 👈 Repository-ku bathula Service-ah use pannunga!

    // 1. Get all items for a user
    @GetMapping("/{email:.+}") // 👈 Intha ':.+' illana kandippa 500 error varum
public List<Cart> getCart(@PathVariable("email") String email) {
    return cartService.getCartByEmail(email);
}
    // 2. Add or Update item
    @PostMapping("/add")
public Cart addToCart(@RequestBody Cart cartItem) { // 👈 Intha @RequestBody thaan JSON-ah Object-ah mathum
    return cartService.addToCart(cartItem);
}

    // 3. Delete all items - Ippo ithu kandippa work aagum!
    @DeleteMapping("/clear/{email}")
    public void clearCart(@PathVariable String email) {
        cartService.clearUserCart(email); // 👈 Ippo Service-la irukura @Transactional trigger aagum
    }
}