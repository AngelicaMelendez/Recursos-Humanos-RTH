<template>
  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <path :d="iconPath" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true
  }
});

const iconMap = {
  grid: "M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 7v-7h7v7h-7Z",
  calendar: "M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
  hierarchy: "M12 4v4m0 0H7m5 0h5M7 8v5m10-5v5M4 18h6v-5H4v5Zm10 0h6v-5h-6v5Z",
  users: "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m16 0v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M12 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 0v6h6",
  shield: "M12 3l7 3v6c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V6l7-3Z",
  briefcase: "M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 3h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Zm7 0v2",
  door: "M5 21h14M7 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M10 12h.01",
  graduation: "M2 10 12 4l10 6-10 6-10-6Zm4 2.4v4.2c0 .8 2.7 2.4 6 2.4s6-1.6 6-2.4v-4.2",
  lock: "M7 11V8a5 5 0 0 1 10 0v3m-11 0h12a2 2 0 0 1 2 2v7H4v-7a2 2 0 0 1 2-2Z",
  activity: "M3 12h4l2-5 4 10 2-5h6",
  menu: "M4 7h16M4 12h16M4 17h16",
  notifications: "M18 8a6 6 0 0 0-12 0v5a2 2 0 0 1-2 2h16a2 2 0 0 1-2-2V8ZM13.73 21a2 2 0 0 1-3.46 0",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2l8 6 8-6",
  help: "M12 18h.01M9.09 9a3 3 0 1 1 5.82 0c0 1.5-1.5 2.25-1.5 2.25M12 15h.01",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5-5-5m5 5H9",
  plus: "M12 5v14M5 12h14",
  edit: "M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Zm12-14 3 3",
  download: "M12 16V4m0 0-5 5m5-5 5 5M4 20h16",
  archive: "M4 7h16M6 7v13h12V7M9 11h6M8 4h8l1 3H7l1-3Z",
  check: "M20 6 9 17l-5-5",
  x: "M6 6l12 12M18 6 6 18",
  search: "M11 19a8 8 0 1 1 5.66-2.34L21 21m-10-4a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z",
  filter: "M4 6h16M7 12h10M10 18h4",
  upload: "M12 16V4m0 0-5 5m5-5 5 5M4 20h16",
  tag: "M20 13 13 20 4 11V4h7l9 9ZM7.5 7.5h.01",
  clear: "M6 18L18 6M6 6l12 12",
  garbage: "M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 0 0-1 1v3h6V4a1 1 0 0 0-1-1m-4 0h4",
  brush: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 1 1 3.536 3.536L6.343 21.036H3v-3.572L16.732 3.732Z",
  pincel: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 1 1 3.536 3.536L6.343 21.036H3v-3.572L16.732 3.732Z",
  broom: "M3 16h18M5 8h14M7 4h10M9 12h6",
  eraser: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m5-3h4m-4 0a1 1 0 0 0-1 1v3h6V4a1 1 0 0 0-1-1m-4 0h4",
  reset: "M3 12a9 9 0 1 0 3-6.7M3 5v6h6",
  down: "M12 4v16m8-8H4",
  fileDown: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 18v-6M9 15l3 3 3-3",
  saveAlt: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM12 11v6M9 14l3 3 3-3",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Zm11 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  edit: "M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Zm12-14 3 3",
  desactivate: "M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 0 0-1 1v3h6V4a1 1 0 0 0-1-1m-4 0h4",
  box: "M3 7v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7M16 3H8a2 2 0 0 0-2 2v4h12V5a2 2 0 0 0-2-2Z",
  eyeOff: "M13.875 18.825A10.05 10.05 0 0 1 12 19c-7 0-11-7-11-7a17.38 17.38 0 0 1 5.09-5.418M6.228 6.228A10.06 10.06 0 0 1 12 5c7 0 11 7 11 7a17.38 17.38 0 0 1-2.132 3.248M14.828 9.172a4 4 0 1 1-5.656-5.656M9.88 9.88l4.242 4.242M3 3l18 18",
  eyeSlash: "M13.875 18.825A10.05 10.05 0 0 1 12 19c-7 0-11-7-11-7a17.38 17.38 0 0 1 5.09-5.418M6.228 6.228A10.06 10.06 0 0 1 12 5c7 0 11 7 11 7a17.38 17.38 0 0 1-2.132 3.248M14.828 9.172a4 4 0 1 1-5.656-5.656M9.88 9.88l4.242 4.242M3 3l18 18",
  block: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm5.66 13.66a8 8 0 0 1-11.32-11.32Z",
  ban: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm5.66 13.66a8 8 0 0 1-11.32-11.32Z",
  powerOff: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 14h-2v-6h2Zm-1-8a1.5 1.5 0 1 1-1.5-1.5A1.5 1.5 0 0 1 12 8Z",
  toggleOff: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 8v4l2 2",
  toggleOn: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 8v4l2 2",
  on: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 8v4l2 2",
  off: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 8v4l2 2",
  desactivate: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 8v4l2 2",
  



  
};

const iconPath = computed(() => iconMap[props.name] || iconMap.grid);
</script>

<style scoped>
.icon {
  width: 20px;
  height: 20px;
}

.icon-hover .icon {
  stroke: var(--color-primary);
} 
</style>

