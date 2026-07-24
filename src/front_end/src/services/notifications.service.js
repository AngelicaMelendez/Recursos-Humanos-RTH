import api from "@/services/api";

export default {
  async list() {
    const { data } = await api.get("/api/notificaciones/listar");
    return data;
  },
  async markAsRead(id) {
    const { data } = await api.patch(`/api/notificaciones/${id}/leer`);
    return data;
  },
  async markAllAsRead() {
    const { data } = await api.patch("/api/notificaciones/leer-todas");
    return data;
  }
};
