import api from "@/services/api";

export default {
  async list() {
    const { data } = await api.get("/incidencias");
    return data;
  },

  async create(payload) {
    const { data } = await api.post("/incidencias", payload);
    return data;
  },

  async get(id) {
    const { data } = await api.get(`/incidencias/${id}`);
    return data;
  },

  async update(id, payload) {
    const { data } = await api.patch(`/incidencias/${id}`, payload);
    return data;
  },

  async delete(id) {
    const { data } = await api.delete(`/incidencias/${id}`);
    return data;
  },

  async getByEmpleado(empleado_id) {
    const { data } = await api.get(`/incidencias/empleado/${empleado_id}`);
    return data;
  }
};
