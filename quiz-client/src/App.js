import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Authenticate from './components/Authenticate';
import Login from './components/Login';
import Recommendation from './components/Recommendation';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
            <Route path="/recommendation" element={<Recommendation />} />
            {/* <Route path="/recommendation" element={<Authenticate><Recommendation /></Authenticate>} /> */}
    
          </Routes>
    </BrowserRouter >
  );
}

export default App;
