import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, addToDBCart, getCartItems } from '../services/api';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]); 
    const navigate = useNavigate();

    // 1. Initial Load: Check User and Fetch Data
    useEffect(() => {
        const savedUser = localStorage.getItem('loggedInUser');
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            fetchInitialCart(parsedUser.email); 
        } else {
            navigate('/login');
        }

        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Products fetch error:", error);
            }
        };
        fetchProducts();
    }, [navigate]);

    // 2. Fetch Cart Items to show count in Navbar
    const fetchInitialCart = async (email) => {
        try {
            const data = await getCartItems(email);
            setCart(data);
        } catch (error) {
            console.error("Cart fetch error", error);
        }
    };

    // 3. ADD TO CART: The Main Fix is here!
    const handleAddToCart = async (product) => {
        if (!user) {
            alert("Please login first!");
            navigate('/login');
            return;
        }

        // Mapping variable names exactly as per Backend Cart.java
        const cartItem = {
            userEmail: user.email, 
            productId: product.id,   // product object-la 'id' irukanum
            productName: product.name,
            price: product.price,
            quantity: 1
        };

        console.log("Sending to Backend:", cartItem); 
        
        try {
            const response = await addToDBCart(cartItem);
            
            // Check if backend returned null or proper data
            console.log("Backend Success Response:", response.data);
            
            alert(`${product.name} added to your Cloud Cart! 🛒`);
            
            // Refresh the cart count in Navbar
            fetchInitialCart(user.email);
        } catch (error) {
            console.error("Cart API Error:", error.response?.data || error.message);
            alert("Failed to add to cart. Check if Backend is running or variables match!");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    };

    if (!user) return <div style={{color: 'white', padding: '20px'}}>Loading User Details...</div>;

    return (
        <div style={styles.container}>
            {/* Navigation Bar */}
            <nav style={styles.navbar}>
                <h2 style={{color: 'white', margin: 0, cursor: 'pointer'}} onClick={() => navigate('/home')}>Smart Store</h2>
                <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                    
                    <span 
                        onClick={() => navigate('/cart')} 
                        style={{color: '#FFD700', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px'}}
                    >
                        🛒 Cart: {cart.length}
                    </span>

                    <span style={{color: '#ccc'}}>Hi, <b style={{color: 'white'}}>{user.name}</b></span>
                    <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
                </div>
            </nav>

            {/* Main Content */}
            <div style={styles.content}>
                <h2 style={styles.title}>Explore Our Cloud Products</h2>
                <div style={styles.grid}>
                    {products.length > 0 ? (
                        products.map(p => (
                            <div key={p.id} style={styles.card}>
                                <div style={styles.imgPlaceholder}>📦</div>
                                <h3 style={{margin: '10px 0', color: '#333'}}>{p.name}</h3>
                                <p style={{color: '#666', fontWeight: 'bold', fontSize: '18px'}}>₹{p.price}</p>

                                <button 
                                    style={styles.addBtn}
                                    onClick={() => handleAddToCart(p)} 
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))
                    ) : (
                        <div style={{gridColumn: '1/-1', textAlign: 'center'}}>
                            <p style={{color: 'white'}}>No products found in Database. Please add some products!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { minHeight: '100vh', backgroundColor: '#000', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' },
    navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 50px', backgroundColor: '#111', borderBottom: '2px solid #222', position: 'sticky', top: 0, zIndex: 100 },
    logoutBtn: { backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' },
    content: { padding: '40px', maxWidth: '1200px', margin: '0 auto' },
    title: { color: 'white', textAlign: 'center', marginBottom: '40px', fontSize: '28px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' },
    card: { backgroundColor: '#fff', padding: '25px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.3)', transition: 'transform 0.3s' },
    imgPlaceholder: { height: '140px', backgroundColor: '#f9f9f9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px', fontSize: '50px' },
    addBtn: { width: '100%', padding: '12px', backgroundColor: '#2ecc71', color: 'white', borderRadius: '8px', cursor: 'pointer', border: 'none', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }
};

export default Home;