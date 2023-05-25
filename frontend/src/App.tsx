import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/home';
import About from './routes/about';
import Sign from './routes/sign';
import AuthLayout from './components/authLayout';

function App() {
  return (
    <AuthLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-up' element={<Sign />} />
        <Route path='/sign-in' element={<Sign />} />
      </Routes>
    </AuthLayout>
  );
}

export default App;
