# API REST Documentada

Base URL esperada:

```text
http://localhost:3000/api
```

## Ubicación del backend

Toda la API vive en `back_end/`.

## Autenticación

### `POST /auth/login`

Inicia sesión y devuelve JWT.

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
- datos para gráficas
- actividad reciente
- accesos rápidos

## Organización

### `GET /organization/areas`
### `POST /organization/areas`
### `PUT /organization/areas/:id`

Gestiona áreas del organigrama.

### `GET /organization/puestos`
### `POST /organization/puestos`
### `PUT /organization/puestos/:id`

Gestiona puestos institucionales.

## Directorio

### `GET /directory/employees`

Lista empleados activos.

### `GET /directory/employees/former`

Lista exempleados sin eliminarlos físicamente.

### `POST /directory/employees`

Alta de empleado y creación automática del primer historial de puesto.

### `PATCH /directory/employees/:id/status`

Cambio de estatus, baja o reactivación.

### `GET /directory/employees/:id/documents`
### `POST /directory/employees/:id/documents`

Consulta y carga documental del expediente.

### `GET /directory/employees/:id/history`

Historial de puestos del empleado.

## Incidencias

### `GET /incidents`
### `POST /incidents`
### `PUT /incidents/:id`

Módulo para vacaciones, incapacidades y eventos similares.

## Solicitudes

### `GET /requests`
### `POST /requests`
### `PATCH /requests/:id/resolve`

Flujo de aprobación para permisos y ausencias.

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

Administración de usuarios y roles.

## Auditoría

### `GET /audit`

Consulta eventos auditables recientes.

## Roles contemplados

- `Administrador RH`
- `Dirección`
- `Jefes de Área`
- `Empleado`
- `Recepción`

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
