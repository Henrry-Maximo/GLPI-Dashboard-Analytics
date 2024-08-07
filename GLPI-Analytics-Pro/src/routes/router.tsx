import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import Index from '../pages/login'
import MonitoringTicket from '../pages/monitoring'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Index />} />
        <Route path="/monitoring" element={<MonitoringTicket />} />

        <Route path="*" element={<Navigate to="/login" replace></Navigate>} />
      </Routes>
    </BrowserRouter>
  )
}
