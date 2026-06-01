<template>
  <section class="login-card">
    <div class="login-card__content">
      <span class="login-card__eyebrow">Gobierno de Hidalgo 2022-2028</span>

        <img
          src="/src/assets/imgl.png"
          alt="Login illustration"
          class="logo"
        />
        <h1 class="login-card__title">Sistema Integral de Gestión de Recursos Humanos</h1>
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
        <button :disabled="authStore.loading" type="submit" class="electric-button">
          {{ authStore.loading ? "Ingresando..." : "Ingresar" }}
        </button>
      </form>

      <small>Usuario administrador sugerido (CURP): `DUTM880514MHGRRN03`</small>
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
  curp: "DUTM880514MHGRRN03",
  password: "123456"
});

const submitLogin = async () => {
  try {
    await authStore.login(form);
    router.push({ name: "dashboard" });
  } catch (error) {
    console.warn("No fue posible autenticar con el backend.", error);
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
  text-align: center;
  width: 100%;
  justify-content: center;
  align-items: center;
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

.login-card_title {
  margin: 0 0 12px;
  font-size: clamp(2rem, 3vw, 3rem);
  line-height: 1.1;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

.logo {
  width: 100%;
  max-width: 240px;
  margin-bottom: 24px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.electric-button {
  padding: 16px;
  border: none;
  border-radius: 16px;
  background: var(--color-primary);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

.electric-button:disabled {
  background: var(--color-primary-soft);
  cursor: not-allowed;
}

.electric-button:not(:disabled):hover {
  background: var(--color-primary-strong);
}


.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-pill.primary {
  border-color: rgba(79, 70, 229, 0.22);
  background: rgba(79, 70, 229, 0.16);
  color: var(--color-primary);
}

.status-pill.neutral {
  border-color: rgba(123, 111, 116, 0.22);
  background: rgba(123, 111, 116, 0.16);
  color: var(--color-text-soft);
}

.status-pill.success {
  border-color: rgba(34, 197, 94, 0.22);
  background: rgba(34, 197, 94, 0.16);
  color: var(--color-success);
}

.status-pill.warning {
  border-color: rgba(197, 155, 82, 0.22);
  background: rgba(197, 155, 82, 0.16);
  color: var(--color-warning);
}

.status-pill.danger {
  border-color: rgba(239, 68, 68, 0.22);
  background: rgba(239, 68, 68, 0.16);
}


</style>

