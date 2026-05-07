# Sistema Integral de Gestión RH, Visitantes y Pasantes

Sistema institucional para Radio y Televisión de Hidalgo enfocado en recursos humanos, incidencias, gestión documental, visitantes, pasantes, vacantes, control de accesos y auditoría. La interfaz sigue una línea sobria inspirada en Worky y adapta el Manual de Identidad Institucional del Gobierno de Hidalgo 2022-2028.

## Resultado actual

- `front_end/` en `Vue 3 + Vite + Pinia + Vue Router`.
- `back_end/` en `Node.js + Express + Sequelize`.
- `Autenticación` con `JWT`.
- `Seguridad base` con roles, sanitización, validación y rutas protegidas.
- `Diseño institucional` con `Montserrat`, `#621132`, `#b38e5d`, fondos blancos y composición `60/30/10`.
- `Documentación` paso a paso en la carpeta [docs](./docs).

## Separación por carpetas

La estructura quedó dividida así:

- `front_end/`: todo el cliente Vue.
- `back_end/`: toda la API y lógica del servidor.
- `docs/`: documentación operativa y técnica.

## Detección de Vue

No se detectó un proyecto frontend previo dentro del repositorio. La revisión inicial mostró un repositorio prácticamente vacío, así que la base fue creada desde cero y se eligió `Vue 3` como estándar moderno y mantenible.

Comando de detección incluido:

```bash
npm run detect:vue
```

Si en el futuro se integra una base existente en `Vue 2`, la adaptación debe centrarse en:

- `front_end/src/main.js`
- `front_end/src/router/`
- `front_end/src/store/`
- sintaxis de componentes y plugins

## Estructura principal

```text
front_end/
  src/
    components/
    layouts/
    pages/
    router/
    services/
    store/
    assets/
    styles/
    utils/
  index.html
  vite.config.js
  package.json
back_end/
  controllers/
  routes/
  models/
  middlewares/
  services/
  uploads/
  utils/
  config/
  package.json
docs/
package.json
README.md
```

## Instalación paso a paso

### 1. Instalar frontend

```bash
cd front_end
npm install
cd ..
```

Instala Vue, Vite, Pinia, Vue Router, FullCalendar, Chart.js y utilidades del frontend.

### 2. Instalar backend

```bash
cd back_end
npm install
cd ..
```

Instala Express, Sequelize, drivers de MySQL/PostgreSQL, JWT, bcrypt, multer y validadores.

### 3. Configurar variables de entorno

```bash
cp back_end/.env.example back_end/.env
```

Después edita `back_end/.env` con tu conexión real a `MySQL` o `PostgreSQL`.

### 4. Levantar backend

```bash
npm run dev:back_end
```

Inicia el servidor Express en modo desarrollo en `http://localhost:3000`.

### 5. Levantar frontend

```bash
npm run dev:front_end
```

Inicia Vite en `http://localhost:5173`.

## Usuario demo

Mientras se configura la base de datos, el login acepta:

- correo: `admin@hidalgo.gob.mx`
- contraseña: `Password123!`

Esto permite navegar el frontend y validar el flujo visual sin bloquear el arranque del proyecto.

## Módulos incluidos

1. Dashboard ejecutivo
2. Calendario de incidencias con FullCalendar
3. Organigrama institucional
4. Directorio de personal activo e histórico
5. Solicitudes con flujo de aprobación
6. Normatividad en PDF
7. Vacantes
8. Visitantes
9. Pasantes
10. Control de accesos por roles
11. Auditoría

## Identidad visual aplicada

- Color principal: `#621132`
- Color secundario: `#b38e5d`
- Tipografía: `Montserrat`
- Estilo: sobrio, institucional, minimalista
- Layout: sidebar responsive + tablero limpio
- Técnica: `CSS puro`, `variables CSS`, `Flexbox`, `Grid`, `media queries`

## Seguridad implementada

- JWT firmado con secreto configurable
- Middleware `authMiddleware`
- Middleware `roleMiddleware`
- Validación con `express-validator`
- Sanitización base del payload
- Conservación de historial en empleados, puestos y auditoría
- Archivos subidos en `back_end/uploads/`

## Base de datos

Se diseñó el sistema con Sequelize para trabajar con:

- `MySQL`
- `PostgreSQL`

Las relaciones principales están declaradas en [back_end/models/index.js](./back_end/models/index.js).

## Documentación disponible

- [docs/COMANDOS-GIT-BASH.md](./docs/COMANDOS-GIT-BASH.md)
- [docs/ARQUITECTURA.md](./docs/ARQUITECTURA.md)
- [docs/API.md](./docs/API.md)
- [docs/MANTENIMIENTO.md](./docs/MANTENIMIENTO.md)

## Notas importantes

- No se eliminan empleados: el diseño favorece `estatus`, `fecha_baja` y `motivo_baja`.
- El backend ya está separado por módulos para facilitar crecimiento futuro.
- No se ejecutó instalación de dependencias ni pruebas automáticas dentro de esta sesión, por lo que el siguiente paso recomendado es instalar paquetes y validar el arranque local.
