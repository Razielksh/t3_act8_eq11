const BASE_URL = 'https://dummyjson.com';

/**
 * Realiza el login de usuario.
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<Object>} Datos del usuario autenticado
 */
export async function loginUser(username, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    throw new Error('Credenciales inválidas');
  }
  return res.json();
}

/**
 * Obtiene la lista completa de recetas.
 * @returns {Promise<Object>} Respuesta con la lista de recetas
 */
export async function getRecipes() {
  const res = await fetch(`${BASE_URL}/recipes?limit=0`);
  if (!res.ok) {
    throw new Error(`Error del servidor al obtener recetas: ${res.status}`);
  }
  return res.json();
}

/**
 * Agrega una receta simulada en la API.
 * @param {Object} recipeData 
 * @returns {Promise<Object>} Receta agregada
 */
export async function addRecipe(recipeData) {
  const res = await fetch(`${BASE_URL}/recipes/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipeData)
  });
  if (!res.ok) {
    throw new Error(`Error al guardar la receta: ${res.status}`);
  }
  return res.json();
}

/**
 * Actualiza una receta simulada en la API.
 * @param {number|string} id 
 * @param {Object} recipeData 
 * @returns {Promise<Object>} Receta actualizada
 */
export async function updateRecipe(id, recipeData) {
  const res = await fetch(`${BASE_URL}/recipes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipeData)
  });
  if (!res.ok) {
    throw new Error(`Error al actualizar la receta: ${res.status}`);
  }
  return res.json();
}

/**
 * Elimina una receta simulada en la API.
 * @param {number|string} id 
 * @returns {Promise<Object>} Receta eliminada
 */
export async function deleteRecipe(id) {
  const res = await fetch(`${BASE_URL}/recipes/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    throw new Error(`Error al eliminar la receta: ${res.status}`);
  }
  return res.json();
}
