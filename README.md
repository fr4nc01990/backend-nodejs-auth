# Backend de Autenticación y Autorización

**Autor**: Franco Raffa  
**Colaboradores/Auditores**: Mauro Raffa, Martin Raffa

## Descripción

Este proyecto es un backend Node.js que implementa un microservicio simulado de autenticación y autorización. Proporciona endpoints RESTful para soportar una aplicación frontend en Angular 17, permitiendo login, registro de usuarios, y acceso a datos protegidos mediante JSON Web Tokens (JWT). El backend usa un archivo JSON (`users.json`) como base de datos simulada, diseñado para fines de aprendizaje.

El propósito principal es servir como soporte para el frontend, proporcionando:

- Autenticación de usuarios (`/api/auth/login`, `/api/auth/register`).
- Protección de endpoints con JWT (`/api/getAll`).
- Gestión de roles (`user`, `admin`) para autorización.

Este backend debe usarse junto con el frontend Angular correspondiente. Consulta el repositorio del frontend para más detalles.

## Tecnologías Usadas

- **Node.js 16+**: Entorno de ejecución para el servidor.
- **Express**: Framework para crear APIs RESTful.
- **JSON Web Tokens (JWT)**: Autenticación basada en tokens.
- **TypeScript**: Tipado estático para el código del servidor.
- **fs/promises**: Manejo de archivos para la base de datos simulada (`users.json`).
- **nodemon**: Herramienta para reiniciar el servidor automáticamente durante el desarrollo.

## Prerrequisitos

- **Node.js 16+**: Para ejecutar el servidor y instalar dependencias.
- **Frontend Angular**: El backend está diseñado para trabajar con un frontend Angular que consume sus endpoints. Asegúrate de tener el frontend configurado y corriendo (ver repositorio del frontend).

## Instalación

1. Clona este repositorio (o navega a la carpeta del backend):

   ```bash
   cd backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Verifica que el archivo `src/resources/users.json` exista y contenga usuarios de prueba (ver sección "Usuarios de Prueba" abajo).

4. (Opcional) Configura la clave secreta para JWT en una variable de entorno. Por simplicidad, el proyecto usa una clave hardcoded (`tu-clave-secreta`) en `authController.ts` y `authMiddleware.ts`. En producción, usa un archivo `.env`:

   ```bash
   echo "SECRET_KEY=tu-clave-secreta-segura" > .env
   ```

   Y actualiza el código para usar `process.env.SECRET_KEY` con el paquete `dotenv`.

## Development Server

El **development server** es el servidor local que ejecuta la API durante el desarrollo, permitiendo probar los endpoints y detectar cambios en el código con reinicio automático (usando `nodemon`).

### Iniciar el Development Server

1. En la carpeta del backend, ejecuta:

   ```bash
   npm run dev
   ```

2. El servidor estará disponible en:

   ```
   http://localhost:8081
   ```

   - Los endpoints principales son `/api/auth/login`, `/api/auth/register`, y `/api/getAll`.
   - Si cambias el puerto (por ejemplo, en `app.ts`), ajusta la URL en el frontend (`environment.ts`).

### Notas

- El frontend Angular debe configurarse para consumir la API en `http://localhost:8081/api` (ver `environment.ts` del frontend).
- Si modificas el código, `nodemon` reiniciará el servidor automáticamente.

## Endpoints

- **POST /api/auth/login**:
  - Autentica usuarios con email y contraseña.
  - Devuelve un JWT y datos del usuario (`id`, `email`, `role`).
  - Ejemplo:
    ```bash
    curl -X POST http://localhost:8081/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email": "test@example.com", "password": "123456"}'
    ```
- **POST /api/auth/register**:
  - Registra nuevos usuarios, guardando en `users.json`.
  - Valida emails duplicados.
  - Ejemplo:
    ```bash
    curl -X POST http://localhost:8081/api/auth/register \
    -H "Content-Type: application/json" \
    -
    ```
