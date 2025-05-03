// src/components/ConfirmDeleteDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

/**
 * @param {boolean} open      – controla visibilidad
 * @param {() => void} onClose    – cierra el modal
 * @param {() => void} onConfirm  – se ejecuta al confirmar
 * @param {string} message   – texto de confirmación
 */
const ConfirmDeleteDialog = ({ open, onClose, onConfirm, message }) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth> {/* MUI Dialog :contentReference[oaicite:1]{index=1} */}
    <DialogTitle>¿Eliminar registro?</DialogTitle>
    <DialogContent>
      <Typography>{message}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancelar</Button>
      <Button color="error" variant="contained" onClick={onConfirm}>
        Eliminar
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDeleteDialog;
