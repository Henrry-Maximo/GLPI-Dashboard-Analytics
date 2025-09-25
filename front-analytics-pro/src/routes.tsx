import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./pages/_layout/app";
import { Auth } from "./pages/_layout/auth";

import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Home } from "./pages/home";
import { Settings } from "./pages/settings";
import { Tickets } from "./pages/tickets";
import { Help } from "./pages/help";
import { Monitoring } from "./pages/monitoring";
import { Analytics } from "./pages/analytics";
import { Statistics } from "./pages/statistics";
import { ResetPassword } from "./pages/reset_password";

export function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Auth />}>
        <Route path="" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      <Route path="/home" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="monitoring" element={<Monitoring />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="help" element={<Help />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
