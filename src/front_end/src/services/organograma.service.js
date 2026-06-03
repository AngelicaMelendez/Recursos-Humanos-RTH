import api from './api';

export default {
  // Obtener organigrama completo (árbol)
  obtenerOrganigrama() {
    return api.get("/organigrama");
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

  // Listar áreas
  listarAreas() {
    return api.get("/directorio/areas");
  },

  listarDirecciones() {
    return api.get("/directorio/direcciones");
  },

  listarDepartamentos(direccionId = null) {
    const params = direccionId ? { direccion_id: direccionId } : {};
    return api.get("/directorio/departamentos", { params });
  },

  // Listar puestos
  listarPuestos() {
    return api.get("/directorio/puestos");
  }
};
