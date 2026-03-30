import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Cart from './components/Cart'; // 1. Itha marakkama add pannunga!
import Success from './components/Success';

function App() {
  return (
    <Router>
      {/* 2. Intha div-ah remove pannitaen, illana Home page design kolaru aagum */}
      <div style={{ minHeight: '100vh', backgroundColor: '#000000' }}>
        <Routes>
          {/* path="/" nu kudutha, mofala Register kaatum */}
          <Route path="/" element={<Register />} />
          
          <Route path="/login" element={<Login />} />
          
          <Route path="/register" element={<Register />} />

          <Route path="/home" element={<Home />} />
          
          <Route path="/cart" element={<Cart />} />

          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;