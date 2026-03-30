import axios from 'axios';

const USER_API = "http://localhost:8080/api/users";
const PRODUCT_API = "http://localhost:8080/api/products"; // Products-ku pudhu URL

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