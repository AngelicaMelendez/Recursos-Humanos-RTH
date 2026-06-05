<template>
  <section class="login-card">
    <div class="login-card__content">
      <span class="login-card__eyebrow">Gobierno de Hidalgo 2022-2028</span>
      <h1>Sistema Integral de Gestión de Recursos Humanos</h1>
      <p>Inicia sesión con tus credenciales institucionales.</p>

      <form class="login-form" @submit.prevent="submitLogin">
        <label>
          Nombre de usuario
          <input
            v-model="loginForm.usuario"
            type="text"
            placeholder="Usuario"
            autocomplete="username"
            required
          />
        </label>

        <label>
          Contraseña
          <input
            v-model="loginForm.password"
            type="password"
            placeholder="********"
            autocomplete="current-password"
            required
          />
        </label>

        <button :disabled="authStore.loading" type="submit">
          {{ authStore.loading ? "Ingresando..." : "Ingresar" }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

const router = useRouter();
const authStore = useAuthStore();

const loginForm = reactive({
  usuario: "",
  password: ""
});

const submitLogin = async () => {
  try {
    await authStore.login({
      usuario: loginForm.usuario,
      password: loginForm.password
    });
    router.push({ name: "dashboard" });
  } catch (error) {
    alert(error?.response?.data?.error || "No fue posible autenticar. Verifica tus credenciales.");
  }
};
</script>

<style scoped>
.login-card {
  width: min(100%, 480px);
  padding: 42px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.96);
  color: var(--color-text);
  box-shadow: 0 24px 60px rgba(34, 21, 27, 0.18);
}

.login-card__content h1 {
  margin: 0 0 12px;
  font-size: clamp(2rem, 3vw, 3rem);
  line-height: 1.1;
}

.login-card__eyebrow {
  display: inline-flex;
  margin-bottom: 16px;
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.login-card p {
  color: var(--color-text-soft);
  line-height: 1.6;
}

.login-form {
  display: grid;
  gap: 16px;
  margin-top: 30px;
}

.login-form label {
  display: grid;
  gap: 10px;
  font-weight: 600;
}

.login-form input {
  width: 100%;
  padding: 15px 16px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: #fff;
  color: var(--color-text);
  font: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.login-form input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(98, 17, 50, 0.12);
  outline: none;
}

.login-form button {
  padding: 16px;
  border: none;
  border-radius: 12px;
  background: var(--color-primary);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.login-form button:not(:disabled):hover {
  box-shadow: 0 14px 26px rgba(98, 17, 50, 0.22);
  transform: translateY(-1px);
}

.login-form button:disabled {
  cursor: wait;
  opacity: 0.72;
}


</style>
