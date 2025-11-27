// src/components/Headers.jsx
import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth.js";
import handIcon from "../assets/hand_wave.png";
import libLogo from "../assets/LibImage.webp";
import LogoutPopUp from "./LogoutPopUp";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Home,
  BookOpen,
  Clock,
  User,
  ShoppingBag,
  LayoutDashboard,
} from "lucide-react";

const Headers = () => {
  const { user, setUser } = useAuth();
  const [profileOpen, setprofileOpen] = useState(false);
  const [showLogoutPopUp, setShowLogoutPopUp] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Detect current route
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      toast.warning("Please enter something to search!");
      return;
    }

    // Instead of calling API here, just update URL with search param
    navigate(`/?q=${encodeURIComponent(query.trim())}`);
    // Clear input if you like
    setQuery("");
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/logout",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.log(
        "Error during logout:",
        error.response?.data?.error || "Unknown error"
      );
    } finally {
      setShowLogoutPopUp(false);
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  const linksClasses = ({ isActive }) =>
    isActive ? "font-bold text-red-600" : "text-black font-sm";

  return (
    <div>
      {/* DESKTOP NAVBAR */}
      <nav className="hidden md:flex fixed bg-white shadow-gray-400 w-full h-25 items-center justify-between px-7 top-0 left-0 z-50 shadow-lg transition-all mb-20">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-14 object-cover rounded-xl cursor-pointer"
            src={libLogo}
            alt="logo"
            onClick={() => navigate("/")}
          />
          {user && (
            <h1 className="text-2xl font-bold text-black flex items-center gap-2">
              <img src={handIcon} alt="wave" className="h-6" />
              Hey {user.fullname}
            </h1>
          )}
        </div>

        {isHome && (
          <form onSubmit={handleSearch} className="flex gap-1 w-1/3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-5 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search books by title, genre, or author..."
            />
            <button
              type="submit"
              className="bg-gray-500 px-5 py-2 rounded-lg text-white font-semibold hover:bg-gray-600 transition cursor-pointer"
            >
              Search
            </button>
          </form>
        )}

        <ul className="flex flex-row gap-4 font-semibold items-center">
          <li>
            <NavLink to="/" className={linksClasses}>
              Home
            </NavLink>
          </li>
          {!user ? (
            <>
              <li>
                <NavLink to="/about" className={linksClasses}>
                  About
                </NavLink>
              </li>
              <li className="login-con">
                <NavLink to="/login" className={linksClasses}>
                  Sign In
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard" className={linksClasses}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/borrowed" className={linksClasses}>
                  Borrowed
                </NavLink>
              </li>
              <li>
                <NavLink to="/returned" className={linksClasses}>
                  Returned
                </NavLink>
              </li>
              <div
                className="relative inline-block"
                onMouseEnter={() => setprofileOpen(true)}
                onMouseLeave={() => setprofileOpen(false)}
              >
                <button className="bg-green-700 text-white rounded-full flex justify-center cursor-pointer items-center h-8 w-8 overflow-hidden">
                  {user.profilephoto ? (
                    <img
                      src={user.profilephoto}
                      alt="profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    user.username?.charAt(0).toUpperCase()
                  )}
                </button>

                {profileOpen && (
                  <div className="right-0 w-40 bg-gray-600 border-0 rounded-lg shadow-lg fixed">
                    <ul>
                      <li>
                        <NavLink
                          to="/profile"
                          className="block px-4 py-2 text-white hover:bg-gray-700"
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/mypurchases"
                          className="block px-4 py-2 text-white hover:bg-gray-700"
                        >
                          My Purchases
                        </NavLink>
                      </li>
                      <li>
                        <hr className="my-1 border-gray-500" />
                      </li>
                      <li>
                        <button
                          onClick={() => setShowLogoutPopUp(true)}
                          className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 cursor-pointer"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </ul>
      </nav>

      {/* MOBILE HEADER & Bottom Nav (same logic) */}
      {/* ... rest of your mobile navbar code unchanged ... */}

      {showLogoutPopUp && (
        <LogoutPopUp
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutPopUp(false)}
        />
      )}
    </div>
  );
};

export default Headers;
