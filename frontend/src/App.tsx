import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/home';
import About from './routes/about';
import Sign from './routes/sign';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/about' Component={About} />
        <Route path='/sign-up' Component={Sign} />
        <Route path='/sign-in' Component={Sign} />
      </Routes>
    </div>
  );
}

export default App;
