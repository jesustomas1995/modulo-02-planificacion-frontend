import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessage } from "@/components";
import { Calendar } from "primereact/calendar";
import {
  Button,
  InputText,
  InputTextarea,
  classNames,
  Divider,
  Dialog,
  InputNumber,
  Dropdown,
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
  vencimiento: yup.date().nullable().required(),
  descripcion: yup.string().notRequired(),
  monto: yup.number().required(),
  sobrante: yup.number().notRequired().nullable(),
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
      vencimiento: data?.vencimiento ? new Date(data.vencimiento) : undefined,
      descripcion: data?.descripcion || "",
      monto: data?.monto || 0,
      sobrante: data?.sobrante || 0,
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
            <label htmlFor="nombre">Nombre</label>
            <Controller
              name="nombre"
              control={control}
              render={({ field }) => (
                <InputText
                  id="nombre"
                  {...field}
                  placeholder="Ingresa el nombre"
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
                  placeholder="Introduzca una descripcion"
                  className={classNames({ "p-invalid": errors.descripcion })}
                />
              )}
            />
            <ErrorMessage error={errors.descripcion} />
          </div>

          <div className="field">
            <label htmlFor="monto">Monto</label>
            <Controller
              name="monto"
              control={control}
              render={({ field }) => (
                <InputNumber
                  id="monto"
                  {...field}
                  placeholder="Introduzca el monto"
                  className={classNames({
                    "p-invalid": errors.monto,
                  })}
                  minFractionDigits={2}
                  onChange={(e) => field.onChange(Number(e.value) ?? 0)} // Asegurar que nunca sea `NaN`
                  value={field.value ?? 0} // Establecer un valor predeterminado
                />
              )}
            />
            <ErrorMessage error={errors.monto} />
          </div>

          <div className="field">
            <label htmlFor="sobrante">Sobrante</label>
            <Controller
              name="sobrante"
              disabled={true}
              control={control}
              render={({ field }) => (
                <InputNumber
                  id="sobrante"
                  {...field}
                  placeholder="Introduzca el sobrante"
                  className={classNames({
                    "p-invalid": errors.sobrante,
                  })}
                  showButtons
                  onValueChange={(e) => field.onChange(e.value)}
                  value={field.value}
                />
              )}
            />
            <ErrorMessage error={errors.sobrante} />
          </div>

          <div className="field">
            <label htmlFor="vencimiento">Vencimiento</label>
            <Controller
              name="vencimiento"
              control={control}
              render={({ field }) => (
                <Calendar
                  id="vencimiento"
                  {...field}
                  placeholder="seleccione el vencimiento"
                  className={classNames({
                    "p-invalid": errors.vencimiento,
                  })}
                  onChange={(e) => field.onChange(e.value)}
                  value={field.value}
                />
              )}
            />
            <ErrorMessage error={errors.vencimiento} />
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
