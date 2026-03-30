import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) setCartItems(JSON.parse(savedCart));
    }, []);

    // Helper to save and update state
    const updateCart = (newCart) => {
        setCartItems(newCart);
        localStorage.setItem('cartItems', JSON.stringify(newCart));
    };

    // 1. QUANTITY CHANGE (MAP Use panrom)
    const changeQuantity = (id, delta) => {
        const newCart = cartItems.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                return { ...item, quantity: newQty > 0 ? newQty : 1 };
            }
            return item;
        });
        updateCart(newCart);
    };

    // 2. REMOVE ITEM (FILTER Use panrom)
    const removeItem = (id) => {
        const newCart = cartItems.filter(item => item.id !== id);
        updateCart(newCart);
    };

    // 3. TOTAL BILL (REDUCE Use panrom)
    const totalBill = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div style={styles.container}>
            <nav style={styles.navbar}>
                <h3 onClick={() => navigate('/home')} style={{cursor:'pointer', color:'#ccc'}}>← Back</h3>
                <h2 style={{color:'white'}}>My Smart Cart</h2>
            </nav>

            <div style={styles.content}>
                {cartItems.length > 0 ? (
                    <div style={styles.layout}>
                        <div style={styles.list}>
                            {cartItems.map(item => (
                                <div key={item.id} style={styles.card}>
                                    <div style={{flex:1}}>
                                        <h3 style={{margin:0}}>{item.name}</h3>
                                        <p>₹{item.price}</p>
                                    </div>
                                    
                                    <div style={styles.controls}>
                                        <button onClick={() => changeQuantity(item.id, -1)} style={styles.qtyBtn}>-</button>
                                        <span style={{fontWeight:'bold', width:'30px', textAlign:'center'}}>{item.quantity}</span>
                                        <button onClick={() => changeQuantity(item.id, 1)} style={styles.qtyBtn}>+</button>
                                    </div>

                                    <button onClick={() => removeItem(item.id)} style={styles.delBtn}>🗑️</button>
                                </div>
                            ))}
                        </div>

                        {/* Summary Section with Checkout Button */}
                        <div style={styles.summary}>
                            <h3>Total Bill</h3>
                            <hr/>
                            <h2 style={{color: '#2ecc71'}}>₹{totalBill}</h2>
                            
                            {/* Inga thaan namma pudhu button logic add pannirukkom */}
                            <button 
                                style={styles.payBtn} 
                                onClick={() => navigate('/success')}
                            >
                                Checkout Now
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={{textAlign:'center', color:'white', marginTop:'50px'}}>
                        <h2>Cart is empty!</h2>
                        <button onClick={()=>navigate('/home')} style={styles.payBtn}>Shop Now</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: { minHeight: '100vh', backgroundColor: '#000', color: '#333' },
    navbar: { display: 'flex', justifyContent: 'space-between', padding: '15px 50px', backgroundColor: '#111' },
    content: { padding: '30px' },
    layout: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' },
    list: { display: 'flex', flexDirection: 'column', gap: '15px' },
    card: { backgroundColor: '#fff', padding: '15px', borderRadius: '10px', display: 'flex', alignItems: 'center' },
    controls: { display: 'flex', alignItems: 'center', gap: '10px', marginRight: '20px' },
    qtyBtn: { padding: '5px 10px', cursor: 'pointer', backgroundColor: '#eee', border: 'none', borderRadius: '5px' },
    delBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' },
    summary: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', height: 'fit-content' },
    payBtn: { width: '100%', padding: '12px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }
};

export default Cart;