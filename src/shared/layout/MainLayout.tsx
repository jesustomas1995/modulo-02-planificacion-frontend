import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Divider } from "primereact/divider";
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

  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      height="40"
      className="mr-2"
    ></img>
  );
  const end = (
    <div className="flex align-items-center gap-2">
      {/* <InputText
          placeholder="Search"
          type="text"
          className="w-8rem sm:w-auto"
        />
        <Avatar
          image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
          shape="circle"
        /> */}
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
