import React, { useContext, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
    const { cart } = useContext(CartContext);

const navigate = useNavigate()
  const handleLogout = ()=>{
    console.log("logout",localStorage.removeItem("token"));
    localStorage.removeItem("token");
  
    navigate("/")
    toast.error("Logout Successfully")

  }

  return (
    <nav className="bg-indigo-50 fixed w-full z-20 shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://icon-library.com/images/e-commerce-icon-png/e-commerce-icon-png-16.jpg"
            alt="Logo"
            className="h-10 w-10 mr-3"
          />
          <span className="text-gray-800 text-2xl font-bold">MyShop</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/cart" className="flex items-center space-x-2">
        <AiOutlineShoppingCart size={24} />
        <span>Cart ({cart.length})</span>
      </Link>
          <button onClick={handleLogout} className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
            <BiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-indigo-50">
          <div className="flex flex-col items-start px-6 py-4 space-y-3">
          <Link to="/cart" className="flex items-center space-x-2">
        <AiOutlineShoppingCart size={24} />
        <span>Cart ({cart.length})</span>
      </Link>
            <button onClick={handleLogout} className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
              <BiLogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
