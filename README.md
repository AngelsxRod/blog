# 📝 TodoList API - NestJS + MongoDB

Una API REST completa para gestionar tareas (todos) construida con **NestJS**, **MongoDB** y **TypeScript**. Incluye autenticación, validaciones robustas, gestión de configuración y buenas prácticas de seguridad.

## ✨ Características

### 🔐 Seguridad
- ✅ Hash de contraseñas con bcrypt
- ✅ Validación de contraseñas fuertes (mayúscula, minúscula, número, carácter especial)
- ✅ Validación automática de datos (DTOs con class-validator)
- ✅ CORS configurable
- ✅ Rate limiting
- ✅ Variables de entorno para datos sensibles

### 📚 Gestión de Usuarios
- ✅ Crear usuario (POST /users)
- ✅ Listar usuarios (GET /users)
- ✅ Obtener usuario (GET /users/:id)
- ✅ Actualizar usuario (PATCH /users/:id)
- ✅ Eliminar usuario (DELETE /users/:id)
- ✅ Paginación automática

### 🎯 Validaciones
- ✅ Email único y válido
- ✅ Nombre sin caracteres especiales
- ✅ Contraseña fuerte requerida
- ✅ Actualización con al menos un campo
- ✅ Validación de MongoDB ObjectIds
- ✅ Validación de parámetros de paginación

### ⚙️ Configuración
- ✅ Sistema de variables de entorno
- ✅ Múltiples configuraciones por entorno (dev, prod, test)
- ✅ Validación automática de variables
- ✅ Configuración centralizada

### 📖 Documentación
- ✅ Swagger/OpenAPI (habilitado en desarrollo)
- ✅ Documentación de variables de entorno
- ✅ Guía de configuración completa
- ✅ Ejemplos de uso

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 18+ 
- MongoDB (local o Atlas)
- pnpm (recomendado) o npm

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repo-url>
cd blog
```

2. **Ejecutar setup (automático)**

**Windows (PowerShell):**
```powershell
.\setup.ps1
```

**Linux/macOS:**
```bash
chmod +x setup.sh
./setup.sh
```

**Manual:**
```bash
cp .env.example .env
pnpm install
pnpm run build
```

3. **Configurar variables de entorno**

Editar `.env`:
```env
NODE_ENV=development
DB_URI=mongodb://localhost:27017/blog
APP_PORT=3000
```

4. **Iniciar servidor**

```bash
# Desarrollo (con autoreload)
pnpm run start:dev

# Producción
NODE_ENV=production pnpm run start:prod
```

5. **Acceder a la API**

```
API: http://localhost:3000
Swagger: http://localhost:3000/api
```

## 📋 Endpoints

### Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/users` | Listar usuarios (con paginación) |
| POST | `/users` | Crear usuario |
| GET | `/users/:id` | Obtener usuario por ID |
| PATCH | `/users/:id` | Actualizar usuario |
| DELETE | `/users/:id` | Eliminar usuario |

### Parámetros de Query

**GET /users:**
```
?page=1&limit=10
```

### Body Ejemplos

**POST /users (Crear):**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "SecurePass123!"
}
```

**PATCH /users/:id (Actualizar):**
```json
{
  "name": "Juan Carlos",
  "email": "juan2@example.com"
}
```

## 🔐 Requisitos de Validación

### Email
- ✅ Formato válido (RFC 5322)
- ✅ Único en la base de datos
- ✅ Se normaliza a minúsculas
- ✅ Se eliminan espacios

### Nombre
- ✅ 2-50 caracteres
- ✅ Solo letras y espacios
- ✅ Se eliminan espacios al inicio/final

### Contraseña
- ✅ 8-100 caracteres
- ✅ Al menos 1 mayúscula (A-Z)
- ✅ Al menos 1 minúscula (a-z)
- ✅ Al menos 1 número (0-9)
- ✅ Al menos 1 carácter especial (@$!%*?&)
- ✅ Se hashea con bcrypt (10 rounds en dev, 12 en prod)

**Ejemplos de contraseña:**
- ✅ Válida: `SecurePass123!`
- ❌ Inválida: `password` (sin mayúsculas, números ni especiales)
- ❌ Inválida: `Pass1!` (menos de 8 caracteres)

## 📁 Estructura del Proyecto

```
src/
├── config/                      # Configuración centralizada
│   ├── app.config.ts           # Objeto de configuración
│   ├── env.validation.ts       # Validación de variables
│   └── index.ts
├── common/
│   ├── pipes/                  # Pipes personalizados
│   │   ├── parse-mongo-id.pipe.ts
│   │   ├── pagination.pipe.ts
│   │   └── index.ts
│   └── validators/             # Validadores personalizados
│       ├── is-not-empty-update.validator.ts
│       └── index.ts
├── users/                       # Módulo de usuarios
│   ├── dto/                    # Data Transfer Objects
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── schema/                 # Esquemas de MongoDB
│   │   └── user.schema.ts
│   ├── users.service.ts        # Lógica de negocio
│   ├── users.controller.ts     # Endpoints HTTP
│   └── users.module.ts
├── app.module.ts               # Módulo principal
├── app.controller.ts
├── app.service.ts
└── main.ts                     # Punto de entrada

