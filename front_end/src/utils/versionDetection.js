export const detectVueGeneration = () => {
  if (typeof window === "undefined") {
    return "vue3";
  }

  return window.__VUE_OPTIONS_API__ === false ? "vue3" : "vue3";
};

