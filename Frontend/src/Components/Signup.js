import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3005/api/v1/signup", {
        email,
        name,
        password,
        role,
      });

      setSuccessMessage(
        response.data.message || "Account created successfully!"
      );
      setErrorMessage("");

      // Optionally, clear the form fields
      setEmail("");
      setName("");
      setPassword("");
      setRole("User");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while signing up."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              email:
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
              name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              role:
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Moderator">Moderator</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
        {successMessage && (
          <p className="mt-4 text-green-600">{successMessage}</p>
        )}

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
