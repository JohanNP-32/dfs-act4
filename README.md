# Tom Ford Inventario 🚀

## 🌐 Despliegue en la Nube
Puedes acceder a la aplicación en vivo a través del siguiente enlace:
👉 **[https://dfs-act4v2.vercel.app/](https://dfs-act4v2.vercel.app/)**

---

## 🛠️ Tecnologías Utilizadas
* **Backend:** Node.js y Express.
* **Base de Datos:** MongoDB Atlas (NoSQL).
* **Frontend:** HTML5, CSS3 y JavaScript Vanilla con diseño profesional minimalista.
* **Seguridad:** JWT (JSON Web Tokens) y Bcrypt para encriptación de contraseñas.
* **Pruebas:** Jest para pruebas unitarias automatizadas.
* **CI/CD:** GitHub Actions para integración continua.

---


## Estructura del Repositorio
* /public: Interfaz de usuario (Frontend).
* /src: Modelos de Mongoose y rutas de la API.
* /test: Suite de pruebas con Jest.
* .github/workflows: Configuración de automatización (CI).

---  

## 💻 Ejecución Local

Sigue estos pasos para correr el proyecto en tu entorno local:

### 1. Requisitos Previos
* Tener instalado **Node.js** (v18 o superior).
* Una instancia activa de **MongoDB Atlas**.

### 2. Instalación
1. Clona el repositorio
2. Instalar dependencias:
  # 1. Inicializar el proyecto (si no existe package.json)
  ```bash
  npm init -y
   ```

  # 2. Servidor y Base de Datos
  ```bash
  npm install express mongoose dotenv cors
  ```

  # 3. Seguridad y Autenticación
  ```bash
  npm install jsonwebtoken bcryptjs
  ```

  # 4. Herramientas de Desarrollo y Pruebas
  ```bash
  npm install --save-dev jest supertest
  ```

### 3. Configuración
Crea un archivo .env en la raíz con tus credenciales:
MONGO_URI=tu_cadena_de_conexion_de_mongodb
JWT_SECRET=tu_clave_secreta_para_tokens
PORT=3000

### 4. Inicializar
```bash
node server.js
```

---

### 5. Pruebas Automatizadas
Para ejecutar la suite de pruebas unitarias y verificar la integridad del sistema:

```bash
npm test
```


