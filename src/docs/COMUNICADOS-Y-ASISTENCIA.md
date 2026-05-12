# Módulos: Comunicados y Registro de Asistencia

Documentación técnica para los módulos de Comunicados Segmentados y Registro de Asistencia.

## Módulo 1: Comunicados Segmentados

### Descripción General

Sistema de publicación y gestión de comunicados internos con capacidades de segmentación por área, reacciones de usuarios y auditoría administrativa.

### Características

#### Segmentación y Visualización
- Los comunicados se pueden segmentar por **Área u Oficina** mediante `area_id`
- Interface de lectura muestra el comunicado más reciente de forma destacada
- Botón "Ver más" expande lista horizontal desplazable con otros comunicados
- Cada ítem muestra fecha/hora de creación

#### Roles y Permisos

| Rol | Permisos |
|-----|----------|
| **Administrador RH** | Crear, Editar, Eliminar, Ver historial, Ver reacciones |
| **Jefe de Área** | Crear, Ver comunicados, Reaccionar |
| **Dirección** | Crear, Ver comunicados, Reaccionar |
| **Empleado** | Ver comunicados, Reaccionar (Like) |

#### Comunicados Programados (Temporales)

- Al crear un comunicado, se define opcionalmente una `fecha_vencimiento`
- Una vez vencidos, desaparecen de la vista pública automáticamente
- Siguen guardados en BD con `estatus: 'vencido'`
- El sistema valida automáticamente en cada consulta

#### Historial y Auditoría (Solo Admin)

Panel exclusivo para administradores con:
- Historial completo de comunicados (activos y vencidos)
- Tablas de reacciones con:
  - Nombre del usuario que reaccionó
  - Fecha y hora exacta de la reacción
  - Contador de reacciones por comunicado

### Modelos de Base de Datos

#### Tabla: `comunicados`

```sql
- id: INTEGER (PK)
- titulo: STRING (requerido)
- contenido: TEXT (requerido)
- area_id: INTEGER (FK a areas, nullable)
- usuario_id: INTEGER (FK a usuarios, requerido)
- tipo: ENUM('publico', 'privado') default 'publico'
- fecha_vencimiento: DATE (nullable)
- estatus: ENUM('activo', 'vencido', 'archivado') default 'activo'
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP
```

#### Tabla: `reacciones_comunicados`

```sql
- id: INTEGER (PK)
- comunicado_id: INTEGER (FK a comunicados)
- usuario_id: INTEGER (FK a usuarios)
- tipo: ENUM('like') default 'like'
- createdAt: TIMESTAMP
- UNIQUE(comunicado_id, usuario_id)
```

### Rutas API

```
GET    /api/comunicados                    # Obtener comunicados activos
GET    /api/comunicados/mas-reciente       # Obtener más reciente
POST   /api/comunicados                    # Crear (Admin/Jefe de Área)
PATCH  /api/comunicados/:id                # Editar
DELETE /api/comunicados/:id                # Eliminar (Solo Admin)
POST   /api/comunicados/:id/reacciones     # Agregar/remover like
GET    /api/comunicados/admin/historial    # Historial completo (Admin)
GET    /api/comunicados/:id/reacciones     # Ver reacciones (Admin)
```

### Componentes Frontend

#### `ComunicadoDestacado.vue`
- Muestra el comunicado más reciente
- Incluye acciones de editar/eliminar para admins
- Botón de reacción (like) con contador
- Muestra fecha de vencimiento si aplica

#### `ComunicadosLista.vue`
- Lista horizontal de comunicados recientes
- Scroll derecho para navegación
- Cada item muestra: fecha/hora, título, resumen, contador de reacciones
- Clickeable para seleccionar

#### `ComunicadosPage.vue`
- Página principal del módulo
- Integra componentes Destacado y Lista
- Modal para crear/editar comunicados
- Panel de administración con tabs: Historial y Reacciones

### Store (Pinia): `comunicados.js`

