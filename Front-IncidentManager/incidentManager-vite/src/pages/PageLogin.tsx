import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div style={{ 
      backgroundColor: '#f0f2f5', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px' // Añade padding para dispositivos móviles
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg" style={{ 
              borderRadius: '15px', 
              backgroundColor: '#ffffff',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              transform: 'scale(1)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <div className="card-body p-4 p-md-5">
                <h3 className="text-center mb-4" style={{ 
                  color: '#333333', 
                  fontWeight: 'bold', 
                  fontSize: '28px',
                  letterSpacing: '1px'
                }}>Incident Manager</h3>
                <p className="text-center text-muted mb-4" style={{ 
                  fontSize: '14px',
                  letterSpacing: '0.5px'
                }}>Gestiona tus incidentes de manera eficiente</p>
                
                <form onSubmit={handleSubmit}>
                  {/* Campo de correo electrónico */}
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label text-muted small" style={{ 
                      fontWeight: '500',
                      letterSpacing: '0.5px'
                    }}>
                      Correo Electrónico:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ingresa tu correo"
                      style={{ 
                        borderRadius: '10px', 
                        border: '1px solid #e0e0e0', 
                        padding: '12px', 
                        fontSize: '12px',
                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                        letterSpacing: '0.5px'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#007bff';
                        e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e0e0e0';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Campo de contraseña */}
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label text-muted small" style={{ 
                      fontWeight: '500',
                      letterSpacing: '0.5px'
                    }}>
                      Contraseña:
                    </label>
                    <div className="input-group">
                      <input
                        type={ "password"}
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                        style={{ 
                          borderRadius: '10px', 
                          border: '1px solid #e0e0e0', 
                          padding: '12px', 
                          fontSize: '14px',
                          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                          letterSpacing: '0.5px'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#007bff';
                          e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e0e0e0';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                  
                    </div>
                  </div>

                  {/* Botón de inicio de sesión */}
                  <button 
                    type="submit" 
                    className="btn w-100"
                    style={{ 
                      backgroundColor: '#007bff', 
                      color: '#ffffff', 
                      borderRadius: '10px', 
                      border: 'none', 
                      padding: '12px', 
                      fontWeight: 'bold',
                      fontSize: '16px',
                      transition: 'background-color 0.3s ease, transform 0.3s ease',
                      transform: 'scale(1)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#0056b3';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#007bff';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    Iniciar sesión
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;