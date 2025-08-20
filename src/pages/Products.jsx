import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { CartContext } from "../context/CartContext";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
    const [filtered, setFiltered] = useState([]); // <-- separate state for search results

  const { addToCart } = useContext(CartContext);

  const allProduct = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProduct(res.data);
            setFiltered(res.data); // initialize filtered with all products

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allProduct();
  }, []);

 const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();

    const searchResult = product.filter((item) =>
      item.title.toLowerCase().includes(query) // ✅ fixed typo
    );

    setFiltered(searchResult); // ✅ update state
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault(); // Stop <Link> navigation
    e.stopPropagation();
    addToCart(product); // ✅ Add product to cart
    toast.success("Product added to cart!");
  };

  // Skeleton Loader Component
  const ProductSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="h-64 bg-gray-200"></div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
        <div className="mt-auto flex items-center justify-between">
          <div className="h-5 bg-gray-200 rounded w-16"></div>
          <div className="h-8 bg-gray-200 rounded-xl w-20"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 lg:px-20 py-10">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          All Products
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Explore our collection of latest items and best sellers
        </p>
      </div>

   {/* Search Input */}
<div className="relative w-full md:w-1/2 lg:w-1/3 mx-auto mt-6">
  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
      />
    </svg>
  </span>
  <input
    onChange={handleSearch}
    type="text"
    placeholder="Search products..."
    className="w-full pl-12 pr-4 py-3 bg-white rounded-full shadow-sm border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
  />
</div>


      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {loading
          ? // Show 8 skeletons while loading
            Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          : filtered?.map((item) => (
              <Link to={`/product/${item.id}`} key={item.id}>
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                  {/* Product Image */}
                  <div className="h-64 flex items-center justify-center bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-60 object-contain p-4 transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="font-semibold text-lg text-gray-900 line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                      {item.description}
                    </p>

                    {/* Price & Button */}
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="text-xl font-bold text-indigo-600">
                        ${item.price}
                      </span>
                      <button
              onClick={(e) => handleAddToCart(item, e)}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Products;
