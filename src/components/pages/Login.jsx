import React, { useState } from 'react';
import { loginUser } from '../../services/api';
import './Login.css';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'El usuario es requerido.';
    if (!password.trim()) newErrors.password = 'La contraseña es requerida.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const data = await loginUser(username.trim(), password.trim());
      onLogin(data);
    } catch (err) {
      setError(err.message === 'Credenciales inválidas' ? 'Usuario o contraseña incorrectos.' : 'Error de conexión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-panel-left"></div>

        <div className="login-panel-right">
          <h1 className="login-title">Inicio de Sesión</h1>
          <p className="login-subtitle">Ingrese sus credenciales</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="login-field">
              <input
                id="login-username"
                type="text"
                className={`login-input ${errors.username ? 'input-error' : ''}`}
                placeholder="emilys"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors(prev => ({ ...prev, username: '' }));
                }}
                autoFocus
              />
              {errors.username && <p className="field-error">{errors.username}</p>}
            </div>

            <div className="login-field">
              <div className={`password-wrapper ${errors.password ? 'input-error' : ''}`}>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="login-input password-input"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors(prev => ({ ...prev, password: '' }));
                  }}
                />
              </div>
              {errors.password && <p className="field-error">{errors.password}</p>}
            </div>

            {error && (
              <div className="login-error-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {error}
              </div>
            )}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Iniciando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