```javascript
// State
- comunicados: []
- masReciente: null
- historial: []
- loading: boolean
- error: string

// Getters
- comunicadosPorArea(areaId)
- cantidadReacciones(comunicadoId)
- yuaReaccionaste(comunicadoId, usuarioId)

// Actions
- obtenerComunicados(areaId)
- obtenerMasReciente(areaId)
- crearComunicado(payload)
- editarComunicado(id, payload)
- eliminarComunicado(id)
- toggleReaction(comunicadoId, usuarioId)
- obtenerHistorial()
```

### Styling

Paleta de colores según requisitos:
- **Fondo primario**: `#0f0f1f` (Negro profundo)
- **Fondo secundario**: `#1a1a2e` (Azul medianoche)
- **Acento eléctrico**: `#b38e5d` (Dorado/Bronce)
- **Éxito**: `#4caf50`
- **Advertencia**: `#ffc107`
- **Error**: `#f44336`

---

## Módulo 2: Registro de Asistencia (Check-in/Check-out)

### Descripción General

Sistema de captura de entrada/salida con validación automática de puntualidad, historial de movimientos y panel de administración.

### Características

#### Lógica de Registro
- Captura **hora actual del sistema** para entrada y salida
- Validación automática:
  - **Entrada a las 8:00 AM**: base para puntualidad
  - **Salida a las 17:00 (5:00 PM)**: base para control de salida
- Sistema calcula minutos de retardo
- Notificación en tiempo real al usuario

#### Validación de Puntualidad

**Entrada:**
- `a_tiempo`: Entrada ≤ 08:00 AM
- `retardo`: Entrada > 08:00 AM (con minutos calculados)
- `ausente`: Sin registro
- `licencia`: Licencia registrada

**Salida:**
- `normal`: Salida ≈ 17:00 (±tolerancia)
- `temprano`: Salida < 17:00
- `tarde`: Salida > 17:00 (horas extra)
- `sin_registro`: Sin registro

#### Historial de Movimientos
- Visualización en formato lista con fechas formateadas
- Cada registro muestra:
  - Fecha con día de semana
  - Hora de entrada/salida
  - Etiquetas de color por estatus
  - Minutos de retardo si aplica
- Filtrable por rango de fechas

#### Panel de Administración
- **Resumen Mensual**: Vista agregada por empleado/área
- **Asistencia por Empleado**: Búsqueda y filtrado individual
- Tabla detallada con estatus visualizado por colores

### Modelos de Base de Datos

#### Tabla: `asistencias`

```sql
- id: INTEGER (PK)
- empleado_id: INTEGER (FK a empleados, requerido)
- fecha: DATE (requerido)
- hora_entrada: TIME (nullable)
- hora_salida: TIME (nullable)
- estatus_entrada: ENUM('a_tiempo', 'retardo', 'ausente', 'licencia') default 'a_tiempo'
- estatus_salida: ENUM('normal', 'temprano', 'tarde', 'sin_registro') default 'normal'
- minutos_retardo: INTEGER default 0
- notas: TEXT (nullable)
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP
- UNIQUE(empleado_id, fecha)
```

### Rutas API

```
POST   /api/asistencia/entrada                  # Registrar entrada
POST   /api/asistencia/salida                   # Registrar salida
GET    /api/asistencia/mi-asistencia            # Mi historial
GET    /api/asistencia/empleado/:empleado_id   # Historial de empleado
GET    /api/asistencia/admin/resumen-mes        # Resumen del mes (Admin)
```

### Componentes Frontend

#### `CheckInCheckOut.vue`
- Muestra estado actual: entrada y salida
- Botones "Registrar entrada" y "Registrar salida"
- Estados visuales con etiquetas de color
- Notificación de último registro exitoso
- Indicador de carga y errores

#### `HistoricoAsistencia.vue`
- Tabla de registros históricos
- Filtros por rango de fechas
- Columnas: Fecha, Entrada, Estatus Entrada, Salida, Estatus Salida
- Responsive con scroll horizontal en mobile

