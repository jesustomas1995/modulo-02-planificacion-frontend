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
import { fetchAll as categoriaAllService } from "../../categoria/services/CategoriaService";
import { fetchAll as marcaAllService } from "../../marca/services/MarcaService";

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
  numberPart: yup.string().notRequired(),
  numberSerial: yup.string().notRequired(),
  descripcion: yup.string().notRequired(),
  categoriaId: yup.number().required(),
  marcaId: yup.number().required(),
});

const FormItemComponent: React.FC<DeleteItemProps> = ({
  onSubmit,
  onHidden,
  title,
  visible,
  data,
}) => {
  const [marcas, marcasSet] = useState([]);
  const [categoria, categoriaSet] = useState([]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    marcaAllService().then((data) => {
      marcasSet(data?.data.items);
    });
    categoriaAllService().then((data) => {
      categoriaSet(data.data.items);
    });

    reset({
      id: data?.id || null,
      nombre: data?.nombre || "",
      descripcion: data?.descripcion || "",
      numberPart: data?.numberPart || "",
      numberSerial: data?.numberSerial || "",
      marcaId: data?.marca?.id || null,
      categoriaId: data?.categoria?.id || null,
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
                  onChange={(event) =>
                    field.onChange(event.target.value.toUpperCase())
                  }
                  className={classNames({ "p-invalid": errors.nombre })}
                />
              )}
            />
            <ErrorMessage error={errors.nombre} />
          </div>

          {/* Selector de Categoría */}
          <div className="field">
            <label htmlFor="categoriaId">Categoría</label>
            <Controller
              name="categoriaId"
              control={control}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={categoria.map((item: any) => ({
                    label: item.nombre,
                    value: item.id,
                  }))}
                  placeholder="Selecciona una categoria"
                  className={classNames({
                    "p-invalid": errors.categoriaId,
                  })}
                />
              )}
            />
            <ErrorMessage error={errors.categoriaId} />
          </div>

          {/* Selector de Marcas */}
          <div className="field">
            <label htmlFor="marcaId">Marca</label>
            <Controller
              name="marcaId"
              control={control}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={marcas.map((item: any) => ({
                    label: item.nombre,
                    value: item.id,
                  }))}
                  placeholder="Selecciona una marca"
                  className={classNames({
                    "p-invalid": errors.marcaId,
                  })}
                />
              )}
            />
            <ErrorMessage error={errors.marcaId} />
          </div>

          {/* Campo nombre*/}
          <div className="field">
            <label htmlFor="numberPart">Numero de Parte</label>
            <Controller
              name="numberPart"
              control={control}
              render={({ field }) => (
                <InputText
                  id="numberPart"
                  {...field}
                  placeholder="Ingresa el numero de parte"
                  onChange={(event) =>
                    field.onChange(event.target.value.toUpperCase())
                  }
                  className={classNames({ "p-invalid": errors.numberPart })}
                />
              )}
            />
            <ErrorMessage error={errors.nombre} />
          </div>

          {/* Campo nombre*/}
          <div className="field">
            <label htmlFor="numberSerial">Numero de Serie</label>
            <Controller
              name="numberSerial"
              control={control}
              render={({ field }) => (
                <InputText
                  id="numberSerial"
                  {...field}
                  placeholder="Ingresa el numero de serie"
                  onChange={(event) =>
                    field.onChange(event.target.value.toUpperCase())
                  }
                  className={classNames({ "p-invalid": errors.numberSerial })}
                />
              )}
            />
            <ErrorMessage error={errors.numberSerial} />
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
