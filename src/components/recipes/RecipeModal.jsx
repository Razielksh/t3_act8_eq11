import React from 'react';

export default function RecipeModal({
  isOpen,
  title,
  onClose,
  onSubmit,
  formName,
  setFormName,
  formCuisine,
  setFormCuisine,
  formDifficulty,
  setFormDifficulty,
  formPrepTime,
  setFormPrepTime,
  formCookTime,
  setFormCookTime
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="modal-receta">Nombre de la receta:</label>
            <input
              id="modal-receta"
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Ej: Tacos de Asada"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="modal-cocina">Cocina / Origen:</label>
            <input
              id="modal-cocina"
              type="text"
              value={formCuisine}
              onChange={(e) => setFormCuisine(e.target.value)}
              placeholder="Ej: Mexican, Italian"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="modal-dificultad">Dificultad:</label>
            <select
              id="modal-dificultad"
              value={formDifficulty}
              onChange={(e) => setFormDifficulty(e.target.value)}
            >
              <option value="Easy">Fácil (Easy)</option>
              <option value="Medium">Medio (Medium)</option>
              <option value="Hard">Difícil (Hard)</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="modal-prep">Prep (minutos):</label>
              <input
                id="modal-prep"
                type="number"
                value={formPrepTime}
                onChange={(e) => setFormPrepTime(e.target.value)}
                min="1"
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="modal-cook">Cocción (min):</label>
              <input
                id="modal-cook"
                type="number"
                value={formCookTime}
                onChange={(e) => setFormCookTime(e.target.value)}
                min="0"
                required
              />
            </div>
          </div>
          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="save-btn"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
