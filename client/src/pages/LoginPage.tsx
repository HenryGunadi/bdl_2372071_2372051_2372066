import React, { useState } from "react";
import axios from "axios";

type LoginPayload = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const [userType, setUserType] = useState<"admin" | "manager">("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    const payload: LoginPayload = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `http://localhost:8000/api/auth/login?role=${userType}`, // Include userType in the query string
        payload,
        { withCredentials: true }
      );

      const { token } = response.data;
      localStorage.setItem("token", token); // Save JWT in localStorage or sessionStorage
      alert("Login successful");
      window.location.href = "/"; // Redirect to home
    } catch (err) {
      console.error(err);
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">{userType === "admin" ? "Admin Login" : "Manager Login"}</h2>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your email" />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your password"
          />
        </div>

        {errorMessage && <div className="mt-4 text-red-600 text-center">{errorMessage}</div>}

        <button onClick={handleLogin} className="w-full px-4 py-2 mt-6 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
          Login
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Switch user type:</p>
          <div className="flex justify-center mt-2">
            <button className={`px-4 py-2 font-medium rounded-lg ${userType === "admin" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-800"}`} onClick={() => setUserType("admin")}>
              Admin
            </button>
            <button className={`px-4 py-2 ml-2 font-medium rounded-lg ${userType === "manager" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-800"}`} onClick={() => setUserType("manager")}>
              Manager
            </button>
          </div>
        </div>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-purple-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
