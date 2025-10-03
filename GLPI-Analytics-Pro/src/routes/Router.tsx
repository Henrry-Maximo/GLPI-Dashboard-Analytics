import { Navigate, Route, Routes } from "react-router-dom";

import { IsUserAuthenticated } from "../ProtectedRouter";

import { DefaultLayout } from "@/layout/DefaultLayout";
import { Analytics } from "@/pages/analytics";
import { Help } from "@/pages/help";
import { Home } from "@/pages/home";
import { Index } from "@/pages/login";
import { Monitoring } from "@/pages/monitoring";
import { Notifications } from "@/pages/notification";
import { Statistics } from "@/pages/statistics";
import { Settings } from "@/pages/system";
import { ListTickets } from "@/pages/tickets";


export const Router = () => {
  return (
    <Routes>
      {/* Rota de Login (padrão) */}
      <Route path="/" element={<Index />} />

      {/* Rotas internas protegidas */}
      <Route element={<IsUserAuthenticated />}>
        {/* Rotas internas após o login */}
        <Route path="/main" element={<DefaultLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="tickets" element={<ListTickets />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="notification" element={<Notifications />} />
          <Route path="help" element={<Help />} />
          <Route path="system" element={<Settings />} />
        </Route>

        <Route path="/monitoring" element={<Monitoring />} />
      </Route>

      {/* Redirecionamento para Login se rota não for encontrada (catch-all route) */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
