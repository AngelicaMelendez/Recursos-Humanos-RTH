
import api from "/src/services/api.js";

const normalizeId = (id) => String(id).replace("FOL-", "");

export default {
  async list(params = {}) {
    const { data } = await api.get("/solicitudes", { params });
    return data;
  },
  async create(payload) {
    const config = payload instanceof FormData ? { headers: { "Content-Type": "multipart/form-data" } } : undefined;
    const { data } = await api.post("/solicitudes", payload, config);
    return data;
  },
  async approve(id) {
    const { data } = await api.patch(`/solicitudes/${normalizeId(id)}/aprobar`);
    return data;
  },
  async remove(id) {
    const { data } = await api.delete(`/solicitudes/${normalizeId(id)}`);
    return data;
  },
  async reject(id) {
    const { data } = await api.patch(`/solicitudes/${normalizeId(id)}/rechazar`);
    return data;
  }
};
