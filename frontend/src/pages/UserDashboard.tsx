import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { userData, logout, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait until token is loaded (not undefined)
    if (token === null) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (token === undefined) {
    // Still loading the token from localStorage, show loading or blank
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!token) return null; // Just in case, or you can skip this line

  const getAvatar = () => {
    if (userData?.name) {
      return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        userData.name
      )}`;
    }
    return "https://i.pravatar.cc/150?img=8";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm text-center">
        <img
          src={getAvatar()}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500 object-cover"
        />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          {userData?.name.toUpperCase() || "Guest User"}
        </h2>
        <p className="text-gray-600 mt-1 text-sm">
          {userData?.email || "No Email Provided"}
        </p>
        <p className="text-xs text-gray-400 mt-2">Welcome to your dashboard</p>
        <button
          onClick={logout}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
