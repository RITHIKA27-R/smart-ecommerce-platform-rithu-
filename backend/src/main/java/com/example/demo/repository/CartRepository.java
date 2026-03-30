package com.example.demo.repository;

import com.example.demo.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying; // 👈 Ithu Delete-ku venum
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    @Query(value = "SELECT * FROM cart_items WHERE user_email = :email", nativeQuery = true)
    List<Cart> findByUserEmail(@Param("email") String email);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM cart_items WHERE user_email = :email", nativeQuery = true)
    void deleteByUserEmail(@Param("email") String email);
}