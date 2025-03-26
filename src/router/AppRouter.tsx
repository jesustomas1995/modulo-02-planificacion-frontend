import { createBrowserRouter } from "react-router";

import MainLayout from "@/shared/layout/MainLayout";

import CategoriaPage from "../module/catalogo/categoria/CategoriaPage";
import MarcaPage from "../module/catalogo/marca/MarcaPage";
import ProductoPage from "../module/catalogo/producto/ProductoPage";
import ProveedorPage from "@/module/catalogo/proveedor/ProveedorPage";

const router = createBrowserRouter([
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
    ],
  },
]);
// Ruta para No Autorizado (401)
export default router;
