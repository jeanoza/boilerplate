import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/home';
import About from './routes/about';
import Sign from './routes/sign';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-up' element={<Sign />} />
        <Route path='/sign-in' element={<Sign />} />
      </Routes>
    </div>
  );
}

export default App;
