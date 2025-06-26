# 📚 API RESTful de Libros

Esta es una API RESTful construida en **Node.js** que permite a los usuarios registrarse, iniciar sesión y gestionar sus libros personales. Incluye funcionalidades como crear, editar, eliminar libros, calificar y actualizar su estado.

---

## 🚀 Tecnologías Utilizadas

- **Node.js**
- **Express**
- **Sequelize** (ORM para bases de datos SQL)
- **JWT (JSON Web Token)** para autenticación
- **bcrypt** para encriptar contraseñas
- **MySQL** como base de datos (puede usarse PostgreSQL o SQLite también)
- **Jest** para realizar las pruebas

---

## 🔐 Autenticación

- Los usuarios se registran con username y contraseña.
- Las contraseñas se almacenan encriptadas con bcrypt.
- Los tokens JWT se utilizan para proteger rutas privadas.

---

## 📁 Endpoints Principales

### Auth (`/api/auth`)

- `POST /register` → Crear una nueva cuenta de usuario o admin
- `POST /login` → Iniciar sesión y obtener un token JWT
- `DELETE /delete-account` → Eliminar la cuenta del usuario autenticado

### Libros (`/api/books`)

- `GET /getbooks` → Obtener todos los libros del usuario logueado
- `GET /filtercategory?category=fiction` -> Obtener los libros por una categoria espesifica
- `GET /searchbooks?title=javascript` -> Obtener los libros por un titulo
- `GET /filterbooks?status=read` -> Obtener los libros por su estado (`unread`, `reading`,`read`)
- `GET /stats` -> Obtiene estadistiscas

  **Respuesta de ejemplo:**
  ```json
  {
    "totalBooks": 15,
    "read": 7,
    "reading": 3,
    "unread": 5,
    "averageRating": 8.2
  }
  ```

- `POST /addbook` → Crear un nuevo libro
- `PUT /updatebook/:id` → Editar un libro existente
- `DELETE /deletebook/:id` → Eliminar un libro (solo si lo creó el usuario o es admin)
- `POST /changebooktatus/:id` → Cambiar estado de lectura (`unread`, `reading`, `read`)
- `POST /changebookrating/:id` → Cambiar calificación (de 0 a 10)

### Admin (`/api/admin`)

- `GET /getallbooks` → Obtener todos los libros registrados y el usuario que los creo
- `GET /getbooks-from-user/:id` → Obtener todos los libros de un solo usuario
- `DELETE /delete-user` → Elimina a un usuario y todos los libros que creo

---

## ✅ Protección con Middleware

- `verifyToken`: Verifica si el usuario tiene un token JWT válido
- `isAdmin`: Verifica si el usuario tiene rol `admin`

---

## 🧪 Validaciones

- Estado de lectura debe ser uno de: `unread`, `reading`, `read`
- Calificación debe estar entre 0 y 10 (y debe ser un número válido)

---

## 🔧 Instalación

```bash
npm install
```

### Configura el archivo `.env` con:

```env
PORT=3000
DB_HOST=...
DB_NAME=...
DB_USER=...
DB_PASSWORD=...
JWT_SECRET=...
```

### Corre el servidor:

```bash
npm run dev
```

---

## 🧪 Tests con Jest

Se realizaron pruebas unitarias y de integración utilizando **Jest** para verificar el correcto funcionamiento de los endpoints protegidos y operaciones con libros.

### ✔️ Funcionalidades probadas:

- Autenticación protegida por token JWT.
- Acceso denegado cuando no se incluye el token.
- Agregado de un libro nuevo con token válido.
- Visualización de libros existentes autenticados.
- Verificación del contenido de las respuestas (códigos de estado, mensajes, estructura JSON, etc.).

### 🧬 Ejecutar pruebas:

```bash
npm test
```

---

## 📌 Notas

- Al eliminar un usuario, todos sus libros se eliminan en cascada (`onDelete: 'CASCADE'`).
- JWT se debe enviar en el header: `Authorization: Bearer <token>`

---

> Proyecto hecho con fines educativos y de aprendizaje en desarrollo backend con Node.js
