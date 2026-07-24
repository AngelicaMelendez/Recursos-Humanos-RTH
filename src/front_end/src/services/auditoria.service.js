import api from "@/services/api"; // <-- ¡CORRECTO! Importas tu api.js con puerto 8000 y token

export default {
  async list(params = {}) {
    const { data } = await api.get("/auditoria", { params }); 
    return data;
  }
}