<template>
  <main class="not-found">
    <div class="card not-found__card">
      <h1>404</h1>
      <p>La sección solicitada no existe dentro del sistema institucional.</p>
      <router-link to="/">Volver al dashboard</router-link>
    </div>
  </main>
</template>

<style scoped>
.not-found {
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 20px;
}

.not-found__card {
  padding: 32px;
  text-align: center;
}

.not-found__card h1 {
  margin: 0 0 12px;
  font-size: 4rem;
  color: var(--color-primary);
}

.not-found__card p {
  margin: 0 0 16px;
  color: var(--color-text-soft);
}

.not-found__card a {
  color: var(--color-primary);
  font-weight: 700;
}
</style>
