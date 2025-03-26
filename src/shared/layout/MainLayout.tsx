import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import { Menubar } from "primereact/menubar";

const MainLayout = () => {
  const items = [
    {
      label: "Planificación",
      icon: "pi pi-file",
      items: [
        {
          label: "Presupuesto",
          icon: "pi pi-plus",
          command: () => {},
        },
        {
          label: "Cotizaciones",
          icon: "pi pi-print",
          command: () => {},
        },
        {
          label: "Compras",
          icon: "pi pi-print",
          command: () => {},
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: "Catalogo",
      icon: "pi pi-cloud",
      items: [
        {
          label: "Categoría",
          icon: "pi pi-cloud-download",
          command: () => {},
        },
        {
          label: "Marca",
          icon: "pi pi-cloud-upload",
          command: () => {},
        },
        {
          label: "Producto",
          icon: "pi pi-cloud-upload",
          command: () => {},
        },
      ],
    },
    {
      label: "Usuario",
      icon: "pi pi-search",
      command: () => {},
    },
    {
      label: "Cerrar Sesión",
      icon: "pi pi-search",
      command: () => {},
    },
  ];

  return (
    <div className="flex-1 min-h-screen ">
      <div className="card">
        <Menubar model={items} />
      </div>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
      {/* Footer */}
      <footer className="flex justify-content-center text-primary text-center p-4 mt-auto">
        © 2025 Sistema de Planificación - Todos los derechos reservados
      </footer>
    </div>
  );
};

export default MainLayout;
