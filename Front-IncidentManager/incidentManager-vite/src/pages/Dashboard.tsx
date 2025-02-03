import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#007bff',
        color: '#ffffff',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Dashboard</h3>
        <button
          className="btn btn-light d-md-none"
          onClick={toggleSidebar}
          style={{
            borderRadius: '5px',
            padding: '8px 12px',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {isSidebarCollapsed ? '☰' : '✕'}
        </button>
      </header>

      {/* Contenedor principal */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside style={{
          width: isSidebarCollapsed ? '0' : '250px',
          backgroundColor: '#343a40',
          color: '#ffffff',
          transition: 'width 0.3s ease',
          padding: '20px',
          boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          position: 'fixed',
          height: '100vh',
          zIndex: 999
        }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '15px' }}>
              <a href="#!" style={{
                color: '#ffffff',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '16px'
              }}>
                <span>🏠</span>
                {!isSidebarCollapsed && 'Inicio'}
              </a>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <a href="#!" style={{
                color: '#ffffff',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '16px'
              }}>
                <span>📊</span>
                {!isSidebarCollapsed && 'Reportes'}
              </a>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <a href="#!" style={{
                color: '#ffffff',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '16px'
              }}>
                <span>⚙️</span>
                {!isSidebarCollapsed && 'Configuración'}
              </a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#f8f9fa',
          transition: 'margin-left 0.3s ease',
          marginLeft: isSidebarCollapsed ? '0' : '250px',
          width: '100%'
        }}>
          <h2 style={{ color: '#333333', marginBottom: '20px' }}>Bienvenido al Dashboard</h2>
          <div style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <p style={{ color: '#555555', fontSize: '16px' }}>
              Este es el contenido principal del dashboard. Aquí puedes mostrar gráficos, tablas, estadísticas, etc.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;