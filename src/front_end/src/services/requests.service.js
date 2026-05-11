import api from "@/services/api";

const normalizeId = (id) => String(id).replace("SOL-", "");

export default {
  async list() {
    const { data } = await api.get("/solicitudes");
    return data;
  },
  async create(payload) {
    const { data } = await api.post("/solicitudes", payload);
    return data;
  },
  async approve(id) {
    const { data } = await api.patch(`/solicitudes/${normalizeId(id)}/aprobar`);
    return data;
  },
  async reject(id) {
    const { data } = await api.patch(`/solicitudes/${normalizeId(id)}/rechazar`);
    return data;
  }
};
