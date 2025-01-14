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
      const response = await axios.post("http://localhost:8000/api/auth/login", payload, { withCredentials: true });

      const { token, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-sky-500 to-sky-200">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">{userType === "admin" ? "Admin Login" : "Manager Login"}</h2>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        {errorMessage && <div className="mt-4 text-red-600 text-center">{errorMessage}</div>}

        <button onClick={handleLogin} className="w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
