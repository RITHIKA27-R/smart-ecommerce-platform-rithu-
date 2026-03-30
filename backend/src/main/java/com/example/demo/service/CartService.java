package com.example.demo.service;

import com.example.demo.model.Cart;
import com.example.demo.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // 👈 Delete panna ithu venum
import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    // 1. Get items for a specific user
    public List<Cart> getCartByEmail(String email) {
        return cartRepository.findByUserEmail(email);
    }

    // 2. Add or Update an item
    public Cart addToCart(Cart cartItem) {
        return cartRepository.save(cartItem);
    }

    // 3. Clear cart after successful order
    @Transactional // 👈 Ithu illana "TransactionRequiredException" varum
    public void clearUserCart(String email) {
        cartRepository.deleteByUserEmail(email);
    }
}