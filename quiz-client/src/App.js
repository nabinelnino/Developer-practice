import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Login from './components/Login';
import Recommendation from './components/Recommendation';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
            <Route path="/recommendation" element={<Recommendation />} />
          
  
          </Routes>
    </BrowserRouter >
  );
}

export default App;
