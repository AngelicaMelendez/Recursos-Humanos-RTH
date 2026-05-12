import api from "@/services/api";

export default {
  // Registrar entrada (check-in)
  async registrarEntrada() {
    const { data } = await api.post("/asistencia/entrada");
    return data;
  },

  // Registrar salida (check-out)
  async registrarSalida() {
    const { data } = await api.post("/asistencia/salida");
    return data;
  },

  // Obtener mi asistencia
  async getMiAsistencia(fechaInicio = null, fechaFin = null) {
    const params = {};
    if (fechaInicio) params.fecha_inicio = fechaInicio;
    if (fechaFin) params.fecha_fin = fechaFin;

    const { data } = await api.get("/asistencia/mi-asistencia", { params });
    return data;
  },

  // Obtener asistencia de un empleado (admin)
  async getAsistenciaEmpleado(empleadoId, fechaInicio = null, fechaFin = null) {
    const params = {};
    if (fechaInicio) params.fecha_inicio = fechaInicio;
    if (fechaFin) params.fecha_fin = fechaFin;

    const { data } = await api.get(`/asistencia/empleado/${empleadoId}`, { params });
    return data;
  },

  // Obtener resumen mensual (admin)
  async getResumenMes() {
    const { data } = await api.get("/asistencia/admin/resumen-mes");
    return data;
  },
};
