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

interface DeleteItemProps {
  onSubmit: Function;
  title: string;
  visible: boolean;
  onHidden: Function;
  data: any;
}

const validationSchema = yup.object().shape({
  id: yup.number().nullable(),
  nombre: yup.string().required().min(3).max(200),
  descripcion: yup.string().notRequired(),
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
      nombre: data?.nombre || "",
      descripcion: data?.descripcion || "",
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
        <Divider />
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          noValidate
          className="p-fluid"
        >
          {/* Campo nombre de la incidencia*/}
          <div className="field">
            <label htmlFor="nombre">Estado de incidencia</label>
            <Controller
              name="nombre"
              control={control}
              render={({ field }) => (
                <InputText
                  id="nombre"
                  {...field}
                  placeholder="Ingresa el nombre del estado de incidencia"
                  onChange={(event) =>
                    field.onChange(event.target.value.toUpperCase())
                  }
                  className={classNames({ "p-invalid": errors.nombre })}
                />
              )}
            />
            <ErrorMessage error={errors.nombre} />
          </div>

          {/* Campo de Descripción */}
          <div className="field">
            <label htmlFor="descripcion">Descripción</label>
            <Controller
              name="descripcion"
              control={control}
              render={({ field }) => (
                <InputTextarea
                  id="descripcion"
                  {...field}
                  value={field.value || ""}
                  placeholder=""
                  className={classNames({ "p-invalid": errors.descripcion })}
                />
              )}
            />
            <ErrorMessage error={errors.descripcion} />
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
