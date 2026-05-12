import api from "@/services/api";

export default {
  // Obtener comunicados
  async list(areaId = null) {
    const params = areaId ? { area_id: areaId } : {};
    const { data } = await api.get("/comunicados", { params });
    return data;
  },

  // Obtener más reciente
  async getMasReciente(areaId = null) {
    const params = areaId ? { area_id: areaId } : {};
    const { data } = await api.get("/comunicados/mas-reciente", { params });
    return data;
  },

  // Crear comunicado
  async create(payload) {
    const { data } = await api.post("/comunicados", payload);
    return data;
  },

  // Editar comunicado
  async update(id, payload) {
    const { data } = await api.patch(`/comunicados/${id}`, payload);
    return data;
  },

  // Eliminar comunicado
  async delete(id) {
    const { data } = await api.delete(`/comunicados/${id}`);
    return data;
  },

  // Agregar o remover reacción (like)
  async toggleReaction(id) {
    const { data } = await api.post(`/comunicados/${id}/reacciones`);
    return data;
  },

  // Obtener historial (solo admin)
  async getHistorial() {
    const { data } = await api.get("/comunicados/admin/historial");
    return data;
  },

  // Obtener reacciones de un comunicado (solo admin)
  async getReactions(id) {
    const { data } = await api.get(`/comunicados/${id}/reacciones`);
    return data;
  },
};
