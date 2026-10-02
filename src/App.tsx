import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import About from '@/pages/About';
import Industries from '@/pages/Industries';
import Gallery from '@/pages/Gallery';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import Loader from '@/components/Loader';
import BackToTop from '@/components/BackToTop';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <Loader />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BackToTop />
    </BrowserRouter>
  );
}

export default App;
