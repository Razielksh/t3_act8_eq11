import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getRecipes, addRecipe, updateRecipe, deleteRecipe } from '../../services/api';
import RecipeTable from '../recipes/RecipeTable';
import RecipeModal from '../recipes/RecipeModal';
import './Pages.css';

const translateCuisine = (cuisine) => {
  const cuisinesMap = {
    'Italian': 'Italiana',
    'Asian': 'Asiática',
    'American': 'Americana',
    'Mexican': 'Mexicana',
    'Mediterranean': 'Mediterránea',
    'Indian': 'India',
    'Greek': 'Griega',
    'Japanese': 'Japonesa',
    'Thai': 'Tailandesa',
    'Spanish': 'Española',
    'French': 'Francesa',
    'Korean': 'Coreana',
    'Turkish': 'Turca',
    'Moroccan': 'Marroquí',
    'Pakistani': 'Pakistaní',
    'Brazilian': 'Brasileña',
    'Russian': 'Rusa',
    'Lebanese': 'Libanesa',
    'Vietnamese': 'Vietnamita'
  };
  return cuisinesMap[cuisine] || cuisine;
};

export default function Recetas() {
  // Lista principal de recetas de la API
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtros y Paginacion
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('');

  // Busqueda temporal
  const [tempSearch, setTempSearch] = useState('');

  // Lista de cocinas obtenidas de la API
  const [cuisines, setCuisines] = useState([]);

  // Control de Modales
  const [mostrarAddModal, setMostrarAddModal] = useState(false);
  const [mostrarEditModal, setMostrarEditModal] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);

  // Estados del formulario
  const [formName, setFormName] = useState('');
  const [formCuisine, setFormCuisine] = useState('');
  const [formDifficulty, setFormDifficulty] = useState('Easy');
  const [formPrepTime, setFormPrepTime] = useState(15);
  const [formCookTime, setFormCookTime] = useState(15);

  // Analizar los parámetros de URL al montar y la navegación popstate
  useEffect(() => {
    const parseUrlParams = () => {
      const queryParams = new URLSearchParams(window.location.search);
      const p = parseInt(queryParams.get('page')) || 1;
      const l = parseInt(queryParams.get('limit')) || 10;
      const q = queryParams.get('q') || '';
      const c = queryParams.get('cuisine') || '';

      setPage(p);
      setLimit(l);
      setSearchQuery(q);
      setTempSearch(q);
      setCuisineFilter(c);
    };

    parseUrlParams();
    window.addEventListener('popstate', parseUrlParams);
    return () => window.removeEventListener('popstate', parseUrlParams);
  }, []);

  // Actualizar parametros de URL cuando cambia el estado del filtro/paginacion
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    let updated = false;

    if (queryParams.get('page') !== String(page)) {
      queryParams.set('page', page);
      updated = true;
    }
    if (queryParams.get('limit') !== String(limit)) {
      queryParams.set('limit', limit);
      updated = true;
    }
    if ((queryParams.get('q') || '') !== searchQuery) {
      if (searchQuery) {
        queryParams.set('q', searchQuery);
      } else {
        queryParams.delete('q');
      }
      updated = true;
    }
    if ((queryParams.get('cuisine') || '') !== cuisineFilter) {
      if (cuisineFilter) {
        queryParams.set('cuisine', cuisineFilter);
      } else {
        queryParams.delete('cuisine');
      }
      updated = true;
    }

    if (updated) {
      const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
      window.history.pushState(null, '', newUrl);
    }
  }, [page, limit, searchQuery, cuisineFilter]);

  // Buscar recetas al iniciar
  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRecipes();
      setRecipes(data.recipes || []);

      const uniqueCuisines = Array.from(new Set((data.recipes || []).map(r => r.cuisine))).filter(Boolean).sort();
      setCuisines(uniqueCuisines);
    } catch (err) {
      console.error(err);
      setError(err.message || 'No se pudieron obtener las recetas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Filtrar recetas localmente
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = cuisineFilter === '' || recipe.cuisine === cuisineFilter;
    return matchesSearch && matchesCuisine;
  });

  // Paginacion local
  const totalRecipes = filteredRecipes.length;
  const totalPages = Math.ceil(totalRecipes / limit) || 1;

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const displayedRecipes = filteredRecipes.slice(startIndex, endIndex);

  // Commit busqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(tempSearch);
    setPage(1);
  };

  // Filtro de cocina
  const handleCuisineChange = (e) => {
    const value = e.target.value;
    setCuisineFilter(value);
    setPage(1);
  };

  // Limite por pagina
  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value);
    setLimit(value);
    setPage(1);
  };

  // Agregar Receta
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!formName.trim() || !formCuisine.trim()) return;

    try {
      const newRecipeApi = await addRecipe({
        name: formName.trim(),
        cuisine: formCuisine.trim(),
        difficulty: formDifficulty,
        prepTimeMinutes: Number(formPrepTime),
        cookTimeMinutes: Number(formCookTime)
      });

      const localNewRecipe = {
        ...newRecipeApi,
        id: recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) + 1 : 1
      };

      setRecipes([localNewRecipe, ...recipes]);

      // Reset y cerrar
      setFormName('');
      setFormCuisine('');
      setFormDifficulty('Easy');
      setFormPrepTime(15);
      setFormCookTime(15);
      setMostrarAddModal(false);

      Swal.fire({
        icon: 'success',
        title: '¡Receta agregada!',
        text: 'La receta se guardó correctamente.',
        confirmButtonColor: '#553246',
        timer: 2500,
        timerProgressBar: true
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar la receta en el servidor.',
        confirmButtonColor: '#553246'
      });
    }
  };

  // Editar click
  const handleEditClick = (recipe) => {
    setEditingRecipe(recipe);
    setFormName(recipe.name);
    setFormCuisine(recipe.cuisine);
    setFormDifficulty(recipe.difficulty);
    setFormPrepTime(recipe.prepTimeMinutes);
    setFormCookTime(recipe.cookTimeMinutes);
    setMostrarEditModal(true);
  };

  // Editar Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingRecipe) return;

    const result = await Swal.fire({
      title: '¿Editar receta?',
      text: '¿Estás seguro de que deseas guardar los cambios?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#553246',
      cancelButtonColor: '#706870',
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar'
    });
    if (!result.isConfirmed) return;

    try {
      const updatedRecipeApi = await updateRecipe(editingRecipe.id, {
        name: formName.trim(),
        cuisine: formCuisine.trim(),
        difficulty: formDifficulty,
        prepTimeMinutes: Number(formPrepTime),
        cookTimeMinutes: Number(formCookTime)
      });

      setRecipes(recipes.map(r => r.id === editingRecipe.id ? { ...r, ...updatedRecipeApi } : r));

      setEditingRecipe(null);
      setFormName('');
      setFormCuisine('');
      setFormDifficulty('Easy');
      setFormPrepTime(15);
      setFormCookTime(15);
      setMostrarEditModal(false);

      Swal.fire({
        icon: 'success',
        title: '¡Receta actualizada!',
        text: 'Los cambios se guardaron correctamente.',
        confirmButtonColor: '#553246',
        timer: 2500,
        timerProgressBar: true
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar la receta en el servidor.',
        confirmButtonColor: '#553246'
      });
    }
  };

  // Eliminar Receta
  const handleDeleteClick = async (id, name) => {
    const result = await Swal.fire({
      title: '¿Eliminar receta?',
      text: `¿Estás seguro de que deseas eliminar "${name}"? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c8413b',
      cancelButtonColor: '#706870',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (!result.isConfirmed) return;

    try {
      await deleteRecipe(id);
      setRecipes(recipes.filter(r => r.id !== id));

      Swal.fire({
        icon: 'success',
        title: '¡Eliminada!',
        text: `La receta "${name}" fue eliminada correctamente.`,
        confirmButtonColor: '#553246',
        timer: 2500,
        timerProgressBar: true
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar la receta en el servidor.',
        confirmButtonColor: '#553246'
      });
    }
  };

  // Vista de carga
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando recetas...</p>
      </div>
    );
  }

  // Vista de error
  if (error) {
    return (
      <div className="error-container">
        <div className="error-alert">
          <p>⚠️ {error}</p>
          <button className="retry-btn" onClick={fetchRecipes}>Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Recetas</h1>
          <p className="page-subtitle">Administración de recetas culinarias</p>
        </div>
      </div>

      {/* Barra de Filtros y Controles */}
      <div className="controls-bar">
        <div className="controls-left">
          <form className="search-container" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar receta..."
              value={tempSearch}
              onChange={(e) => setTempSearch(e.target.value)}
            />
            <button type="submit" className="search-btn" aria-label="Buscar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>

          <div className="filter-group">
            <label htmlFor="filter-cuisine" className="filter-label">Cocina:</label>
            <select
              id="filter-cuisine"
              className="filter-select"
              value={cuisineFilter}
              onChange={handleCuisineChange}
            >
              <option value="">Todas las cocinas</option>
              {cuisines.map(c => (
                <option key={c} value={c}>{translateCuisine(c)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="controls-right">
          <div className="limit-group">
            <label htmlFor="limit-select" className="filter-label">Mostrar:</label>
            <select
              id="limit-select"
              className="filter-select"
              value={limit}
              onChange={handleLimitChange}
            >
              <option value="10">10 registros</option>
              <option value="20">20 registros</option>
              <option value="40">40 registros</option>
              <option value="50">50 registros</option>
            </select>
          </div>

          <button
            className="add-btn"
            onClick={() => {
              setEditingRecipe(null);
              setFormName('');
              setFormCuisine('');
              setFormDifficulty('Easy');
              setFormPrepTime(15);
              setFormCookTime(15);
              setMostrarAddModal(true);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Agregar Receta
          </button>
        </div>
      </div>

      {/* Tabla Modular */}
      <RecipeTable
        displayedRecipes={displayedRecipes}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* Paginación */}
      <div className="pagination-container">
        <nav aria-label="Navegación de páginas">
          <ul className="pagination-list">
            <li>
              <button
                className={`page-btn ${page === 1 ? 'disabled' : ''}`}
                onClick={() => page > 1 && setPage(page - 1)}
                disabled={page === 1}
                aria-label="Anterior"
              >
                &lt;
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(pNum => (
              <li key={pNum}>
                <button
                  className={`page-btn ${page === pNum ? 'active' : ''}`}
                  onClick={() => setPage(pNum)}
                >
                  {pNum}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`page-btn ${page === totalPages ? 'disabled' : ''}`}
                onClick={() => page < totalPages && setPage(page + 1)}
                disabled={page === totalPages}
                aria-label="Siguiente"
              >
                &gt;
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Modal de Agregar (Modular) */}
      <RecipeModal
        isOpen={mostrarAddModal}
        title="Agregar Receta"
        onClose={() => setMostrarAddModal(false)}
        onSubmit={handleAddSubmit}
        formName={formName}
        setFormName={setFormName}
        formCuisine={formCuisine}
        setFormCuisine={setFormCuisine}
        formDifficulty={formDifficulty}
        setFormDifficulty={setFormDifficulty}
        formPrepTime={formPrepTime}
        setFormPrepTime={setFormPrepTime}
        formCookTime={formCookTime}
        setFormCookTime={setFormCookTime}
      />

      {/* Modal de Editar (Modular) */}
      <RecipeModal
        isOpen={mostrarEditModal}
        title="Editar Receta"
        onClose={() => setMostrarEditModal(false)}
        onSubmit={handleEditSubmit}
        formName={formName}
        setFormName={setFormName}
        formCuisine={formCuisine}
        setFormCuisine={setFormCuisine}
        formDifficulty={formDifficulty}
        setFormDifficulty={setFormDifficulty}
        formPrepTime={formPrepTime}
        setFormPrepTime={setFormPrepTime}
        formCookTime={formCookTime}
        setFormCookTime={setFormCookTime}
      />
    </div>
  );
}
