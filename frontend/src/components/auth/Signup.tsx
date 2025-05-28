import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const handleSignup = async (e:any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
        {name,
          email,
          password,
        }
      );
      const { token } = res.data;
      localStorage.setItem("token", token);
     // alert("Signup successful!");
      navigate("/login");
    } catch (err) {
        console.log(err)
        //@ts-ignore
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-blue-700 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white font-semibold py-2 rounded-md hover:bg-teal-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-teal-600 cursor-pointer font-medium hover:underline"
            onClick={() => navigate("/login")}
          >
            Log In{" "}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
