import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InventoryValues } from "../../helpers/InventoryValues";
import { UpdateOneInventory } from "../../../remote/put/UpdateOneInventory";
import MyAddLabels from "../../../home/components/elements/atomos/MyLabels";

const EditInventoryModal = ({ open, onClose, inventoryData, onUpdated }) => {
  const [errorAlert, setErrorAlert] = useState("");
  const [successAlert, setSuccessAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      IdAlmacenOK: inventoryData?.IdAlmacenOK || "",
      Principal: inventoryData?.Principal === "S",
      CantidadActual: inventoryData?.CantidadActual ?? "",
      CantidadDisponible: inventoryData?.CantidadDisponible ?? "",
      CantidadApartada: inventoryData?.CantidadApartada ?? "",
      CantidadTransito: inventoryData?.CantidadTransito ?? "",
      StockMaximo: inventoryData?.StockMaximo ?? "",
      StockMinimo: inventoryData?.StockMinimo ?? "",
      Indice: inventoryData?.Indice || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      IdAlmacenOK: Yup.string().required("Campo requerido"),
      Principal: Yup.boolean().required("Campo requerido"),
      CantidadActual: Yup.number().required("Campo requerido").typeError("Debe ser un Número"),
      CantidadDisponible: Yup.number().required("Campo requerido").typeError("Debe ser un Número"),
      CantidadApartada: Yup.number().required("Campo requerido").typeError("Debe ser un Número"),
      CantidadTransito: Yup.number().required("Campo requerido").typeError("Debe ser un Número"),
      StockMaximo: Yup.number().required("Campo requerido").typeError("Debe ser un Número"),
      StockMinimo: Yup.number().required("Campo requerido").typeError("Debe ser un Número"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setErrorAlert("");
      setSuccessAlert("");
      try {
        const payload = InventoryValues({
          ...values,
          Principal: values.Principal ? "S" : "N",
        });
        await UpdateOneInventory(payload);
        setSuccessAlert("Inventario actualizado correctamente");
        onUpdated();
      } catch (e) {
        console.error(e);
        setErrorAlert("No se pudo actualizar el Inventario");
      }
      setLoading(false);
    },
  });

  const commonProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
    disabled: !!successAlert,
  };

  return (
<Dialog
  open={open}
  onClose={onClose}
  slotProps={{
    transition: {               // ← nueva API
      onExited: () => {
        formik.resetForm();      // resetea Formik
        setErrorAlert("");
        setSuccessAlert("");
      },
    },
  }}
  fullWidth
>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography><strong>Editar Inventario</strong></Typography>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column' }} dividers>
          <MyAddLabels
            disabled={!!successAlert}
            label="Índice de Búsqueda"
            onChangeLabels={(labels) => formik.setFieldValue('Indice', labels.join('-'))}
          />
          <TextField
            id="IdAlmacenOK"
            name="IdAlmacenOK"
            label="IdAlmacenOK*"
            value={formik.values.IdAlmacenOK}
            {...commonProps}
            error={formik.touched.IdAlmacenOK && Boolean(formik.errors.IdAlmacenOK)}
            helperText={formik.touched.IdAlmacenOK && formik.errors.IdAlmacenOK}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.Principal}
                onChange={formik.handleChange}
                name="Principal"
                disabled={!!successAlert}
              />
            }
            label="Principal"
          />
          <TextField
            id="CantidadActual"
            name="CantidadActual"
            label="Cantidad Actual*"
            value={formik.values.CantidadActual}
            {...commonProps}
            error={formik.touched.CantidadActual && Boolean(formik.errors.CantidadActual)}
            helperText={formik.touched.CantidadActual && formik.errors.CantidadActual}
          />
          <TextField
            id="CantidadDisponible"
            name="CantidadDisponible"
            label="Cantidad Disponible*"
            value={formik.values.CantidadDisponible}
            {...commonProps}
            error={formik.touched.CantidadDisponible && Boolean(formik.errors.CantidadDisponible)}
            helperText={formik.touched.CantidadDisponible && formik.errors.CantidadDisponible}
          />
          <TextField
            id="CantidadApartada"
            name="CantidadApartada"
            label="Cantidad Apartada*"
            value={formik.values.CantidadApartada}
            {...commonProps}
            error={formik.touched.CantidadApartada && Boolean(formik.errors.CantidadApartada)}
            helperText={formik.touched.CantidadApartada && formik.errors.CantidadApartada}
          />
          <TextField
            id="CantidadTransito"
            name="CantidadTransito"
            label="Cantidad Tránsito*"
            value={formik.values.CantidadTransito}
            {...commonProps}
            error={formik.touched.CantidadTransito && Boolean(formik.errors.CantidadTransito)}
            helperText={formik.touched.CantidadTransito && formik.errors.CantidadTransito}
          />
          <TextField
            id="StockMaximo"
            name="StockMaximo"
            label="Stock Máximo*"
            value={formik.values.StockMaximo}
            {...commonProps}
            error={formik.touched.StockMaximo && Boolean(formik.errors.StockMaximo)}
            helperText={formik.touched.StockMaximo && formik.errors.StockMaximo}
          />
          <TextField
            id="StockMinimo"
            name="StockMinimo"
            label="Stock Mínimo*"
            value={formik.values.StockMinimo}
            {...commonProps}
            error={formik.touched.StockMinimo && Boolean(formik.errors.StockMinimo)}
            helperText={formik.touched.StockMinimo && formik.errors.StockMinimo}
          />
        </DialogContent>
        <DialogActions sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box m="auto">
            {errorAlert && <Alert severity="error"><b>¡ERROR!</b> ─ {errorAlert}</Alert>}
            {successAlert && <Alert severity="success"><b>¡ÉXITO!</b> ─ {successAlert}</Alert>}
          </Box>
          <LoadingButton color="secondary" startIcon={<CloseIcon />} variant="outlined" onClick={onClose}>
            CERRAR
          </LoadingButton>
          <LoadingButton color="primary" startIcon={<SaveIcon />} variant="contained" type="submit" loading={loading} disabled={!!successAlert}>
            GUARDAR
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditInventoryModal;
