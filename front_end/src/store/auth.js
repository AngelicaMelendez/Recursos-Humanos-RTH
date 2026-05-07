import { defineStore } from "pinia";
import authService from "@/services/auth.service";

const TOKEN_KEY = "rh_hidalgo_token";
const USER_KEY = "rh_hidalgo_user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
    user: null,
    initialized: false,
    loading: false
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token)
  },
  actions: {
    initialize() {
      this.token = localStorage.getItem(TOKEN_KEY) || "";
      this.user = JSON.parse(localStorage.getItem(USER_KEY) || "null");
      this.initialized = true;
    },
    async login(credentials) {
      this.loading = true;

      try {
        const response = await authService.login(credentials);
        this.token = response.token;
        this.user = response.user;
        localStorage.setItem(TOKEN_KEY, response.token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        return response;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.token = "";
      this.user = null;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }
});

