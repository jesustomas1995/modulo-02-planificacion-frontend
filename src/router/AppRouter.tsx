import CategoriaPage from "../module/catalogo/categoria/CategoriaPage";
import { createBrowserRouter } from "react-router";
import MainLayout from "@/shared/layout/MainLayout";

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
        ],
      },
    ],
  },
]);
// Ruta para No Autorizado (401)
export default router;
