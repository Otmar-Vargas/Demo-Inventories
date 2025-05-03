// src/remote/delete/DeleteOneInventory.js
import axios from "axios";

/**
 * Elimina un inventario por su IdAlmacenOK.
 * Escoge el negocio (9001‑1101 o 9001‑1102) según el contenido de IdAlmacenOK.
 *
 * @param {string} idAlmacenOK
 * @returns {Promise<any>}
 */
export function DeleteOneInventory(idAlmacenOK) {
  // si contiene “1102” usamos 9001‑1102, sino 9001‑1101 :contentReference[oaicite:0]{index=0}
  const sufijoOK = idAlmacenOK.includes("1102") ? "9001-1102" : "9001-1101";
  console.log("Sufijo",sufijoOK);
  const url = `${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/negocio/${sufijoOK}/almacen/${idAlmacenOK}`;
  return axios
    .delete(url)               // axios.delete(url[, config]) :contentReference[oaicite:1]{index=1}
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error en DeleteOneInventory", err);
      throw err;
    });
}
