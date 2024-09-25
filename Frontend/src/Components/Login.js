import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../actions/authActions";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3005/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(loginSuccess(data.user));
        navigate("/profile"); // Redirect to profile page
      } else {
        dispatch(loginFailure(data.message || "Invalid credentials"));
        console.log("Invalid credentials"); // Log the failure
      }
    } catch (error) {
      dispatch(loginFailure("An error occurred. Please try again."));
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
