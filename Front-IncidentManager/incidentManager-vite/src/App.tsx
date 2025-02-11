import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/* Importancion de paginas y componetes */
import LoginPage from './pages/PageLogin';
import Dashboard from './pages/Dashboard';
import PageUsers from './pages/PageUsers';
import PageReporte from './pages/PageReporte';
import Usuarios from './pages/usuario';

function App() {

  return (
    <>
   <Router>
  
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/PageUsers" element={<PageUsers />} />
          <Route path="/PageReporte" element={<PageReporte />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/Usuarios" element={<Usuarios />} />

        </Routes>
     
    </Router>

    </>
  )
}

export default App
