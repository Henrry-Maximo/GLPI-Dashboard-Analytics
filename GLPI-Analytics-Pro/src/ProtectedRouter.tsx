import { Navigate, Outlet } from 'react-router-dom';

// checar se jwt existe e retornar a string
const checkAuthenticatedJWT = () => {
  const userToken = sessionStorage.getItem('jwt');

  return userToken && userToken;
};

// se jwt existir, retornar usuário para home
export const IsUserAuthenticated = () => {
  const isAuth = checkAuthenticatedJWT();

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};


