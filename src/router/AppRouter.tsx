import CategoriaPage from "../module/catalogo/categoria/CategoriaPage";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/catalogo/categoria",
    Component: CategoriaPage, // Página de "No autorizado"
  },
]);
// Ruta para No Autorizado (401)
export default router;
