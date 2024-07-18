import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from "../pages/main";
import Index from "../pages/login";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Main />} />
        <Route path="/login" element={<Index />} />

        <Route path="*" element={<Navigate to="/login" replace></Navigate>} />
      </Routes>
    </BrowserRouter>
  );
};
