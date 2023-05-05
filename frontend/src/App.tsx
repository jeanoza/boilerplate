import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/home';
import About from './routes/about';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/about' Component={About} />
      </Routes>
    </div>
  );
}

export default App;
