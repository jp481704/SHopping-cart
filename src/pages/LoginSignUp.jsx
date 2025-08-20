import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "../Validation/loginValidation";
import { toast } from "react-toastify";

const LoginSignUp = () => {
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting, setStatus }) => {
    try {
      const res = await axios.post("https://fakestoreapi.com/auth/login", values);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      navigate("/home"); // ✅ redirect to Home
    } catch (err) {
      setStatus("Invalid username or password!");
      console.error("Login Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-[900px] shadow-2xl rounded-2xl overflow-hidden bg-white">
        
        {/* Left Side - Image */}
        <div className="hidden md:block w-1/2">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
            alt="Shopping"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 flex flex-col p-10 justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back 👋</h2>
          <p className="text-gray-500 mb-6">Login to continue shopping with us</p>

          <Formik
            initialValues={{
              username: "mor_2314", // ✅ demo prefill
              password: "83r5^_",   // ✅ demo prefill
            }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, status }) => (
              <Form className="flex flex-col space-y-5">
                {/* Username */}
                <div>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Password */}
                <div>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* API Error */}
                {status && (
                  <div className="text-red-600 text-sm border border-red-200 bg-red-50 p-2 rounded">
                    {status}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-60"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
