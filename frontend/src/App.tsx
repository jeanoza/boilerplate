import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/home';
import About from './routes/about';
import Auth from './routes/auth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/about' Component={About} />
        <Route path='/auth' Component={Auth} />
      </Routes>
    </div>
  );
}

export default App;
