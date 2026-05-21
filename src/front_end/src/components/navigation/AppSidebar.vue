<template>
  <aside class="sidebar" :class="{ 'sidebar--open': open }">
    <div class="sidebar__brand">
      <img :src="logodorado2" alt="Logo" />
      <div>
        <strong>Recursos Humanos</strong>
        <span>Radio y Televisión de Hidalgo</span>
      </div>
    </div>

    <nav class="sidebar__nav">
      <router-link v-for="item in visibleNavigationItems" :key="item.route" :to="item.route" class="sidebar__link"
        active-class="sidebar__link--active" @click="$emit('close')">
        <IconSymbol :name="item.icon" />
        <span>{{ item.label }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import IconSymbol from "@/components/ui/IconSymbol.vue";
import logodorado2 from "@/assets/logodorado2.png";
import { computed } from "vue";
import { navigationItems } from "@/utils/constants";
import { filterNavigationByRole } from "@/utils/permissions";
import { useAuthStore } from "@/store/auth";

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["close"]);

const authStore = useAuthStore();

const visibleNavigationItems = computed(() =>
  filterNavigationByRole(navigationItems, authStore.user?.rol),
);
</script>

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100vh;
  padding: 24px 18px;
  background:
    radial-gradient(circle at top, rgba(197, 155, 82, 0.18), transparent 26%),
    linear-gradient(180deg, rgba(107, 24, 57, 0.98), rgba(79, 16, 41, 0.99)),
    var(--color-primary);
  color: #fff;
}

.sidebar__brand {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 12px;
  border: 1px solid rgba(197, 155, 82, 0.22);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.sidebar__brand img {
  width: 56px;
}

.sidebar__brand strong,
.sidebar__brand span {
  display: block;
}

.sidebar__brand span {
  margin-top: 4px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.88rem;
  line-height: 1.4;
}

.sidebar__nav {
  display: grid;
  gap: 8px;
}

.sidebar__link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid transparent;
  color: rgba(255, 255, 255, 0.88);
  transition:
    background var(--transition-base),
    border-color var(--transition-base),
    transform var(--transition-base);
}

.sidebar__link:hover,
.sidebar__link--active {
  background: linear-gradient(90deg, rgba(197, 155, 82, 0.18), rgba(255, 255, 255, 0.08));
  border-color: rgba(197, 155, 82, 0.26);
  transform: translateX(2px);
  color: #fff;
}

@media (max-width: 920px) {
  .sidebar {
    position: fixed;
    inset: 0 auto 0 0;
    z-index: 30;
    width: min(86vw, 320px);
    transform: translateX(-100%);
    transition: transform var(--transition-base);
  }

  .sidebar--open {
    transform: translateX(0);
  }
}
</style>
