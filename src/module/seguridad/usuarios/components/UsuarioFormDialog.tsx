import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessage } from "@/components";
import {
  Button,
  InputText,
  InputTextarea,
  classNames,
  Divider,
  Dialog,
} from "@/components/primereact";
import { Password } from "primereact/password";

interface DeleteItemProps {
  onSubmit: Function;
  title: string;
  visible: boolean;
  onHidden: Function;
  data: any;
}

const validationSchema = yup.object().shape({
  id: yup.number().nullable(),
  usuario: yup.string().required().min(3).max(100),
  nombreCompleto: yup.string().required().min(3).max(500),
  password: yup.string().required().min(3).max(50),
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
      usuario: data?.usuario || "",
      nombreCompleto: data?.nombreCompleto || "",
      password: "",
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
        {/* <Divider /> */}
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          noValidate
          className="p-fluid"
        >
          {/* Campo nombre*/}
          <div className="field">
            <label htmlFor="nombreCompleto">Nombre Completo</label>
            <Controller
              name="nombreCompleto"
              control={control}
              render={({ field }) => (
                <InputText
                  id="nombreCompleto"
                  {...field}
                  placeholder="Ingresa el nombre"
                  className={classNames({ "p-invalid": errors.nombreCompleto })}
                />
              )}
            />
            <ErrorMessage error={errors.nombreCompleto} />
          </div>

          {/* Campo usuario*/}
          <div className="field">
            <label htmlFor="usuario">Usuario</label>
            <Controller
              name="usuario"
              control={control}
              render={({ field }) => (
                <InputText
                  id="usuario"
                  {...field}
                  placeholder="Ingresa el usuario"
                  className={classNames({ "p-invalid": errors.usuario })}
                />
              )}
            />
            <ErrorMessage error={errors.usuario} />
          </div>

          {/* Campo password*/}
          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Password
                  id="password"
                  {...field}
                  placeholder="Ingresa el nombre"
                  className={classNames({ "p-invalid": errors.password })}
                  toggleMask
                />
              )}
            />
            <ErrorMessage error={errors.password} />
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
