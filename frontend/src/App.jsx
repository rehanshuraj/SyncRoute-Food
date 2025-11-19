import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/signUp'
import Login from './pages/login'
import ForgotPassword from './pages/ForgotPassword'
import useGetCurrentUser from './hooks/useGetCurrent'
export const serverUrl = "http://localhost:8000"
function App() {
  useGetCurrentUser();
  return (
    <Routes>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
    </Routes>
  )
}

export default App
