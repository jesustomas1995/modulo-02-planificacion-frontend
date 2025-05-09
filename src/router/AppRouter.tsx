import { createBrowserRouter } from "react-router";

import MainLayout from "@/shared/layout/MainLayout";

import CategoriaPage from "../module/catalogo/categoria/CategoriaPage";
import MarcaPage from "../module/catalogo/marca/MarcaPage";
import ProductoPage from "../module/catalogo/producto/ProductoPage";
import ProveedorPage from "@/module/catalogo/proveedor/ProveedorPage";
import UsuarioPage from "@/module/seguridad/usuarios/UsuarioPage";
import PresupuestoPage from "@/module/planificacion/presupuesto/PresupuestoPage";
import CotizacionPage from "@/module/planificacion/cotizacion/CotizacionPage";
import ComprasPage from "@/module/planificacion/compras/ComprasPage";
import LoginPage from "@/module/seguridad/auth/page/LoginPage";
import PrivateRoute from "@/shared/pages/PrivateRoute";
import ErrorBoundary from "@/shared/pages/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <PrivateRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "admin",
        Component: MainLayout, // Página de "No autorizado"
        children: [
          {
            path: "catalogo",
            children: [
              {
                path: "categoria",
                Component: CategoriaPage, // Página de "No autorizado"
              },
              {
                path: "marca",
                Component: MarcaPage, // Página de "No autorizado"
              },
              {
                path: "producto",
                Component: ProductoPage, // Página de "No autorizado"
              },
              {
                path: "proveedor",
                Component: ProveedorPage, // Página de "No autorizado"
              },
            ],
          },
          {
            path: "seguridad",
            children: [
              {
                path: "usuario",
                Component: UsuarioPage, // Página de "No autorizado"
              },
            ],
          },
          {
            path: "planificacion",
            children: [
              {
                path: "presupuesto",
                Component: PresupuestoPage, // Página de "No autorizado"
              },
              {
                path: "cotizacion",
                Component: CotizacionPage, // Página de "No autorizado"
              },
              {
                path: "compras",
                Component: ComprasPage, // Página de "No autorizado"
              },
            ],
          },
        ],
      },
    ],
  },
]);
// Ruta para No Autorizado (401)
export default router;
