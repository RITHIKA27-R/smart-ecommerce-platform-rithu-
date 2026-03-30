import axios from 'axios';

const USER_API = "http://localhost:8080/api/users";
const PRODUCT_API = "http://localhost:8080/api/products"; // Products-ku pudhu URL
const CART_API = "http://localhost:8080/api/cart";

export const registerUser = async (userData) => {
    return await axios.post(`${USER_API}/register`, userData);
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${USER_API}/login`, credentials);
        return response.data; // Ithu backend-la irunthu vara User object
    } catch (error) {
        console.error("Login Error:", error);
        return null; // Error vandha null-nu sollurom
    }
};

// Home page-la products kaata intha function venum
export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${PRODUCT_API}/all`);
        return response.data;
    } catch (error) {
        console.error("Products error:", error);
        return [];
    }
};

// 1. Backend-la irunthu Cart items-ah fetch panna
export const getCartItems = async (email) => {
    // email.trim() panna extra spaces delete aayidum
    const response = await axios.get(`${CART_API}/${email.trim()}`);
    return response.data;
};

// 2. Database-la pudhu item add panna
export const addToDBCart = async (cartItem) => {
    return await axios.post(`${CART_API}/add`, cartItem);
};

// 3. Checkout aana appram DB-ah clear panna
export const clearDBCart = async (email) => {
    return await axios.delete(`${CART_API}/clear/${email}`);
};

// Quantity-ah update panna (PUT request)
export const updateCartQuantity = async (id, quantity) => {
    return await axios.put(`${CART_API}/update/${id}?quantity=${quantity}`);
};