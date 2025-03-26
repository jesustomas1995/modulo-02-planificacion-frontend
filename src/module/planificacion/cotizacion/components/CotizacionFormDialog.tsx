import React, { useEffect, useMemo } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessage } from "@/components";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  Button,
  classNames,
  Divider,
  Dialog,
  InputNumber,
  Dropdown,
} from "@/components/primereact";
import { useState } from "react";
import { fetchAll as productosAllService } from "../../../catalogo/producto/services/ProductoService";
import { fetchAll as proveedorAllService } from "../../../catalogo/proveedor/services/ProveedorService";
import { fetchById as cotizacionById } from "../services/CotizacionService";

interface DeleteItemProps {
  onSubmit: Function;
  title: string;
  visible: boolean;
  onHidden: Function;
  data: any;
}

const productoSchema = yup.object({
  productoId: yup.number().required(),
  precio: yup.number().required().min(1),
  cantidad: yup.number().required().min(1),
});

const validationSchema = yup.object({
  id: yup.number().nullable(),
  proveedorId: yup.number().nullable(),
  detalle: yup
    .array()
    .of(productoSchema)
    .min(1, "Debe haber al menos un producto en el detalle"),
});

const FormItemComponent: React.FC<DeleteItemProps> = ({
  onSubmit,
  onHidden,
  title,
  visible,
  data,
}) => {
  const [productoIndex, productoIndexSet] = useState(-1);
  const [productos, productosSet] = useState([]);
  const [proveedores, proveedoresSet] = useState([]);
  const {
    control: controlProduct,
    getValues: getValuesProduct,
    setValue: setValueProduct,
    setError: setErrorProduct,
    reset: resetProduct,
    trigger: triggerProdcut,
    formState: { errors: errorsProduct },
  } = useForm({
    resolver: yupResolver(productoSchema),
  });
  const initialValueProduct = () => {
    resetProduct({
      productoId: undefined,
      precio: 0,
      cantidad: 0,
    });
  };
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const ColumnItemsProducts = [
    {
      header: "#",
      field: "index",
      width: "3rem",
      body: (_: any, options: any) => options.rowIndex + 1,
    },
    {
      header: "Producto",
      field: "productoId",
      body: (body: any) => {
        const find: any = productos?.find(
          (data: any) => data.id == body?.productoId
        );
        return find?.nombre ?? "";
      },
    },
    { header: "Precio", field: "precio" },
    { header: "Cantidad", field: "cantidad" },
    {
      header: "Total",
      field: "total",
      body: (body: any) => {
        return (body?.precio ?? 0) * (body?.cantidad ?? 0);
      },
    },
    {
      header: "Acciones",
      field: "total",
      body: (body: any) => {
        return (
          <>
            <div className="flex gap-2">
              <Button
                icon="pi pi-pencil"
                onClick={(e) => {
                  e.preventDefault();
                  const _findIndex = getValues("detalle")?.findIndex(
                    (item) => item.productoId == body.productoId
                  );
                  if (_findIndex != -1) {
                    productoIndexSet(_findIndex ?? 0);
                    setValueProduct("cantidad", body.cantidad);
                    setValueProduct("precio", body.precio);
                    setValueProduct("productoId", body.productoId);
                  }
                }}
              />
              <Button
                icon="pi pi-trash"
                severity="danger"
                onClick={(e) => {
                  e.preventDefault();
                  const findIndex = getValues("detalle")?.findIndex(
                    (item) => item.productoId == body.productoId
                  );
                  remove(findIndex);
                }}
              />
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    productosAllService().then((data) => {
      productosSet(data?.data.items);
    });
    proveedorAllService().then((data) => {
      proveedoresSet(data.data.items);
    });
    initialValueProduct();
    reset({
      id: data?.id || null,
      proveedorId: data?.id || null,
      detalle: data?.detalle || [],
    });
    // llamar a servicio detalle de cotización
    if (data?.id)
      cotizacionById(data?.id).then((resp) => {
        const _tmp = resp.data.cotizacionDetalle.map((item: any) => {
          return {
            productoId: item.producto.id,
            cantidad: item.cantidad,
            precio: item.precio,
          };
        });
        setValue("detalle", _tmp);
      });
  }, [data, reset]);

  // useFieldArray para manejar el array detalle
  const { fields, append, remove } = useFieldArray({
    control,
    name: "detalle",
  });

  // Agregar un nuevo producto
  const agregarProducto = async (e: any) => {
    e.preventDefault();
    const isValid = await triggerProdcut(["productoId", "precio", "cantidad"]);
    let isReset = false;
    if (isValid) {
      const tmp = {
        productoId: getValuesProduct("productoId"),
        precio: getValuesProduct("precio"),
        cantidad: getValuesProduct("cantidad"),
      };
      if (productoIndex != -1) {
        const detalle = getValues("detalle") || []; // Obtiene el array detalle
        detalle[productoIndex] = tmp;
        setValue("detalle", detalle);
        isReset = true;
      } else {
        // verificar que el producto sea unico en la lista
        const _index = (getValues("detalle") || []).findIndex(
          (item) => item.productoId == tmp.productoId
        );
        if (_index == -1) {
          isReset = true;
          append(tmp); // Valores predeterminados
        } else {
          setErrorProduct("productoId", {
            message: "Este producto ya se encuentra registrado en la tabla",
          });
        }
      }
      if (isReset) {
        productoIndexSet(-1);
        initialValueProduct();
      }
    }
  };

  // Función para calcular el total
  const calcularTotal = () => {
    const detalle = getValues("detalle"); // Obtiene el array detalle
    return detalle?.reduce((total, producto) => {
      return total + producto.precio * producto.cantidad;
    }, 0);
  };
  return (
    <>
      <Dialog
        visible={visible}
        header={title}
        modal
        onHide={() => onHidden()}
        style={{
          width: "80rem",
        }}
      >
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          noValidate
          className="p-fluid"
        >
          {/* Campo nombre*/}
          <div className="field">
            <label htmlFor="proveedorId" className="required">
              Proveedor
            </label>
            <Controller
              name="proveedorId"
              control={control}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={proveedores.map((item: any) => ({
                    label: item.razonSocial,
                    value: item.id,
                  }))}
                  placeholder="Selecciona un proveedor"
                  className={classNames({
                    "p-invalid": errors.proveedorId,
                  })}
                />
              )}
            />
            <ErrorMessage error={errors.proveedorId} />
          </div>
          <Divider />

          <div className="grid">
            <div className="col-12 md:col-3 field">
              <label htmlFor="productoId" className="required">
                Producto
              </label>
              <Controller
                name="productoId"
                control={controlProduct}
                render={({ field }) => (
                  <Dropdown
                    {...field}
                    options={productos.map((item: any) => ({
                      label: item.nombre,
                      value: item.id,
                    }))}
                    placeholder="Selecciona una producto"
                    className={classNames({
                      "p-invalid": errorsProduct.productoId,
                    })}
                  />
                )}
              />
              <ErrorMessage error={errorsProduct.productoId} />
            </div>
            <div className="col-12 md:col-3 field">
              <label htmlFor="precio" className="required">
                Precio
              </label>
              <Controller
                name="precio"
                control={controlProduct}
                render={({ field }) => (
                  <InputNumber
                    id="precio"
                    {...field}
                    placeholder="Introduzca el precio"
                    className={classNames({
                      "p-invalid": errorsProduct.precio,
                    })}
                    minFractionDigits={2}
                    onChange={(e) => field.onChange(Number(e.value) ?? 0)} // Asegurar que nunca sea `NaN`
                    value={field.value ?? 0} // Establecer un valor predeterminado
                  />
                )}
              />
              <ErrorMessage error={errorsProduct.precio} />
            </div>
            <div className="col-12 md:col-3 field">
              <label htmlFor="cantidad" className="required">
                Cantidad
              </label>
              <Controller
                name="cantidad"
                control={controlProduct}
                render={({ field }) => (
                  <InputNumber
                    id="cantidad"
                    {...field}
                    placeholder="Introduzca el cantidad"
                    className={classNames({
                      "p-invalid": errorsProduct.cantidad,
                    })}
                    onChange={(e) => field.onChange(Number(e.value) ?? 0)} // Asegurar que nunca sea `NaN`
                    value={field.value ?? 0} // Establecer un valor predeterminado
                  />
                )}
              />
              <ErrorMessage error={errorsProduct.cantidad} />
            </div>
            <div className="col-12 md:col-3 field align-content-end flex align-items-end gap-2 ">
              <Button label="Agregar" className="" onClick={agregarProducto} />
              <Button
                label="Limpiar"
                className=""
                severity="secondary"
                onClick={initialValueProduct}
              />
            </div>
          </div>
          <div className="field">
            <Controller
              name="detalle"
              control={control}
              render={({ field }) => (
                <DataTable
                  value={field.value}
                  tableStyle={{ minWidth: "50rem" }}
                >
                  {ColumnItemsProducts.map((col, index) => (
                    <Column
                      key={index}
                      header={col.header}
                      field={col.field}
                      body={col.body}
                      headerStyle={{
                        width: col.width,
                      }}
                    />
                  ))}
                </DataTable>
              )}
            />

            <ErrorMessage error={errors.detalle} />
          </div>
          <div className="field justify-content-end align-content-end flex">
            <span className="font-bold mr-2">Total:</span> {calcularTotal()} bs.
          </div>

          {/* Botones de Guardar y Cancelar */}
          <div className="flex justify-content-between gap-2 pt-5">
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
function trigger(arg0: string[]) {
  throw new Error("Function not implemented.");
}
