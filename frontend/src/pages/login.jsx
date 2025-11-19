import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth}  from "../firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice"; 

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(response.data));
      console.log("Login successful:", response.data);
      // navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      if (err?.response?.data?.message) setError(err.response.data.message);
      else setError("Login failed. Please check credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin= async ()=>{
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth,provider)
      console.log(result)
      try{
        const {data} = await axios.post(`${serverUrl}/api/auth/google-auth`,{

          email:result.user.email,
        },{withCredentials:true});
        dispatch(setUserData(data));
      }catch(err){
        console.log("Error during google login:", err);
      }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
          Welcome Back 🍽️
        </h2>

        <form onSubmit={onSubmit} noValidate>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold">
              Email
            </label>
            <input
              id="email"
              name="email"
              autoComplete="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="you@example.com"
              aria-label="Email"
            />
          </div>

          {/* Password */}
          <div className="mb-1">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              autoComplete="current-password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Enter your password"
              aria-label="Password"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mb-4">
            <Link
              to="/forgot-password"
              className="text-sm text-orange-600 hover:underline cursor-pointer"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-3 text-sm text-red-600" role="alert">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:bg-orange-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg mt-4 hover:bg-gray-100 cursor-pointer"
          type="button"
          aria-label="Login with Google"
        >
          <img
            src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
            className="w-6 h-6"
            alt="google"
          />
          <span>Login with Google</span>
        </button>

        {/* Divider */}
        <div className="text-center mt-4 text-gray-600">or</div>

        {/* Create Account */}
        <p className="text-center text-gray-700 mt-3">
          Don't have an account?
          <Link
            to="/signup"
            className="text-orange-600 font-semibold cursor-pointer hover:underline ml-1"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
