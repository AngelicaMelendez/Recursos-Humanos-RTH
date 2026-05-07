# Comandos Git Bash Explicados

Esta guía usa `Git Bash` como terminal principal.

## 1. Revisar el estado del repositorio

```bash
git status --short --branch
```

Explicación:

- `git status` muestra el estado actual del repositorio.
- `--short` da una salida compacta.
- `--branch` agrega la rama actual.

## 2. Revisar historial reciente

```bash
git log --oneline -n 5
```

Explicación:

- `git log` muestra el historial de commits.
- `--oneline` resume cada commit en una línea.
- `-n 5` limita la salida a los 5 commits más recientes.

## 3. Detectar la versión de Vue

```bash
npm run detect:vue
```

Explicación:

- ejecuta el script raíz
- delega al `package.json` de `front_end/`
- confirma la versión de Vue usada por el frontend

## 4. Instalar dependencias del frontend

```bash
cd front_end
npm install
cd ..
```

Explicación:

- `cd front_end` entra a la carpeta del frontend
- `npm install` instala las dependencias listadas en `front_end/package.json`
- `cd ..` regresa a la raíz del proyecto

## 5. Instalar dependencias del backend

```bash
cd back_end
npm install
cd ..
```

Explicación:

- `cd back_end` entra a la carpeta del backend
- `npm install` instala Express, Sequelize y demás dependencias del servidor
- `cd ..` regresa a la raíz del proyecto

## 6. Copiar variables de entorno

```bash
cp back_end/.env.example back_end/.env
```

Explicación:

- `cp` copia archivos
- se toma el archivo ejemplo
- se crea el archivo real de entorno para configurar base de datos y JWT

## 7. Levantar el backend

```bash
npm run dev:back_end
```

Explicación:

- ejecuta el script del `package.json` raíz
- usa `npm --prefix back_end run dev`
- inicia Express con recarga en desarrollo

## 8. Levantar el frontend

```bash
npm run dev:front_end
```

Explicación:

- ejecuta el script del `package.json` raíz
- usa `npm --prefix front_end run dev`
- inicia Vite en modo desarrollo

## 9. Generar build de producción del frontend

```bash
npm run build:front_end
```

Explicación:

- compila el proyecto Vue dentro de `front_end/`
- optimiza assets
- genera `front_end/dist`

## 10. Probar el build localmente

```bash
npm run preview:front_end
```

Explicación:

- abre una vista local del build ya compilado
- ayuda a validar cómo quedaría producción

## 11. Revisar la estructura creada

```bash
find front_end -maxdepth 2 -type d
find back_end -maxdepth 2 -type d
```

Explicación:

- `find` busca archivos o carpetas
- `front_end` o `back_end` indican desde dónde buscar
- `-maxdepth 2` limita cuántos niveles bajar
- `-type d` pide solo directorios

## Flujo recomendado de trabajo diario

```bash
git status --short --branch
npm run detect:vue
npm run dev:back_end
npm run dev:front_end
```

Lectura del flujo:

1. verificas rama y cambios
2. confirmas versión de Vue
3. levantas backend
4. levantas frontend
