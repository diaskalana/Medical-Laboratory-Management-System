import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'


function Patient() {
  return (
   
          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
          </Routes>
     
  );
}

export default Patient;
