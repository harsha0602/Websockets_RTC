import { useEffect } from 'react';
import { Module1, Module2, Module3, Home } from './pages';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter basename="/Websockets_RTC">
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/module1' element={<Module1 />} />
        <Route path='/module2' element={<Module2 />} />
        <Route path='/module3' element={<Module3 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
