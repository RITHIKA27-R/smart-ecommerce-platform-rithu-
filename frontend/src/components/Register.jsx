import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'CUSTOMER' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            alert("Registration Success! Please Login.");
            navigate('/login'); // Success aana automatic-ah Login page-ku poidum
        } catch (error) {
            alert("Registration Failed! Check backend.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Create Account</h2>
                <p style={styles.subtitle}>Sign up to start your journey.</p>
                <form onSubmit={handleSubmit}>
                    <input style={styles.input} type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
                    <input style={styles.input} type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
                    <input style={styles.input} type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <button style={styles.button} type="submit">Sign Up</button>
                </form>
                <p style={styles.footerText}>
                    Already have an account? 
                    <span style={styles.link} onClick={() => navigate('/login')}> Login here</span>
                </p>
            </div>
        </div>
    );
};

// Styles object (Professional White Look)
const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', backgroundColor: '#f8f9fa' },
    card: { width: '400px', padding: '40px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #eee' },
    title: { fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '10px' },
    subtitle: { fontSize: '14px', color: '#666', marginBottom: '25px' },
    input: { display: 'block', width: '100%', padding: '14px', margin: '15px 0', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box', fontSize: '15px' },
    button: { width: '100%', padding: '14px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' },
    footerText: { marginTop: '20px', fontSize: '14px', color: '#555' },
    link: { color: '#007bff', cursor: 'pointer', fontWeight: 'bold', marginLeft: '5px', textDecoration: 'underline' }
};

export default Register;