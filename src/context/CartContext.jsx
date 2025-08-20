import React, { createContext, useState, useEffect } from "react";

// 1. Create context
export const CartContext = createContext();

// 2. Create provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    
    // Initialize from localStorage if available
    const storedCart = localStorage.getItem("cart");
    console.log(storedCart, "storedCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prev) => {
      // Check if item already exists
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,

        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  console.log(product,"jay pro")

  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
