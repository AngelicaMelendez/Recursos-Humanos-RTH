import { defineStore } from "pinia";
import comunicadosService from "@/services/comunicados.service";

export const useComunicadosStore = defineStore("comunicados", {
  state: () => ({
    comunicados: [],
    masReciente: null,
    historial: [],
    loading: false,
    error: null,
  }),

  getters: {
    comunicadosPorArea: (state) => (areaId) => {
      return state.comunicados.filter((c) => c.area_id === areaId || c.area_id === null);
    },

    cantidadReacciones: (state) => (comunicadoId) => {
      const comunicado = state.comunicados.find((c) => c.id === comunicadoId);
      return comunicado?.reacciones?.length || 0;
    },

    yuaReaccionaste: (state) => (comunicadoId, usuarioId) => {
      const comunicado = state.comunicados.find((c) => c.id === comunicadoId);
      return comunicado?.reacciones?.some((r) => r.usuario_id === usuarioId) || false;
    },
  },

  actions: {
    async obtenerComunicados(areaId = null) {
      this.loading = true;
      this.error = null;

      try {
        this.comunicados = await comunicadosService.list(areaId);
      } catch (err) {
        this.error = err.message;
        this.comunicados = [];
      } finally {
        this.loading = false;
      }
    },

    async obtenerMasReciente(areaId = null) {
      this.loading = true;
      this.error = null;

      try {
        this.masReciente = await comunicadosService.getMasReciente(areaId);
      } catch (err) {
        this.error = err.message;
        this.masReciente = null;
      } finally {
        this.loading = false;
      }
    },

    async crearComunicado(payload) {
      this.loading = true;
      this.error = null;

      try {
        const nuevoComunicado = await comunicadosService.create(payload);
        this.comunicados.unshift(nuevoComunicado);
        this.masReciente = nuevoComunicado;
        return nuevoComunicado;
      } catch (err) {
        this.error = err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async editarComunicado(id, payload) {
      this.loading = true;
      this.error = null;

      try {
        const actualizado = await comunicadosService.update(id, payload);
        const index = this.comunicados.findIndex((c) => c.id === id);
        if (index !== -1) {
          this.comunicados[index] = actualizado;
        }
        if (this.masReciente?.id === id) {
          this.masReciente = actualizado;
        }
        return actualizado;
      } catch (err) {
        this.error = err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async eliminarComunicado(id) {
      this.loading = true;
      this.error = null;

      try {
        await comunicadosService.delete(id);
        this.comunicados = this.comunicados.filter((c) => c.id !== id);
        if (this.masReciente?.id === id) {
          this.masReciente = this.comunicados[0] || null;
        }
      } catch (err) {
        this.error = err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async toggleReaction(comunicadoId, usuarioId) {
      try {
        await comunicadosService.toggleReaction(comunicadoId);

        const comunicado = this.comunicados.find((c) => c.id === comunicadoId);
        if (comunicado) {
          const yaReaccionaste = comunicado.reacciones?.some((r) => r.usuario_id === usuarioId);

          if (yaReaccionaste) {
            comunicado.reacciones = comunicado.reacciones.filter(
              (r) => r.usuario_id !== usuarioId
            );
          } else {
            if (!comunicado.reacciones) comunicado.reacciones = [];
            comunicado.reacciones.push({
              usuario_id: usuarioId,
              createdAt: new Date().toISOString(),
            });
          }
        }

        if (this.masReciente?.id === comunicadoId) {
          const copia = { ...this.masReciente };
          const yaReaccionaste = copia.reacciones?.some((r) => r.usuario_id === usuarioId);

          if (yaReaccionaste) {
            copia.reacciones = copia.reacciones.filter((r) => r.usuario_id !== usuarioId);
          } else {
            if (!copia.reacciones) copia.reacciones = [];
            copia.reacciones.push({
              usuario_id: usuarioId,
              createdAt: new Date().toISOString(),
            });
          }
          this.masReciente = copia;
        }
      } catch (err) {
        this.error = err.message;
        throw err;
      }
    },

    async obtenerHistorial() {
      this.loading = true;
      this.error = null;

      try {
        this.historial = await comunicadosService.getHistorial();
      } catch (err) {
        this.error = err.message;
        this.historial = [];
      } finally {
        this.loading = false;
      }
    },
  },
});
