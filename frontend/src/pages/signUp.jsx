import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const serverUrl = "http://localhost:8000";
import {auth}  from "../firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice"; 


export default function SignupPage() {

  const navigate = useNavigate();
  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [mobileNumber,setMobileNumber] = useState("");
  const [role,setRole] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e)=>{
     e.preventDefault();
    try{
        const result = await axios.post(`${serverUrl}/api/auth/signup`,{
          fullName,
          email,
          password,
          mobileNumber,
          role
        },{withCredentials:true});
        console.log("Signup successful:", result.data);
        dispatch(setUserData(result.data));
        navigate("/login");
    }catch(err){
      console.log("Error during signup:", err);
    }
  }

  const handleGoogleLogin= async ()=>{
    if(!mobileNumber){
      return alert("mobile number required")
    }
    if (!role){
      alert("Please select a role before continuing with Google signup");
      return;
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth,provider)
    console.log(result)
    try{
      const {data} = await axios.post(`${serverUrl}/api/auth/google-auth`,{
        fullName:result.user.displayName,
        email:result.user.email,
        mobileNumber,
        role : role || "Food Lover"
      },{withCredentials:true});
      dispatch(setUserData(data));
    }
    catch(err){
      console.log("Error during google signup:", err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-6" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1500&q=80')" }} >
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-orange-200">
        <h2 className="text-4xl font-bold mb-6 text-center text-orange-600 drop-shadow-sm">
          Join FoodExpress 🍔
        </h2>
        <p className="text-center text-gray-600 mb-6">Fast delivery, tasty food, best experience!</p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Full Name</label>
            <input
              onChange={(e)=>setFullName(e.target.value)}
              value={fullName}
              type="text"
              placeholder="Your full name"
              className="w-full border rounded-xl p-3 cursor-pointer bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Email</label>
            <input
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
              type="email"
              placeholder="Your email"
              className="w-full border rounded-xl p-3 cursor-pointer bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <input
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Create password"
              className="w-full border rounded-xl p-3 cursor-pointer bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Mobile Number</label>
            <input
              onChange={(e)=>setMobileNumber(e.target.value)}
              value={mobileNumber}
              type="text"
              placeholder="Your mobile number"
              className="w-full border rounded-xl p-3 cursor-pointer bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Select Role</label>
            <select className="w-full border rounded-xl p-3 cursor-pointer bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
              onChange={(e)=>setRole(e.target.value)}
              value={role}>
              <option value="">Select role</option>
              <option value="user">Food Lover 🍽️</option>
              <option value="owner">Restaurant Owner 🏪</option>
              <option value="deliveryBoy">Delivery Partner 🚴‍♂️</option>
            </select>
          </div>

          <button
            
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-orange-700 transition-all"
          >
            Create Account
          </button>
                  </form>

          {/* Google Signup */}
          <div className="mt-6">
            <button className="w-full flex items-center justify-center gap-3 cursor-pointer bg-white border border-gray-300 py-3 rounded-xl shadow hover:bg-gray-50 transition-all"
              onClick={handleGoogleLogin}>
              <img
                src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                alt="google"
                className="w-6 h-6"
              />
              <span className="font-medium text-gray-700">Sign Up with Google</span>
            </button>
          </div>

        <p className="text-center mt-5 text-gray-700 text-sm" onClick={()=>navigate("/login")}>
          Already registered? <span className="text-orange-600 font-semibold cursor-pointer">Login</span>
        </p>
      </div>
    </div>
  );
}