#### `AttendancePage.vue`
- Página principal del módulo
- Integra CheckInCheckOut en la parte superior
- Panel de historial personal
- Panel de administración con tabs:
  - Resumen Mensual: tabla de todos los empleados
  - Asistencia por Empleado: búsqueda y filtrado

### Store (Pinia): `asistencia.js`

```javascript
// State
- asistenciaHoy: Object (registro del día)
- historicoAsistencia: []
- resumenMes: []
- loading: boolean
- error: string
- ultimoRegistro: Object (notificación)

// Getters
- yaRegistroEntrada: boolean
- yaRegistroSalida: boolean
- estatusEntrada: string
- estatusSalida: string
- resumenEstatus: Object

// Actions
- registrarEntrada()
- registrarSalida()
- obtenerMiAsistencia(fechaInicio, fechaFin)
- obtenerAsistenciaEmpleado(empleadoId, fechaInicio, fechaFin)
- obtenerResumenMes()
- limpiarError()
- limpiarUltimoRegistro()
```

### Lógica de Negocio (Servidor)

```javascript
// Validación de puntualidad
const calcularEstatusPuntualidad = (horaEntrada) => {
  if (!horaEntrada) return 'ausente';
  
  const horaEntradaObj = new Date(`1970-01-01 ${horaEntrada}`);
  const horaLimite = new Date(`1970-01-01 08:00:00`);
  
  return horaEntradaObj <= horaLimite ? 'a_tiempo' : 'retardo';
};

// Cálculo de minutos de retardo
const calcularMinutosRetardo = (horaEntrada) => {
  if (!horaEntrada) return 0;
  
  const horaEntradaObj = new Date(`1970-01-01 ${horaEntrada}`);
  const horaLimite = new Date(`1970-01-01 08:00:00`);
  
  if (horaEntradaObj > horaLimite) {
    return Math.round((horaEntradaObj - horaLimite) / 60000);
  }
  
  return 0;
};
```

### Styling

Colores de estatus:
- **A tiempo**: Verde `#4caf50`
- **Retardo**: Amarillo `#ffc107`
- **Ausente**: Rojo `#f44336`
- **Licencia**: Azul `#2196f3`
- **Normal**: Verde `#4caf50`
- **Temprano**: Azul `#2196f3`
- **Horas extra**: Dorado `#b38e5d`

---

## Eliminación de Etiquetas CRUD

**Importante**: Se eliminaron todas las etiquetas de texto "C", "R", "U", "D" de las interfaces.

### Sustituciones realizadas:
- **Crear (C)** → Botones con ícono `+` o textos descriptivos: "Publicar", "Registrar"
- **Leer (R)** → Botones con ícono `👁` o simplemente "Ver"
- **Editar (U)** → Botones con ícono `✏️` o textos descriptivos: "Actualizar", "Editar"
- **Eliminar (D)** → Botones con ícono `🗑️` o textos descriptivos: "Eliminar", "Remover"

Todos los iconos se muestran visualmente en lugar de texto CRUD.

---

## Notas Importantes

1. **Autenticación**: Todos los endpoints requieren token JWT válido en header `Authorization`
2. **Roles**: La validación de roles se realiza en middleware `auth.js` y `roles.js`
3. **Timestamps**: Todos los registros incluyen `createdAt` y `updatedAt` automáticos
4. **Soft Deletes**: Los comunicados vencidos no se eliminan, cambian de estatus
5. **Validación**: El servidor valida automáticamente vencimiento de comunicados en cada consulta
6. **Seguridad**: Los usuarios solo pueden ver su propia asistencia, excepto admins

---

## Próximos Pasos Recomendados

1. Actualizar seeders para incluir datos de prueba
2. Implementar notificaciones en tiempo real (WebSocket)
3. Agregar reportes PDF de asistencia mensual
4. Integrar con sistema de nómina para validación de horas
5. Implementar reminders de comunicados programados
6. Agregar autenticación biométrica para check-in/check-out
