import React, { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./Login.scss";
import { classNames } from "primereact/utils";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessage } from "@/components";
import useLogin from "../hook/useLogin";
import { Toast } from "primereact/toast";
import { Password } from "primereact/password";
import { ProgressSpinner } from "primereact/progressspinner";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const validationSchema = yup.object().shape({
  usuario: yup
    .string()
    .required()
    .test(
      "usuario-o-email",
      'Debe ser un correo electrónico o un C.I. valido"',
      (value) =>
        /^[a-zA-Z0-9]{3,12}(-\d[A-Z])?$/.test(value) ||
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    )
    .min(6)
    .max(50),
  password: yup.string().required().min(6),
});

const LoginPage = () => {
  const { loading, onLogin, toast } = useLogin();
  const [loadingCiudadania, setLoadingCiudadania] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      usuario: "",
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <>
      <Toast ref={toast} />

      {loading ? (
        <div
          className="flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <ProgressSpinner
            style={{ width: "70px", height: "70px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      ) : (
        <div className="layout">
          <div className="bg"></div>
          <div className="bg bg2"></div>
          <div className="bg bg3"></div>
          <div className="content surface-card md:py-5 md:px-7 px-4 shadow-3 flex flex-column w-11 sm:w-30rem ">
            <form
              onSubmit={handleSubmit(onLogin)}
              noValidate
              className="p-fluid flex flex-column "
            >
              <div className="flex flex-column align-items-center ">
                <img src="/icon.svg" width="120" />
                <h1 className="font-bold text-2xl">SISTEMA PLANIFICACION</h1>
                <p className="text-color-secondary">
                  Bienvenido a la <strong>Administración</strong>, aquí podrá
                  gestionar CATÁLOGOS, COMPRAS, COTIZACIÓN Y PRESUPUESTOS .
                </p>
              </div>

              <div className="flex flex-column align-items-start field">
                <label htmlFor="input_password: " className="required ">
                  Usuario:
                </label>
                <Controller
                  name="usuario"
                  control={control}
                  render={({ field }) => (
                    <>
                      <span className="p-input-icon-left w-full">
                        <i className="pi pi-user"></i>
                        <InputText
                          autoComplete="off"
                          type="text"
                          {...field}
                          className={classNames({
                            "p-invalid": errors.usuario,
                          })}
                          placeholder="Escriba su C.I. ó Correo Electrónico"
                        />
                      </span>
                    </>
                  )}
                />
                <ErrorMessage error={errors.usuario} />
              </div>

              <div className="flex flex-column align-items-start field">
                <label htmlFor="input_password: " className="required ">
                  Contraseña:
                </label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <>
                      <span className="p-input-icon-left w-full">
                        <i className="pi pi-key" style={{ zIndex: 1 }}></i>
                        <Password
                          autoComplete="off"
                          placeholder="Escriba su contraseña"
                          {...field}
                          className={classNames({
                            "p-invalid": errors.password,
                          })}
                          feedback={false}
                          toggleMask
                        />
                      </span>
                    </>
                  )}
                />
                <ErrorMessage error={errors.password} />
              </div>
              <div className="field">
                <Button
                  label={loading ? "Cargando..." : "Iniciar Sesión"}
                  type="submit"
                  disabled={loading}
                  icon={loading ? "'pi pi-spin pi-spinner" : ""}
                />
              </div>

              <div className="flex justify-content-between">
                <span className="text-sm">PLANIFICACIÓN v0.0.1</span>
                <span className=" text-sm font-bold">©2025 PLN</span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
