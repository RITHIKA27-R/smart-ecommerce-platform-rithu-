import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await loginUser(credentials);
    
    if (user) {
        // 1. User details-ah browser-oda memory-la save panrom
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        
        alert("Welcome " + user.name + "!");
        
        // 2. Home page-ku navigate panrom
        navigate('/home'); 
    } else {
        alert("Email or Password thappu!");
    }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Welcome Back</h2>
                <p style={styles.subtitle}>Enter your details to access your account.</p>
                <form onSubmit={handleSubmit}>
                    <input style={styles.input} type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
                    <input style={styles.input} type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <button style={styles.button} type="submit">Sign In</button>
                </form>
                <p style={styles.footerText}>
                    New here? 
                    <span style={styles.link} onClick={() => navigate('/register')}> Create an account</span>
                </p>
            </div>
        </div>
    );
};

// Same styles used for consistency
const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', backgroundColor: 'rgb(7, 6, 7)' },
    card: { width: '400px', padding: '40px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' },
    title: { fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '10px' },
    subtitle: { fontSize: '14px', color: '#666', marginBottom: '25px' },
    input: { display: 'block', width: '100%', padding: '14px', margin: '15px 0', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box', fontSize: '15px' },
    button: { width: '100%', padding: '14px', backgroundColor: '#000', color: '#ff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' },
    footerText: { marginTop: '20px', fontSize: '14px', color: '#555' },
    link: { color: '#007bff', cursor: 'pointer', fontWeight: 'bold', marginLeft: '5px', textDecoration: 'underline' }
};

export default Login;