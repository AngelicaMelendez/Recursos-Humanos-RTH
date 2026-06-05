<template>
  <main class="auth-layout">
    <section class="auth-layout__panel">
      <div class="auth-layout__content">
        <slot />
        <router-view />
      </div>
    </section>
  </main>
</template>


<style scoped>
.auth-layout {
  display: grid;
  place-items: center; 
  min-height: 100vh;
  padding: 24px;
  background-image: url("@/assets/starp.png");
  background-size: cover;
  background-position: center;
}

.auth-layout__panel {
  width: min(100%, 1120px);
  min-height: 720px;
  padding: 28px;
  border: 1px solid rgba(232, 221, 210, 0.8);
  border-radius: 36px;
  background: rgba(98, 17, 50, 0.72);
  box-shadow: 0 30px 80px rgba(98, 17, 50, 0.18);
}

.auth-layout__content {
  display: grid;
  place-items: center;
  min-height: 100%;
}
</style>

