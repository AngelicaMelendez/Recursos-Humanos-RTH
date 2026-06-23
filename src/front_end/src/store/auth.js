import { defineStore } from "pinia";
import authService from "@/services/auth.service";
import { clearStoredAuth, readStoredAuth, writeStoredAuth } from "@/services/authStorage";

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
    async initialize() {
      if (this.initialized) {
        return;
      }
      const storedAuth = readStoredAuth();
      this.token = storedAuth.token;
      this.user = storedAuth.user;

      if (!this.token) {
        clearStoredAuth();
        this.initialized = true;
        return;
      }

      try {
        const response = await authService.profile();
        this.user = response.user;
        writeStoredAuth({ token: this.token, user: response.user });
      } catch {
        this.logout();
      } finally {
        this.initialized = true;
      }
    },
    async login(credentials) {
      this.loading = true;

      try {
        clearStoredAuth();
        this.token = "";
        this.user = null;

        const response = await authService.login(credentials);
        this.token = response.token;
        this.user = response.user;
        writeStoredAuth(response);
        this.initialized = true;
        return response;
      } finally {
        this.loading = false;
      }
    },
    async register(credentials) {
      this.loading = true;

      try {
        clearStoredAuth();
        this.token = "";
        this.user = null;

        const response = await authService.register(credentials);
        this.token = response.token;
        this.user = response.user;
        writeStoredAuth(response);
        this.initialized = true;
        return response;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.token = "";
      this.user = null;
      clearStoredAuth();
    }
  }
});

