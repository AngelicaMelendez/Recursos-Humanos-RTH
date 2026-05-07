# Arquitectura del Proyecto

## Visión general

El proyecto se dividió en dos capas principales:

- `front_end/`: aplicación cliente en Vue
- `back_end/`: API REST en Express + Sequelize

La separación permite evolucionar frontend y backend sin acoplar lógica de negocio con presentación.

## Frontend

### `front_end/src/components/`

Contiene componentes reutilizables.

- `ui/`: piezas base como cards, tabla, íconos y estadísticas.
- `navigation/`: sidebar y topbar institucional.
- `charts/`: gráficas del dashboard.
- `calendar/`: integración de FullCalendar.
- `orgchart/`: nodo recursivo para organigrama.
- `shared/`: encabezados, badges y bloques comunes.

### `front_end/src/layouts/`

- `AuthLayout.vue`: envolvente para login.
- `MainLayout.vue`: layout principal con sidebar y contenido.

### `front_end/src/pages/`

Cada archivo representa un módulo del sistema:

- dashboard
- calendario
- organigrama
- directorio
- solicitudes
- normatividad
- vacantes
- visitantes
- pasantes
- control de accesos
- auditoría

### `front_end/src/router/`

Maneja navegación y protección de rutas. Si no existe token, redirige a `/login`.

### `front_end/src/store/`

- `auth.js`: sesión, token y usuario.
- `dashboard.js`: estado del tablero institucional.

### `front_end/src/services/`

- `api.js`: instancia central de Axios.
- `auth.service.js`: autenticación.

### `front_end/src/styles/`

Capas de estilo:

- `variables.css`: identidad visual
- `base.css`: base global
- `layout.css`: rejillas y layout
- `components.css`: elementos comunes

## Backend

### `back_end/config/`

- `env.js`: variables de entorno
- `database.js`: instancia Sequelize

### `back_end/models/`

Modelos principales:

- `Area`
- `Position`
- `Employee`
- `EmployeeDocument`
- `PositionHistory`
- `Incident`
- `Request`
- `Normativity`
- `Vacancy`
- `Visitor`
- `Intern`
- `User`
- `AuditLog`

### `back_end/controllers/`

Resuelven la lógica de cada módulo:

- autenticación
- dashboard
- organización
- directorio
- incidencias
- solicitudes
- normatividad
- vacantes
- visitantes
- pasantes
- accesos
- auditoría

### `back_end/routes/`

Define endpoints por recurso y aplica middleware de seguridad.

### `back_end/middlewares/`

- `authMiddleware`: valida JWT
- `roleMiddleware`: verifica permisos por rol
- `validateRequest`: concentra errores de validación
- `sanitizeMiddleware`: limpia payloads
- `uploadMiddleware`: gestiona archivos
- `errorHandler`: respuesta uniforme de errores

### `back_end/services/`

- `tokenService`: firma y verifica JWT
- `auditService`: registra bitácoras
- `dashboardService`: arma el resumen ejecutivo

### `back_end/uploads/`

Destino base para documentos, PDFs y adjuntos del sistema.

## Principios usados

- `No eliminar empleados`: siempre conservar historial.
- `Rutas protegidas`: todo módulo sensible exige JWT.
- `Roles`: permisos mínimos por perfil.
- `Módulos desacoplados`: cada recurso tiene modelo, controlador y ruta.
- `Escalabilidad`: la estructura soporta agregar reportes, notificaciones o firma digital.

## Identidad visual

La UI utiliza:

- `#621132` como color dominante
- `#b38e5d` como acento
- `Montserrat` como tipografía principal
- fondos blancos y neutros
- tarjetas modernas y tablas limpias
- animaciones discretas
