import React from 'react';

const translateDifficulty = (difficulty) => {
  const diffs = {
    'Easy': 'Fácil',
    'Medium': 'Medio',
    'Hard': 'Difícil'
  };
  return diffs[difficulty] || difficulty;
};

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

export default function RecipeTable({ displayedRecipes, onEdit, onDelete }) {
  return (
    <div className="table-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            <th style={{ width: '80px', textAlign: 'center' }}>ID</th>
            <th>Receta</th>
            <th>Cocina</th>
            <th style={{ width: '180px' }}>Dificultad</th>
            <th style={{ width: '150px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {displayedRecipes.length > 0 ? (
            displayedRecipes.map((recipe) => (
              <tr key={recipe.id}>
                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{recipe.id}</td>
                <td>{recipe.name}</td>
                <td>{translateCuisine(recipe.cuisine)}</td>
                <td>{translateDifficulty(recipe.difficulty)}</td>
                <td>
                  <div className="actions-cell">
                    <button
                      className="action-btn"
                      aria-label="Editar"
                      onClick={() => onEdit(recipe)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"></path>
                      </svg>
                    </button>
                    <button
                      className="action-btn"
                      aria-label="Eliminar"
                      onClick={() => onDelete(recipe.id, recipe.name)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: '#706870' }}>
                No se encontraron recetas con los filtros seleccionados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
