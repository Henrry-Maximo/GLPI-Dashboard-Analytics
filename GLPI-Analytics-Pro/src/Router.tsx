import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import MonitoringTicket from './pages/monitoring'
import Statistics from './pages/statistics'
import DefaultLayout from './layout/DefaultLayout'
import Index from './pages/login'

export const Router = () => {
  return (
    <Routes>
      <Route path="/albras" element={<DefaultLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="monitoring" element={<MonitoringTicket />} />
        <Route path="statistics" element={<Statistics />} />
      </Route>

      {/* Rota de Login (padrão) */}
      <Route path="/" element={<Index />} />

      {/* Redirecionamento para Login se rota não for encontrada */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
