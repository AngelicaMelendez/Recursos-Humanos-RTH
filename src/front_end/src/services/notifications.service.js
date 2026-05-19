import api from "@/services/api";

export default {
  async list() {
    const { data } = await api.get("/notificaciones/solicitudes");
    return data;
  },
  async markAsRead(id) {
    const { data } = await api.patch(`/notificaciones/${id}/leer`);
    return data;
  },
  async markAllAsRead() {
    const { data } = await api.patch("/notificaciones/leer-todas");
    return data;
  }
};
