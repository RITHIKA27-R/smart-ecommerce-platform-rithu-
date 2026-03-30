import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>Smart eCommerce</div>
            <div style={styles.links}>
                <Link to="/login" style={styles.link}>Login</Link>
                <Link to="/register" style={styles.link}>Register</Link>
            </div>
        </nav>
    );
};

const styles = {
    nav: { display: 'flex', justifyContent: 'space-between', padding: '15px 50px', backgroundColor: '#f0000000', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', alignItems: 'center' },
    logo: { fontSize: '24px', fontWeight: 'bold', color: '#333' },
    links: { display: 'flex', gap: '20px' },
    link: { textDecoration: 'none', color: '#007bff', fontWeight: '500', fontSize: '16px' }
};

export default Navbar;