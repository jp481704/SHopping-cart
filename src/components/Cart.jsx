import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  // Calculate total price
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-gray-500">${item.price}</p>

                <div className="flex items-center mt-2 space-x-2">
                  <button
                    onClick={() => {
                      addToCart(item);
                      toast.success("Increased quantity!");
                    }}
                    className="px-2 py-1 bg-indigo-600 text-white rounded"
                  >
                    +
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => {
                      if (item.quantity === 1) {
                        removeFromCart(item.id);
                        toast.error("Removed from cart!");
                      } else {
                        removeFromCart(item.id);
                      }
                    }}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-8 text-right">
          <h2 className="text-2xl font-bold">
            Total: ${total.toFixed(2)}
          </h2>
          <button className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
