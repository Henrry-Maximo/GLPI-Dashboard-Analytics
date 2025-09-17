import { Home } from "@/pages/home"
import { Login } from "@/pages/login"
import { Register } from "@/pages/register"
import { Routes, Route } from "react-router-dom"

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}
