import { Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRouter } from "../ProtectedRouter";
import DefaultLayout from "../layout/DefaultLayout";
import Analytics from "../pages/analytics";
import Help from "../pages/help";
import Home from "../pages/home";
import Index from "../pages/login";
import MonitoringTicket from "../pages/monitoring";
import Notification from "../pages/notification";
import Statistics from "../pages/statistics";
import System from "../pages/system";
import Tickets from "../pages/tickets";

export const Router = () => {
  return (
    <Routes>
      {/* Rota de Login (padrão) */}
      <Route path="/" element={<Index />} />

      {/* Rotas internas protegidas */}
      <Route element={<ProtectedRouter />}>
        {/* Rotas internas após o login */}
        <Route path="/main" element={<DefaultLayout />}>
          <Route path="home" element={<Home />} />

          <Route path="tickets" element={<Tickets />} />

          <Route path="statistics" element={<Statistics />} />

          <Route path="analytics" element={<Analytics />} />

          <Route path="notification" element={<Notification />} />

          <Route path="help" element={<Help />} />

          <Route path="system" element={<System />} />
        </Route>

        <Route path="monitoring" element={<MonitoringTicket />} />
      </Route>

      {/* Redirecionamento para Login se rota não for encontrada (catch-all route) */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
