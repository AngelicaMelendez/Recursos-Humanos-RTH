import { defineStore } from "pinia";
import asistenciaService from "@/services/asistencia.service";

export const useAsistenciaStore = defineStore("asistencia", {
  state: () => ({
    asistenciaHoy: null,
    historicoAsistencia: [],
    resumenMes: [],
    loading: false,
    error: null,
    ultimoRegistro: null,
  }),

  getters: {
    yaRegistroEntrada: (state) => {
      return state.asistenciaHoy?.hora_entrada ? true : false;
    },

    yaRegistroSalida: (state) => {
      return state.asistenciaHoy?.hora_salida ? true : false;
    },

    estatusEntrada: (state) => {
      return state.asistenciaHoy?.estatus_entrada || "sin_registro";
    },

    estatusSalida: (state) => {
      return state.asistenciaHoy?.estatus_salida || "sin_registro";
    },

    resumenEstatus: (state) => {
      return {
        entrada: state.asistenciaHoy?.estatus_entrada,
        salida: state.asistenciaHoy?.estatus_salida,
        retardo: state.asistenciaHoy?.minutos_retardo || 0,
      };
    },
  },

  actions: {
    async registrarEntrada() {
      this.loading = true;
      this.error = null;

      try {
        const resultado = await asistenciaService.registrarEntrada();
        this.asistenciaHoy = resultado.asistencia;
        this.ultimoRegistro = {
          tipo: "entrada",
          estatus: resultado.estatus,
          minutos_retardo: resultado.minutos_retardo,
          mensaje: resultado.mensaje,
        };
        return resultado;
      } catch (err) {
        this.error = err.response?.data?.error || err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async registrarSalida() {
      this.loading = true;
      this.error = null;

      try {
        const resultado = await asistenciaService.registrarSalida();
        this.asistenciaHoy = resultado.asistencia;
        this.ultimoRegistro = {
          tipo: "salida",
          estatus: resultado.estatus_salida,
          mensaje: resultado.mensaje,
        };
        return resultado;
      } catch (err) {
        this.error = err.response?.data?.error || err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async obtenerMiAsistencia(fechaInicio = null, fechaFin = null) {
      this.loading = true;
      this.error = null;

      try {
        this.historicoAsistencia = await asistenciaService.getMiAsistencia(
          fechaInicio,
          fechaFin
        );
      } catch (err) {
        this.error = err.message;
        this.historicoAsistencia = [];
      } finally {
        this.loading = false;
      }
    },

    async obtenerAsistenciaEmpleado(empleadoId, fechaInicio = null, fechaFin = null) {
      this.loading = true;
      this.error = null;

      try {
        this.historicoAsistencia = await asistenciaService.getAsistenciaEmpleado(
          empleadoId,
          fechaInicio,
          fechaFin
        );
      } catch (err) {
        this.error = err.message;
        this.historicoAsistencia = [];
      } finally {
        this.loading = false;
      }
    },

    async obtenerResumenMes() {
      this.loading = true;
      this.error = null;

      try {
        this.resumenMes = await asistenciaService.getResumenMes();
      } catch (err) {
        this.error = err.message;
        this.resumenMes = [];
      } finally {
        this.loading = false;
      }
    },

    limpiarError() {
      this.error = null;
    },

    limpiarUltimoRegistro() {
      this.ultimoRegistro = null;
    },
  },
});
