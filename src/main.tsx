import { createRoot } from "react-dom/client";
import "./index.css";

import { locale, addLocale } from "primereact/api";
import App from "./App";

import esLocal from "./common/locale/es_local";
locale("es");
addLocale("es", esLocal);

const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);
