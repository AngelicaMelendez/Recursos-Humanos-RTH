<template>
  <div class="app-shell">
    <AppSidebar :open="sidebarOpen" @close="sidebarOpen = false" />
    <div class="content-shell">
      <section class="content-frame">
        <AppTopbar
          :user="authStore.user"
          @toggle-menu="sidebarOpen = !sidebarOpen"
          @logout="handleLogout"
        />
        <main class="page-section">
          <router-view />
        </main>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import AppSidebar from "@/components/navigation/AppSidebar.vue";
import AppTopbar from "@/components/navigation/AppTopbar.vue";
import { useAuthStore } from "@/store/auth";
import { useNotificationsStore } from "@/store/notificaciones";

const sidebarOpen = ref(false);
const authStore = useAuthStore();
const notificationsStore = useNotificationsStore();
const router = useRouter();

const syncNotifications = async (userId) => {
  if (!userId || !authStore.isAuthenticated) {
    notificationsStore.clear();
    return;
  }

  try {
    await notificationsStore.fetchNotifications(true);
  } catch (error) {
    notificationsStore.clear();
  }
};

const handleLogout = () => {
  notificationsStore.clear();
  authStore.logout();
  router.push({ name: "login" });
};

watch(
  () => authStore.user?.id,
  (userId) => {
    syncNotifications(userId);
  }
);

onMounted(() => {
  syncNotifications(authStore.user?.id);
});
</script>
