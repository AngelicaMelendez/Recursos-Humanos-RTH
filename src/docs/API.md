# API REST Documentada

Base URL esperada:

```text
http://localhost:3000/api
```

## Ubicacion del backend

Toda la API vive en `back_end/`.

## Autenticacion

### `POST /auth/login`

Inicia sesion y devuelve JWT.

Body:

```json
{
  "email": "admin@hidalgo.gob.mx",
  "password": "Password123!"
}
```

### `GET /auth/me`

Devuelve el usuario autenticado a partir del token.

### `POST /auth/register`

Crea usuarios de acceso. Requiere rol `Administrador RH`.

## Dashboard

### `GET /dashboard`

Devuelve:

- tarjetas resumen
- datos para graficas
- actividad reciente
- accesos rapidos

## Organizacion

### `GET /organization/areas`
### `POST /organization/areas`
### `PUT /organization/areas/:id`

Gestiona areas del organigrama.

### `GET /organization/puestos`
### `POST /organization/puestos`
### `PUT /organization/puestos/:id`

Gestiona puestos institucionales.

## Directorio

### `GET /directory/employees`

Lista empleados activos.

### `GET /directory/employees/former`

Lista exempleados sin eliminarlos fisicamente.

### `POST /directory/employees`

Alta de empleado y creacion automatica del primer historial de puesto.

### `PATCH /directory/employees/:id/status`

Cambio de estatus, baja o reactivacion.

### `GET /directory/employees/:id/documents`
### `POST /directory/employees/:id/documents`

Consulta y carga documental del expediente.

### `GET /directory/employees/:id/history`

Historial de puestos del empleado.

## Incidencias

### `GET /incidents`
### `POST /incidents`
### `PUT /incidents/:id`

Modulo para vacaciones, incapacidades y eventos similares.

## Solicitudes

### `GET /requests`
### `POST /requests`
### `PATCH /requests/:id/resolve`

Flujo de aprobacion para permisos y ausencias.

## Normatividad

### `GET /normativity`
### `POST /normativity`
### `PUT /normativity/:id`

Repositorio documental institucional.

## Vacantes

### `GET /vacancies`
### `POST /vacancies`
### `PUT /vacancies/:id`

Control de vacantes y estatus de reclutamiento.

## Visitantes

### `GET /visitors`
### `POST /visitors`
### `PATCH /visitors/:id/checkout`

Registro de entradas y salidas.

## Pasantes

### `GET /interns`
### `POST /interns`
### `PUT /interns/:id`

Seguimiento de pasantes y convenios.

## Control de accesos

### `GET /access`
### `POST /access`
### `PATCH /access/:id/role`

Administracion de usuarios y roles.

## Auditoria

### `GET /audit`

Consulta eventos auditables recientes.

## Roles contemplados

- `Administrador RH`
- `Direccion General`
- `Jefe de Area`
- `Subjefe de Area`
- `Responsable de Departamento`
- `Empleado`
- `Recepcion`

## Relaciones SQL principales

- `areas` se relaciona consigo misma por `area_padre_id`
- `puestos` pertenece a `areas`
- `empleados` pertenece a `puestos`
- `empleados` puede tener `jefe_directo_id`
- `empleado_documentos` pertenece a `empleados`
- `historial_puestos` pertenece a `empleados` y `puestos`
- `incidencias` pertenece a `empleados`
- `solicitudes` pertenece a `empleados`
- `vacantes` pertenece a `areas`
- `usuarios` puede pertenecer a `empleados`
