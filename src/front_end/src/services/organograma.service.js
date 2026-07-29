import api from "./api";

export default {
  // Obtener organigrama completo (árbol)
  obtenerOrganigrama() {
    return api.get("/organograma");
  },

  // Listar empleados (directorio)
  listarEmpleados(params) {
    return api.get("/directorio", { params });
  },

  // Obtener un empleado
  obtenerEmpleado(id) {
    return api.get(`/directorio/${id}`);
  },

  // Dar de baja empleado
  darDeBaja(id, motivo) {
    return api.put(`/directorio/${id}/baja`, { motivo });
  },
  
    actualizarEmpleado(id, data) {
    return api.put(`/directorio/${id}`, data);
  },

  listarDepartamentos(departamentoId = null) {
    const params = departamentoId ? { departamento_id: departamentoId } : {};
    return api.get("/directorio/departamentos", { params });
  },

  listarDirecciones(direccionId = null) {
    const params = direccionId ? { direccion_id: direccionId } : {};
    return api.get("/directorio/direcciones", { params });
  },

  // Listar puestos
  listarPuestos() {
    return api.get("/directorio/puestos");
  },
};
