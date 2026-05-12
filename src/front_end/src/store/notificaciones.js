import { defineStore } from "pinia";
import notificationsService from "@/services/notifications.service";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    items: [],
    loading: false,
    loaded: false
  }),
  getters: {
    unreadCount: (state) => state.items.filter((item) => !item.leida).length
  },
  actions: {
    async fetchNotifications(force = false) {
      if (this.loading || (this.loaded && !force)) {
        return;
      }

      this.loading = true;

      try {
        this.items = await notificationsService.list();
        this.loaded = true;
      } finally {
        this.loading = false;
      }
    },
    async markAsRead(id) {
      await notificationsService.markAsRead(id);
      this.items = this.items.map((item) => (item.id === id ? { ...item, leida: true } : item));
    },
    async markAllAsRead() {
      await notificationsService.markAllAsRead();
      this.items = this.items.map((item) => ({ ...item, leida: true }));
    },
    clear() {
      this.items = [];
      this.loading = false;
      this.loaded = false;
    }
  }
});
