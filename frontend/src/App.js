import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from 'react-router-dom';

import './App.css';
import Cadastro from './pages/Cadastro/Cadastro';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Missing from './pages/Missing/Missing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Cadastro/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/missing/:id' element={<Missing/>}/>
        

      </Routes>
    </Router>
  );
}

export default App;
