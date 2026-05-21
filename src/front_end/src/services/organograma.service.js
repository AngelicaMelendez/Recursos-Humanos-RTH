import api from './api';

export default {
  // Obtener organigrama completo (árbol)
  obtenerOrganigrama() {
    return api.get('http://localhost:8000/api/organigrama');
  },

  // Listar empleados (directorio)
  listarEmpleados(params) {
    return api.get('http://localhost:8000/api/directorio', { params });
  },

  // Obtener un empleado
  obtenerEmpleado(id) {
    return api.get(`http://localhost:8000/api/directorio/${id}`);
  },

  // Dar de baja empleado
  darDeBaja(id, motivo) {
    return api.put(`http://localhost:8000/api/directorio/${id}/baja`, { motivo });
  },

  // Listar áreas
  listarAreas() {
    return api.get('http://localhost:8000/api/directorio/areas');
  },

  // Listar puestos
  listarPuestos() {
    return api.get('http://localhost:8000/api/directorio/puestos');
  }
};