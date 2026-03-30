import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCartItems, clearDBCart, addToDBCart } from '../services/api'; 

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 1. Data-ah Fetch panna common function
    const fetchCartFromDB = async () => {
    setLoading(true); // Modal-la loading start panrom
    try {
        const savedUser = localStorage.getItem('loggedInUser');
        
        if (!savedUser) {
            console.error("User not found in LocalStorage");
            navigate('/login');
            return;
        }

        const loggedInUser = JSON.parse(savedUser);
        console.log("Fetching cart for:", loggedInUser.email);

        // API Call
        const data = await getCartItems(loggedInUser.email);
        
        console.log("Data from DB:", data);
        setCartItems(Array.isArray(data) ? data : []);

    } catch (error) {
        console.error("Cart Fetch Error:", error);
        alert("Server kooda connect panna mudiyala. Backend run aagudha nu paarunga!");
    } finally {
        // 👈 Ithu thaan "Loading" screen-ah remove pannum (Error vandhaalum varalanaalum)
        setLoading(false); 
    }
};

    useEffect(() => { 
        fetchCartFromDB(); 
    }, []);

    // 2. ➕/➖ QUANTITY CHANGE WITH DB SYNC
    const changeQuantity = async (item, delta) => {
        const newQty = item.quantity + delta;
        if (newQty < 1) return; 

        const updatedItem = { ...item, quantity: newQty };
        
        try {
            await addToDBCart(updatedItem); 
            fetchCartFromDB(); 
        } catch (error) {
            alert("Failed to update quantity");
        }
    };

    // 3. CHECKOUT NOW FUNCTION (Optimized)
    const handleCheckout = async () => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!user) {
            alert("Session expired. Please login again.");
            navigate('/login');
            return;
        }

        try {
            console.log("Clearing cart for:", user.email);
            await clearDBCart(user.email); // 👈 API call to Spring Boot
            navigate('/success');
        } catch (error) {
            console.error("Checkout Error:", error);
            alert("Checkout process failed. Backend-la @Transactional check pannunga!");
        }
    };

    // 4. DELETE SINGLE ITEM (Optional but good to have)
    const removeItem = async (item) => {
        // Ippo namma backend-la clearCart mattum thaan vachirukom. 
        // Single delete-ku munnadi quantity 0 panni check pannalam illa full clear thaan ippo logic.
        alert("Feature coming soon! Use Checkout to clear all.");
    };

    const totalBill = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (loading) return <div style={{color: 'white', padding: '50px', textAlign: 'center'}}>Loading Cloud Cart...</div>;

    return (
        <div style={styles.container}>
            <nav style={styles.navbar}>
                <h3 onClick={() => navigate('/home')} style={{cursor:'pointer', color:'#ccc'}}>← Back to Shop</h3>
                <h2 style={{color:'white'}}>My Cloud Cart ☁️</h2>
                <div style={{width: '80px'}}></div> {/* Spacer for alignment */}
            </nav>

            <div style={styles.content}>
                {cartItems.length > 0 ? (
                    <div style={styles.layout}>
                        {/* List of items */}
                        <div style={styles.list}>
                            {cartItems.map(item => (
                                <div key={item.id} style={styles.card}>
                                    <div style={{flex:1}}>
                                        <h3 style={{margin:0, color: '#333'}}>{item.productName}</h3>
                                        <p style={{margin: '5px 0', color: '#666'}}>₹{item.price}</p>
                                    </div>
                                    
                                    <div style={styles.controls}>
                                        <button onClick={() => changeQuantity(item, -1)} style={styles.qtyBtn}>-</button>
                                        <span style={{fontWeight:'bold', width:'30px', textAlign:'center'}}>{item.quantity}</span>
                                        <button onClick={() => changeQuantity(item, 1)} style={styles.qtyBtn}>+</button>
                                    </div>

                                    <button onClick={() => removeItem(item)} style={styles.delBtn}>🗑️</button>
                                </div>
                            ))}
                        </div>

                        {/* Summary Section */}
                        <div style={styles.summary}>
                            <h3 style={{marginTop: 0}}>Order Summary</h3>
                            <hr style={{border: '0.5px solid #eee'}}/>
                            <div style={{display: 'flex', justifyContent: 'space-between', margin: '15px 0'}}>
                                <span>Subtotal:</span>
                                <span>₹{totalBill}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontWeight: 'bold'}}>
                                <span>Total:</span>
                                <span style={{color: '#2ecc71', fontSize: '20px'}}>₹{totalBill}</span>
                            </div>
                            
                            <button 
                                style={styles.payBtn} 
                                onClick={handleCheckout}
                            >
                                Checkout Now
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={{textAlign:'center', color:'white', marginTop:'100px'}}>
                        <h2 style={{fontSize: '30px'}}>Your cart is empty! 🛒</h2>
                        <p style={{color: '#888'}}>Add some products from the home page.</p>
                        <button onClick={()=>navigate('/home')} style={{...styles.payBtn, width: '200px', marginTop: '20px'}}>Shop Now</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: { minHeight: '100vh', backgroundColor: '#000', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' },
    navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 50px', backgroundColor: '#111', borderBottom: '1px solid #222' },
    content: { padding: '40px' },
    layout: { display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px', maxWidth: '1100px', margin: '0 auto' },
    list: { display: 'flex', flexDirection: 'column', gap: '15px' },
    card: { backgroundColor: '#fff', padding: '20px', borderRadius: '12px', display: 'flex', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    controls: { display: 'flex', alignItems: 'center', gap: '15px', marginRight: '20px', backgroundColor: '#f8f8f8', padding: '5px 10px', borderRadius: '8px' },
    qtyBtn: { padding: '5px 12px', cursor: 'pointer', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', fontWeight: 'bold' },
    delBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '22px', marginLeft: '10px' },
    summary: { backgroundColor: '#fff', padding: '25px', borderRadius: '15px', height: 'fit-content', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' },
    payBtn: { width: '100%', padding: '15px', backgroundColor: '#2ecc71', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: '0.3s' }
};

export default Cart;