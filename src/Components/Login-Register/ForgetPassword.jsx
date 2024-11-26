import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, sendPasswordResetEmail, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent! Please check your email.");
        signOut(auth).then(() => {
          navigate("/auth/login"); // Redirect to login
        });
      })
      .catch((error) => {
        console.error("Error resetting password:", error.message);
        toast.error("Failed to send password reset email. Please try again.");
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 border">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Enter your email address and we will send you a link to reset your password.
        </p>
        <form onSubmit={handleResetPassword} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Remembered your password?{" "}
          <span
            onClick={() => navigate("/auth/login")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
