import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

const MainLayout = () => {
  const router = useNavigate();

  const items = [
    {
      label: "Planificación",
      icon: "pi pi-money-bill",
      items: [
        {
          label: "Presupuesto",
          command: () => router(`planificacion/presupuesto`),
        },
        {
          label: "Cotizaciones",
          command: () => router(`planificacion/cotizacion`),
        },
        {
          label: "Compras",
          command: () => router(`planificacion/compras`),
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: "Catalogo",
      icon: "pi pi-th-large",
      items: [
        {
          label: "Categoría",
          command: () => router(`catalogo/categoria`),
        },
        {
          label: "Marca",
          command: () => router(`catalogo/marca`),
        },
        {
          label: "Producto",
          command: () => router(`catalogo/producto`),
        },
        {
          label: "Proveedor",
          command: () => router(`catalogo/proveedor`),
        },
      ],
    },
    {
      label: "Usuario",
      icon: "pi pi-users",
      command: () => router(`seguridad/usuario`),
    },
  ];

  const start = (
    <img alt="logo" src="/logo.png" height="40" className="mr-2"></img>
  );
  const end = (
    <div className="flex align-items-center gap-2">
      <Button
        label="Cerrar Sesión"
        severity="secondary"
        onClick={() => {
          localStorage.clear();
          router("/login");
        }}
      />
    </div>
  );

  return (
    <div className="flex-1 min-h-screen relative">
      {/* menu de navegacion */}
      <div className="card">
        <Menubar model={items} start={start} end={end} />
      </div>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
      {/* Footer */}
      <footer className="text-primary text-center p-4 mt-auto absolute bottom-0 left-0 right-0">
        <Divider />© 2025 <strong>Sistema de Planificación</strong> - Todos los
        derechos reservados
      </footer>
    </div>
  );
};

export default MainLayout;
