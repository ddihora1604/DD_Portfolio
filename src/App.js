import React, { useEffect } from 'react';
import Layout from './Layout';
import Portfolio from './pages/Portfolio';
import lenis from './utils/lenis';
import './index.css';

function App() {
  useEffect(() => {
    function handleScroll(e) {
      // Lenis scroll event - can be used for custom animations
      console.log('Smooth scroll active:', e.scroll);
    }

    lenis.on('scroll', handleScroll);

    return () => {
      lenis.off('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout>
      <Portfolio />
    </Layout>
  );
}

export default App;