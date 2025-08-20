import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const singleProductFetch = async () => {
    try {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    singleProductFetch();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
        {loading ? (
          // 🔹 Skeleton Loader
          <div className="animate-pulse flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 h-64 bg-gray-300 rounded-xl"></div>
            <div className="flex-1 space-y-4">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-10 bg-gray-300 rounded w-32"></div>
            </div>
          </div>
        ) : (
          // 🔹 Product Details
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image */}
            <div className="md:w-1/2 flex justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-72 h-72 object-contain rounded-lg shadow-md"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
              <p className="text-gray-600 text-sm">{product.category}</p>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              <p className="text-2xl font-semibold text-green-600">${product.price}</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
