import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../components/Api.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp) return toast.warning("Enter your OTP!");

    try {
      setLoading(true);
      const res = await api.post("/auth/verify-otp", {
        email,
        otp,
      });

      toast.success(res.data.message);

      // ✅ Store reset token in localStorage
      localStorage.setItem("resetToken", res.data.resetToken);

      // ✅ Navigate to reset-password page
      navigate("/reset-password");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          📩 Verify OTP
        </h2>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer font-semibold py-2 rounded-lg"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
