# Guía de Mantenimiento Futuro

## 1. Si cambia la versión de Vue

Primero ejecuta:

```bash
npm run detect:vue
```

Si el resultado cambia a otra rama tecnológica:

- revisa `front_end/src/main.js`
- revisa `front_end/src/router/index.js`
- revisa `front_end/src/store/`
- confirma compatibilidad de FullCalendar y plugins

## 2. Si crecen los módulos

La convención recomendada es:

1. crear modelo en `back_end/models`
2. crear controlador en `back_end/controllers`
3. crear rutas en `back_end/routes`
4. conectar la ruta en `back_end/routes/index.js`
5. crear página o componente en `front_end/src/pages` o `front_end/src/components`
6. crear servicio frontend si el módulo consume API
7. documentar el endpoint en `docs/API.md`

## 3. Si se agregan más roles

- actualiza `roleMiddleware`
- ajusta permisos en cada archivo de rutas
- sincroniza menús visibles del frontend si el acceso depende del perfil

## 4. Si se modifica la identidad institucional

Los cambios visuales deben empezar en:

- `front_end/src/styles/variables.css`
- `front_end/src/styles/layout.css`
- componentes de navegación

Evita meter estilos inline para no romper consistencia.

## 5. Si se agregan reportes o BI

La zona natural para nuevos cálculos es:

- `back_end/services/dashboardService.js`
- nuevos endpoints en `back_end/controllers`
- nuevos componentes de gráficas en `front_end/src/components/charts`

## 6. Si se endurece seguridad

Próximas mejoras recomendadas:

- refresh tokens
- rate limiting
- control de sesiones por dispositivo
- escaneo antivirus de documentos
- permisos más granulares por operación
- bitácora extendida con antes y después de cambios críticos

## 7. Si se despliega a producción

Validar al menos:

1. variables de entorno reales
2. carpeta de uploads persistente
3. conexión segura a base de datos
4. HTTPS
5. backups
6. estrategia de migraciones Sequelize
