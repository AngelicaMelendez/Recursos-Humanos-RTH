# Guia de Mantenimiento Futuro

## 1. Si cambia la version de Vue

Primero ejecuta:

```bash
npm run detect:vue
```

Si el resultado cambia a otra rama tecnologica:

- revisa `front_end/src/main.js`
- revisa `front_end/src/router/index.js`
- revisa `front_end/src/store/`
- confirma compatibilidad de FullCalendar y plugins

## 2. Si crecen los modulos

La convencion recomendada es:

1. crear modelo en `back_end/models`
2. crear controlador en `back_end/controllers`
3. crear rutas en `back_end/routes`
4. conectar la ruta en `back_end/routes/index.js`
5. crear pagina o componente en `front_end/src/pages` o `front_end/src/components`
6. crear servicio frontend si el modulo consume API
7. documentar el endpoint en `docs/API.md`

## 3. Si se agregan mas roles

- actualiza el catalogo en `Back-end/utils/roles.js`
- agrega el nuevo valor al `ENUM` en `Back-end/models/usuario.js`
- si el rol debe entrar a modulos de supervision, incluyelo en `ROLE_GROUPS`
- sincroniza alias y etiquetas en `front_end/src/utils/permissions.js`
- revisa el organigrama en `Back-end/controllers/organigrama_Controller.js`

### Roles usados por el organigrama

- `direccion_general`: titular del organismo
- `jefe_area`: responsable de una direccion
- `subjefe_area`: responsable de una subdireccion
- `responsable_departamento`: responsable de un departamento
- `empleado`: personal operativo
- `admin_rh` y `recepcion`: roles funcionales del sistema; se muestran como etiqueta adicional si la persona tambien aparece en el organigrama

### Para agregar otro rol

1. agrega la clave en `Back-end/utils/roles.js` y su etiqueta
2. agrega alias equivalentes en backend y frontend
3. agrega el valor al `ENUM` de `models/usuario.js`
4. si debe aprobar solicitudes, comunicados o asistencia, sumalo al grupo correspondiente
5. si debe verse distinto en el organigrama, ajusta `detectAreaType` o `getHierarchyRoleForArea`

### Para quitar un rol

1. reasigna primero los usuarios que lo tengan en la tabla `usuarios`
2. quitalo de `ROLE_GROUPS` en backend y frontend
3. elimina aliases y etiquetas
4. al final retiralo del `ENUM` en `models/usuario.js`

## 4. Si se modifica la identidad institucional

Los cambios visuales deben empezar en:

- `front_end/src/styles/variables.css`
- `front_end/src/styles/layout.css`
- componentes de navegacion

Evita meter estilos inline para no romper consistencia.

## 5. Si se agregan reportes o BI

La zona natural para nuevos calculos es:

- `back_end/services/dashboardService.js`
- nuevos endpoints en `back_end/controllers`
- nuevos componentes de graficas en `front_end/src/components/charts`

## 6. Si se endurece seguridad

Proximas mejoras recomendadas:

- refresh tokens
- rate limiting
- control de sesiones por dispositivo
- escaneo antivirus de documentos
- permisos mas granulares por operacion
- bitacora extendida con antes y despues de cambios criticos

## 7. Si se despliega a produccion

Validar al menos:

1. variables de entorno reales
2. carpeta de uploads persistente
3. conexion segura a base de datos
4. HTTPS
5. backups
6. estrategia de migraciones Sequelize