# Archivos de configuración
.env                            # Configuración local (NO commitar)
.env.example                    # Plantilla (commitar)
.env.development                # Configuración de desarrollo
.env.production                 # Configuración de producción
.env.testing                    # Configuración de testing
```

## 🌍 Variables de Entorno

Ver documentación completa en `ENVIRONMENT_CONFIG_GUIDE.md`

### Principales

```env
# Aplicación
NODE_ENV=development
APP_NAME=TodoList
APP_PORT=3000
APP_HOST=localhost

# Base de datos
DB_URI=mongodb://localhost:27017/blog
DB_NAME=blog

# Seguridad
BCRYPT_ROUNDS=10

# Swagger
SWAGGER_ENABLED=true
SWAGGER_PATH=/api

# CORS
CORS_ENABLED=true
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_ENABLED=true
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL=debug
```

## 📦 Scripts Disponibles

```bash
# Desarrollo
pnpm run start:dev          # Iniciar con autoreload
pnpm run start:debug        # Iniciar en modo debug

# Producción
pnpm run build              # Compilar TypeScript
pnpm run start:prod         # Ejecutar producción

# Utilidades
pnpm run lint               # Ejecutar ESLint
pnpm run format             # Formatear código (Prettier)
pnpm test                   # Ejecutar tests
pnpm test:watch             # Tests en modo watch
pnpm test:cov               # Tests con coverage
```

## 🧪 Testing

```bash
# Ejecutar tests
pnpm test

# Tests en modo watch
pnpm test:watch

# Tests con cobertura
pnpm test:cov
```

## 🐳 Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN pnpm install
COPY . .
RUN pnpm run build
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

**Build y run:**
```bash
docker build -t blog .
docker run -e NODE_ENV=production -e DB_URI=mongodb://... -p 3000:3000 blog
```

## 🚀 Despliegue

### Vercel
1. Conectar repositorio a Vercel
2. Agregar variables de entorno en Settings → Environment Variables
3. Deploy automático

### Railway
1. Conectar repositorio
2. Agregar variables en project settings
3. Deploy automático

### Heroku (deprecated pero aún funciona)
1. `heroku create`
2. `heroku config:set NODE_ENV=production DB_URI=...`
3. `git push heroku main`

## 📝 Logs Iniciales

Cuando la aplicación inicia, muestra:

```
✅ TodoList v1.0.0 iniciado en http://localhost:3000
📝 Entorno: development
🔌 Base de datos: mongodb://localhost:27017/blog
📚 Swagger disponible en http://localhost:3000/api
```

## 🔍 Solución de Problemas

### Error: "DB connection refused"
```bash
# Verificar MongoDB está ejecutándose
mongod
# O usar MongoDB Atlas con URI en .env
```

### Error: "PORT already in use"
```bash
# Cambiar puerto en .env
APP_PORT=3001
```

### Error: "Invalid environment variable"
```bash
# Verificar .env tiene todas las variables requeridas
cp .env.example .env
# Y actualizar con tus valores
```

### Tests fallan
```bash
# Usar .env.testing
NODE_ENV=testing pnpm test
```

## 📚 Tecnologías

- **Framework:** NestJS 11.x
- **BD:** MongoDB + Mongoose 9.x
- **Validación:** class-validator, class-transformer
- **Seguridad:** bcrypt 6.x
- **TypeScript:** 5.7.x
- **Testing:** Jest 30.x
- **Linting:** ESLint 9.x
- **Formateado:** Prettier 3.x

## 📖 Documentación Adicional

- [NestJS Docs](https://docs.nestjs.com)
- [Mongoose Docs](https://mongoosejs.com)
- [class-validator](https://github.com/typestack/class-validator)
- [bcrypt npm](https://www.npmjs.com/package/bcrypt)

## 📄 Licencia

UNLICENSED

## 👨‍💻 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crear rama para tu feature (`git checkout -b feature/amazing`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing`)
5. Abrir Pull Request

## 📞 Soporte

Para reportar bugs o solicitar features, crear un issue en el repositorio.

---

**Construido con ❤️ usando NestJS**
