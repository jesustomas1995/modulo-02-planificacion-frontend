import { TOKEN_KEY } from "@/common/constant/localstorage.constant";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem(TOKEN_KEY);

  // Si el token no existe, redirige al usuario a la página de inicio de sesión
  // TODO: adicionar para verificar si el token es valido
  if (!token) return <Navigate to="/login" replace />;

  // Si el token existe, renderiza la ruta protegida
  return <Outlet />;
};

export default PrivateRoute;
