import api from "./api";

export default {
  async login(payload) {
    const { data } = await api.post("/auth/login", payload);
    return data;
  },
  async profile() {
    const { data } = await api.get("/auth/me");
    return data;
  }
};

