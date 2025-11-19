import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

export default function ForgotPassword() {

  const [step, setStep] = useState(1); // 1 = Email, 2 = OTP, 3 = New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handlesendOtp =async () => {
    try{
        const result= await axios.post(`${serverUrl}/api/auth/sendOtp`,{email},{withCredentials:true});
        console.log("OTP sent successfully:", result.data);
        setStep(2)
    }catch(err){
      console.log("Error sending OTP:", err);
    }
  }
  const handleVerifyOtp =async () => {
    try{
        const result= await axios.post(`${serverUrl}/api/auth/verifyOtp`,{email,otp},{withCredentials:true});
        console.log("OTP verified successfully:", result.data);
        setStep(3)
    }catch(err){
      console.log("Error sending OTP:", err);
    }
  }
  const handleResetPassword =async () => {
    if(newPassword!==confirmPassword){
      alert("Passwords do not match");
      return;
    }
    try{
        const result= await axios.post(`${serverUrl}/api/auth/resetPassword`,{email,newPassword},{withCredentials:true});
        console.log("OTP verified successfully:", result.data);
        setStep(3)
        navigate("/login");
    }catch(err){
      console.log("Error sending OTP:", err);
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
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
          Forgot Password 🔒
        </h2>

        {/* ------- STEP 1: ENTER EMAIL ------- */}
        {step === 1 && (
          <>
            <p className="text-center text-gray-700 mb-6">
              Enter your email to receive an OTP.
            </p>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                onChange={(e)=>setEmail(e.target.value)}
                autoComplete="off"
                value={email}
                type="email"
                className="w-full mt-1 px-4 py-2 border rounded-lg 
                focus:outline-none focus:border-orange-500"
                placeholder="you@example.com"
              />
            </div>

            <button
              onClick={handlesendOtp}
              className="w-full bg-orange-600 text-white py-2 rounded-lg 
              font-semibold hover:bg-orange-700 cursor-pointer"
            >
              Send OTP
            </button>

            <p className="text-center text-gray-700 mt-4">
              Remember your password?
              <Link
                to="/login"
                className="text-orange-600 font-semibold hover:underline ml-1 cursor-pointer"
              >
                Go Back to Login
              </Link>
            </p>
          </>
        )}

        {/* ------- STEP 2: ENTER OTP ------- */}
        {step === 2 && (
          <>
            <p className="text-center text-gray-700 mb-6">
              Enter the OTP sent to your email.
            </p>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">OTP</label>
              <input
                onChange={(e)=>setOtp(e.target.value)}
                value={otp}
                type="text"
                maxLength={6}
                className="w-full mt-1 px-4 py-2 border rounded-lg 
                focus:outline-none focus:border-orange-500"
                placeholder="Enter 6-digit OTP"
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-orange-600 text-white py-2 rounded-lg 
              font-semibold hover:bg-orange-700 cursor-pointer"
            >
              Verify OTP
            </button>

            <p className="text-center text-gray-700 mt-4 cursor-pointer">
              Didn’t receive OTP?{" "}
              <span className="text-orange-600 font-semibold hover:underline">
                Resend OTP
              </span>
            </p>
          </>
        )}

        {/* ------- STEP 3: NEW PASSWORD ------- */}
        {step === 3 && (
          <>
            <p className="text-center text-gray-700 mb-6">
              Enter your new password.
            </p>

            {/* New Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                New Password
              </label>
              <input
                onChange={(e)=>setNewPassword(e.target.value)}
                value={newPassword}
                type="password"
                className="w-full mt-1 px-4 py-2 border rounded-lg 
                focus:outline-none focus:border-orange-500"
                placeholder="Enter new password"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Confirm Password
              </label>
              <input
                onChange={(e)=>setConfirmPassword(e.target.value)}   
                value={confirmPassword}
                type="password"
                className="w-full mt-1 px-4 py-2 border rounded-lg 
                focus:outline-none focus:border-orange-500"
                placeholder="Confirm new password"
              />
            </div>

            <button
              onClick={handleResetPassword}
              className="w-full bg-orange-600 text-white py-2 rounded-lg 
              font-semibold hover:bg-orange-700 cursor-pointer"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
