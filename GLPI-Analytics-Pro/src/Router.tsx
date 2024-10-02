import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import MonitoringTicket from './pages/monitoring'
import Statistics from './pages/statistics'
import DefaultLayout from './layout/DefaultLayout'
import Index from './pages/login'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
      </Route>

      <Route path="/monitoring" element={<MonitoringTicket />} />
      {/* Rota de Login (padrão) */}
      <Route path="/login" element={<Index />} />

      {/* Redirecionamento para Login se rota não for encontrada */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
