import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../services/api';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]); // 1️⃣ Itha state-ah add pannunga
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem('loggedInUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        } else {
            navigate('/login');
        }

        const fetchProducts = async () => {
            const data = await getAllProducts();
            setProducts(data);
        };
        fetchProducts();

        // 2️⃣ Refresh panna count pogaama irukka memory-la irunthu eduthu setCart-la podunga
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, [navigate]);

    // 3️⃣ Intha function-ah handleLogout mela ezhuthunga
    const addToCart = (product) => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Check if product already exists in cart
    const existingItem = savedCart.find(item => item.id === product.id);

    let updatedCart;
    if (existingItem) {
        // Quantity-ah mattum mathuroom
        updatedCart = savedCart.map(item => 
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
    } else {
        // Pudhusa quantity: 1 pottu add panroom
        updatedCart = [...savedCart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    alert("Quantity Updated!");
};

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    };

    // Home.jsx-la ithai mathunga:
if (!user) return <div style={{color: 'white', padding: '20px'}}>Loading User Details...</div>;

    return (
        <div style={styles.container}>
            {/* Navbar Section */}
            <nav style={styles.navbar}>
                <h2 style={{color: 'white', margin: 0}}>Smart Store</h2>
                <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                    
                    {/* 4️⃣ Navbar-la intha Cart span-ah add pannunga */}
                    <span 
                        onClick={() => navigate('/cart')} 
                        style={{color: '#FFD700', fontWeight: 'bold', cursor: 'pointer'}}
                    >
                        🛒 Cart: {cart.length}
                    </span>

                    <span style={{color: '#ccc'}}>Hi, {user.name}</span>
                    <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
                </div>
            </nav>

            {/* Product Section */}
            <div style={styles.content}>
                <h2 style={styles.title}>Explore Products</h2>
                <div style={styles.grid}>
                    {products.length > 0 ? (
                        products.map(p => (
                            <div key={p.id} style={styles.card}>
                                <div style={styles.imgPlaceholder}>📦</div>
                                <h3>{p.name}</h3>
                                <p>₹{p.price}</p>

                                {/* 5️⃣ Intha button-la onClick function-ah connect pannunga */}
                                <button 
                                    style={styles.addBtn}
                                    onClick={() => addToCart(p)}
                                >
                                    Add to Cart
                                </button>
                                
                            </div>
                        ))
                    ) : (
                        <p style={{color: 'white'}}>No products found. Add some in DB!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// Styles section-la Cart span-ku cursor: pointer kudukkurathu nallathu (mela pottutaen)
const styles = {
    container: { minHeight: '100vh', backgroundColor: '#000', fontFamily: 'Arial' },
    navbar: { display: 'flex', justifyContent: 'space-between', padding: '15px 50px', backgroundColor: '#111', borderBottom: '1px solid #333' },
    logoutBtn: { backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' },
    content: { padding: '40px' },
    title: { color: 'white', textAlign: 'center', marginBottom: '30px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '25px' },
    card: { backgroundColor: '#fff', padding: '20px', borderRadius: '15px', textAlign: 'center' },
    imgPlaceholder: { height: '120px', backgroundColor: '#f0f0f0', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', fontSize: '40px' },
    addBtn: { width: '100%', padding: '10px', backgroundColor: '#000', color: 'white', borderRadius: '8px', cursor: 'pointer', border: 'none', fontWeight: 'bold' }
};

export default Home;