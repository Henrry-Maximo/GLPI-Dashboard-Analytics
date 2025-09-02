import { Navigate, Outlet } from 'react-router-dom';

// checar se jwt existe e retornar a string
const checkAuthenticatedJWT = () => {
  const userToken = sessionStorage.getItem('jwt');

  if (!userToken) {
    return null;
  }

  return userToken;
};

// se jwt existir, retornar usuário para home
export const IsUserAuthenticated = () => {
  const isAuth = checkAuthenticatedJWT();

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};


