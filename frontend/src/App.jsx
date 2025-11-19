import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/signUp'
import Login from './pages/login'
import ForgotPassword from './pages/ForgotPassword'
import useGetCurrentUser from './hooks/useGetCurrent'
import { useSelector } from 'react-redux'
import Home from './pages/Home'

export const serverUrl = "http://localhost:8000"

function App() {
  useGetCurrentUser();
  const { userData, loading } = useSelector(state => state.user);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>

      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/" />}
      />

      <Route
        path="/login"
        element={!userData ? <Login /> : <Navigate to="/" />}
      />

      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to="/" />}
      />

      {/* HOME ROUTE MUST BE "/" */}
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/signup" />}
      />

    </Routes>
  );
}

export default App;
