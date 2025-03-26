import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessage } from "@/components";
import { useState } from "react";
import {
  Button,
  InputText,
  InputTextarea,
  classNames,
  Divider,
  Dialog,
  Dropdown,
} from "@/components/primereact";
import { departamentosBolivia } from "@/common/constant/departamentos.constant";

interface DeleteItemProps {
  onSubmit: Function;
  title: string;
  visible: boolean;
  onHidden: Function;
  data: any;
}

const validationSchema = yup.object().shape({
  id: yup.number().nullable(),
  representanteLegal: yup.string().required().min(3).max(200),
  razonSocial: yup.string().notRequired(),
  nit: yup.string().notRequired(),
  celular: yup.string().notRequired(),
  telefono: yup.string().notRequired(),
  email: yup.string().notRequired(),
  direccion: yup.string().notRequired(),
  municipio: yup.string().notRequired(),
  departamentoId: yup.number().notRequired(),
});

const FormItemComponent: React.FC<DeleteItemProps> = ({
  onSubmit,
  onHidden,
  title,
  visible,
  data,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    reset({
      id: data?.id || null,
      representanteLegal: data?.representanteLegal || "",
      razonSocial: data?.razonSocial || "",
      nit: data?.nit || "",
      celular: data?.celular || "",
      telefono: data?.telefono || "",
      email: data?.email || "",
      direccion: data?.direccion || "",
      municipio: data?.municipio || "",
      departamentoId: data?.departamentoId || null,
    });
  }, [data, reset]);

  return (
    <>
      <Dialog
        visible={visible}
        header={title}
        modal
        onHide={() => onHidden()}
        style={{
          width: "40rem",
        }}
      >
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          noValidate
          className="p-fluid"
        >
          {/* Campo nombre*/}
          <div className="field">
            <label htmlFor="representanteLegal">Representante Legal</label>
            <Controller
              name="representanteLegal"
              control={control}
              render={({ field }) => (
                <InputText
                  id="representanteLegal"
                  {...field}
                  placeholder="Ingresa el representante legal"
                  className={classNames({
                    "p-invalid": errors.representanteLegal,
                  })}
                />
              )}
            />
            <ErrorMessage error={errors.representanteLegal} />
          </div>

          {/* Campo nombre*/}
          <div className="field">
            <label htmlFor="nit">Nit</label>
            <Controller
              name="nit"
              control={control}
              render={({ field }) => (
                <InputText
                  id="nit"
                  {...field}
                  placeholder="Ingresa el Nit"
                  className={classNames({ "p-invalid": errors.nit })}
                />
              )}
            />
            <ErrorMessage error={errors.nit} />
          </div>

          {/* Campo nombre*/}
          <div className="field">
            <label htmlFor="razonSocial">Razón Social</label>
            <Controller
              name="razonSocial"
              control={control}
              render={({ field }) => (
                <InputText
                  id="razonSocial"
                  {...field}
                  placeholder="Ingresa el razonSocial"
                  className={classNames({ "p-invalid": errors.razonSocial })}
                />
              )}
            />
            <ErrorMessage error={errors.razonSocial} />
          </div>

          {/* Campo nombre*/}
          <div className="field">
            <label htmlFor="celular">Celular</label>
            <Controller
              name="celular"
              control={control}
              render={({ field }) => (
                <InputText
                  id="celular"
                  {...field}
                  placeholder="Ingresa el Celular"
                  className={classNames({ "p-invalid": errors.celular })}
                />
              )}
            />
            <ErrorMessage error={errors.celular} />
          </div>

          {/* Campo nombre*/}
          <div className="field">
            <label htmlFor="telefono">Teléfono</label>
            <Controller
              name="telefono"
              control={control}
              render={({ field }) => (
                <InputText
                  id="telefono"
                  {...field}
                  placeholder="Ingresa el telefono"
                  className={classNames({ "p-invalid": errors.telefono })}
                />
              )}
            />
            <ErrorMessage error={errors.telefono} />
          </div>

          {/* Campo nombre*/}
          <div className="field">
            <label htmlFor="email">Correo Electrónico</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputText
                  id="email"
                  {...field}
                  placeholder="Ingresa el email"
                  className={classNames({ "p-invalid": errors.email })}
                />
              )}
            />
            <ErrorMessage error={errors.email} />
          </div>

          {/* Selector de Departamento */}
          <div className="field">
            <label htmlFor="departamentoId">Departamento</label>
            <Controller
              name="departamentoId"
              control={control}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={departamentosBolivia.map((item: any) => ({
                    label: item.nombre,
                    value: item.id,
                  }))}
                  placeholder="Selecciona un departamento"
                  className={classNames({
                    "p-invalid": errors.departamentoId,
                  })}
                />
              )}
            />
            <ErrorMessage error={errors.departamentoId} />
          </div>

          {/* Campo nombre*/}
          <div className="field">
            <label htmlFor="municipio">Municipio</label>
            <Controller
              name="municipio"
              control={control}
              render={({ field }) => (
                <InputText
                  id="municipio"
                  {...field}
                  placeholder="Ingresa el municipio"
                  className={classNames({ "p-invalid": errors.municipio })}
                />
              )}
            />
            <ErrorMessage error={errors.municipio} />
          </div>

          {/* Campo nombre*/}
          <div className="field">
            <label htmlFor="direccion">Dirección</label>
            <Controller
              name="direccion"
              control={control}
              render={({ field }) => (
                <InputText
                  id="direccion"
                  {...field}
                  placeholder="Ingresa el direccion"
                  className={classNames({ "p-invalid": errors.direccion })}
                />
              )}
            />
            <ErrorMessage error={errors.direccion} />
          </div>

          {/* Botones de Guardar y Cancelar */}
          <div className="flex justify-content-between gap-2">
            <Button
              type="button"
              className="p-button-secondary"
              onClick={() => onHidden()}
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default FormItemComponent;
