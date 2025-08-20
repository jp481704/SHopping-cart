import { useState } from "react";
import "./App.css";
import LoginSignUp from "./pages/LoginSignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";

function App() {
  return (
    <>
    <CartProvider>
      <Router>
        {/* ✅ Navbar should be outside of Routes */}
        <Navbar />  

        <Routes>
          <Route path="/" element={<LoginSignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<Cart />} /> {/* New Cart route */}

        </Routes>
      </Router>

      {/* ✅ Toasts container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      </CartProvider>
    </>
  );
}

export default App;
