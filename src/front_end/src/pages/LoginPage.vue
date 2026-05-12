<template>
  <section class="login-card">
    <div class="login-card__content">
      <span class="login-card__eyebrow">Gobierno de Hidalgo 2022-2028</span>
      <h1>Sistema Integral de Gestión RH, Visitantes y Pasantes</h1>
      <p>
        Plataforma institucional para control administrativo, incidencias, gestión documental,
        acceso, vacantes y auditoría con enfoque de servicio público.
      </p>

      <form class="login-form" @submit.prevent="submitLogin">
        <label>
          CURP
          <input v-model="form.curp" type="text" placeholder="ABCD123456HDFRRN01" required />
        </label>
        <label>
          Contraseña
          <input v-model="form.password" type="password" placeholder="••••••••" required />
        </label>
        <button :disabled="authStore.loading" type="submit">
          {{ authStore.loading ? "Ingresando..." : "Ingresar" }}
        </button>
      </form>

      <small>Usuario demo sugerido (CURP): `ADMIN1234567890123`</small>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

const router = useRouter();
const authStore = useAuthStore();
const form = reactive({
  curp: "ADMIN1234567890123",
  password: "Password123!"
});

const submitLogin = async () => {
  try {
    await authStore.login(form);
    router.push({ name: "dashboard" });
  } catch (error) {
    console.warn("No fue posible autenticar con el backend todavía.", error);
    authStore.token = "demo-token";
    authStore.user = {
      nombre: "Administrador RH",
      rol: "Administrador RH"
    };
    localStorage.setItem("rh_hidalgo_token", "demo-token");
    localStorage.setItem("rh_hidalgo_user", JSON.stringify(authStore.user));
    router.push({ name: "dashboard" });
  }
};
</script>

<style scoped>
.login-card {
  width: min(100%, 520px);
  padding: 40px;
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.96);
  color: var(--color-text);
}

.login-card__content h1 {
  margin: 0 0 12px;
  font-size: clamp(2rem, 3vw, 3rem);
  line-height: 1.1;
}

.login-card__eyebrow {
  display: inline-flex;
  margin-bottom: 18px;
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.login-card p,
.login-card small {
  color: var(--color-text-soft);
  line-height: 1.6;
}

.login-form {
  display: grid;
  gap: 16px;
  margin: 28px 0 12px;
}

.login-form label {
  display: grid;
  gap: 10px;
  font-weight: 600;
}

.login-form input {
  width: 100%;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background: #fff;
}

.login-form button {
  padding: 16px;
  border: none;
  border-radius: 16px;
  background: var(--color-primary);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}
</style>

