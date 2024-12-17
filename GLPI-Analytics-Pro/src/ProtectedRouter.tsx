import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRouter() {
  const isAuth = userAuth();

  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

function userAuth() {
  const user = sessionStorage.getItem("jwt");

  return user && user;
}
