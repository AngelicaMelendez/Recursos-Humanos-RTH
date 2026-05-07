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
import { ref } from "vue";
import { useRouter } from "vue-router";
import AppSidebar from "@/components/navigation/AppSidebar.vue";
import AppTopbar from "@/components/navigation/AppTopbar.vue";
import { useAuthStore } from "@/store/auth";

const sidebarOpen = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push({ name: "login" });
};
</script>

