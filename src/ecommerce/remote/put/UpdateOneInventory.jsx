// src/remote/put/UpdateOneInventory.js
import axios from "axios";

/**
 * Update an existing inventory record.
 * @param {Object} inventory  – full inventory payload, including IdAlmacenOK and negocio
 * @returns {Promise<Object>} – resolves with server response data
 */
export function UpdateOneInventory(inventory) {
  console.log("<<EJECUTA>> API <<UpdateOneInventory>> Requiere:", inventory);
  return new Promise((resolve, reject) => {
    // build the URL matching the new backend route (see below)
    const sufijoOK = inventory.IdAlmacenOK.includes("1102")
  ? "9001-1102"
  : "9001-1101";                              // String.includes devuelve boolean :contentReference[oaicite:0]{index=0}
const url = `${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/negocio/${sufijoOK}/almacen/${inventory.IdAlmacenOK}`; // Template literals :contentReference[oaicite:1]{index=1}

    axios
      .put(url, inventory)                                    // axios.put(url, data) :contentReference[oaicite:0]{index=0}
      .then((response) => {
        const data = response.data;
        if (!data || data.error) {
          console.error("<<ERROR>> API <<UpdateOneInventory>>:", data);
          reject(data);
        } else {
          console.log("<<RESPONSE>> UpdateOneInventory", data);
          resolve(data);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<UpdateOneInventory>>", error);
        reject(error);
      });
  });
}
