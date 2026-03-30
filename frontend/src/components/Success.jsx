import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Order success aana udanae memory-la irukura cart-ah clear panrom
        localStorage.removeItem('cartItems');
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.icon}>🎉</div>
                <h1 style={{color: '#333'}}>Order Placed Successfully!</h1>
                <p style={{color: '#666'}}>Unga items seekiramae unga veetuku vandhurum.</p>
                <button 
                    onClick={() => navigate('/home')} 
                    style={styles.homeBtn}
                >
                    Back to Shopping
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: { 
        minHeight: '100vh', 
        backgroundColor: '#000', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        fontFamily: 'Arial'
    },
    card: { 
        backgroundColor: '#fff', 
        padding: '50px', 
        borderRadius: '20px', 
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(255,255,255,0.1)' 
    },
    icon: { fontSize: '60px', marginBottom: '20px' },
    homeBtn: { 
        marginTop: '30px', 
        padding: '12px 25px', 
        backgroundColor: '#000', 
        color: '#fff', 
        border: 'none', 
        borderRadius: '8px', 
        cursor: 'pointer',
        fontWeight: 'bold'
    }
};

export default Success;