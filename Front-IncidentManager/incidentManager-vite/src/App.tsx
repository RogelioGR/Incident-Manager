import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/* Importancion de paginas y componetes */
import LoginPage from './pages/PageLogin';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <>
   <Router>
  
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Dashboard />} />


          <Route path="/" element={<LoginPage />} />

        </Routes>
     
    </Router>

    </>
  )
}

export default App
