# Instituto Tecnológico de Oaxaca
# Ingeniería en Sistemas Computacionales
# Programación Web
# Actividad 8 - Login y CRUD en React

---

## Integrantes del Equipo
* **Integrante 1:** [Huerta García Oscar Raziel]
* **Integrante 2:** [Martínez González Ricardo]

---

## API Seleccionada
Para el consumo de datos y operaciones CRUD en la tabla, se seleccionó la siguiente API:
* **API:** [DummyJSON Recipes](https://dummyjson.com/recipes) (Recetas de cocina)
* **Auth Endpoint:** `https://dummyjson.com/auth/login` (POST)
* **CRUD Endpoints:** 
  - Obtener todas: `https://dummyjson.com/recipes?limit=0`
  - Agregar: `https://dummyjson.com/recipes/add` (POST)
  - Editar: `https://dummyjson.com/recipes/{id}` (PUT)
  - Eliminar: `https://dummyjson.com/recipes/{id}` (DELETE)

---

## Enlace de Despliegue en VPS
* **URL del proyecto:** [http://137.184.133.196/t3_act8_eq11/]

* **URL del repositorio:** [https://github.com/Razielksh/t3_act8_eq11]

---

## Características Principales
1. **Inicio de Sesión:**
   - Consume de forma real la API de DummyJSON para autenticar credenciales.
   - Cuenta con validaciones del lado del cliente (campos obligatorios con mensajes y bordes interactivos en color rojo).
   - *Credenciales de prueba:* Usuario: `emilys` / Contraseña: `emilyspass`.
2. **Dashboard & Sidebar:**
   - La barra lateral (Sidebar) inicia de manera predeterminada colapsada (retraída) y oculta el botón de flecha superior.
   - El navbar superior muestra la foto de perfil real, el nombre del usuario logueado dinámicamente y la opción de cerrar sesión.
3. **Manejo de Recetas (CRUD):**
   - **Filtros**: Permite buscar recetas por nombre e incluye un filtro de categorías por tipo de cocina (traducidos al español).
   - **Paginación**: Permite navegar entre páginas, elegir el número de registros (10, 20, 40, 50) y refleja cada cambio directamente en los parámetros de la URL (`?page=X&limit=Y`).
   - **Alertas Premium**: Todas las confirmaciones y retroalimentaciones de éxito/error al agregar, editar o eliminar recetas utilizan **SweetAlert2**.
