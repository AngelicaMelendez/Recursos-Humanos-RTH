import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

const DEFAULT_API_TARGET = "http://127.0.0.1:8000";

const createApiAvailabilityGuard = (apiTarget) => {
  let lastCheck = 0;
  let lastStatus = false;

  const isApiAvailable = async () => {
    const now = Date.now();

    if (now - lastCheck < 1500) {
      return lastStatus;
    }

    lastCheck = now;

    try {
      const response = await fetch(`${apiTarget}/api/health`, {
        signal: AbortSignal.timeout(700)
      });
      lastStatus = response.ok;
    } catch {
      lastStatus = false;
    }

    return lastStatus;
  };

  return {
    name: "api-availability-guard",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api")) {
          next();
          return;
        }

        if (await isApiAvailable()) {
          next();
          return;
        }

        res.statusCode = 503;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
          error: "API no disponible",
          details: `Inicia el backend en ${apiTarget}`
        }));
      });
    }
  };
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiTarget = env.VITE_API_TARGET || DEFAULT_API_TARGET;

  return {
    plugins: [vue(), createApiAvailabilityGuard(apiTarget)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: apiTarget,
          changeOrigin: true
        }
      }
    }
  };
});

