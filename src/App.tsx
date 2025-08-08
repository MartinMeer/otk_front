/**
 * Main application component with routing and layout
 */

import { useState, useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LoginModal from './components/Auth/LoginModal';
import FaviconTags from './components/SEO/FaviconTags';
import SEOMetaTags from './components/SEO/SEOMetaTags';
import SEODev from './components/Dev/SEODev';
import { getSEOConfig } from './utils/seoConfig';

// Page components
import HomePage from './pages/Home';
import OST22Calculator from './components/Calculators/OST22Calculator';
import ToleranceCalculator from './components/Calculators/ToleranceCalculator';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated } = useAuthStore();
  
  // Get SEO configuration for current page
  const seoConfig = getSEOConfig(currentPage);

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1) || 'home';
      setCurrentPage(hash);
    };

    // Set initial page
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle login button clicks
  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.textContent?.includes('Войти') && !isAuthenticated) {
        e.preventDefault();
        setShowLoginModal(true);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isAuthenticated]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'ost22':
        return (
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <OST22Calculator />
            </main>
            <Footer />
          </div>
        );
      case 'tolerances':
        return (
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <ToleranceCalculator />
            </main>
            <Footer />
          </div>
        );
      case 'thread':
        return (
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <div className="text-center py-16">
                <h1 className="text-3xl font-bold text-blue-900 mb-4">ГОСТ 16093-2004</h1>
                <p className="text-gray-600">Калькулятор метрической резьбы в разработке</p>
              </div>
            </main>
            <Footer />
          </div>
        );
      case 'chamfer':
        return (
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <div className="text-center py-16">
                <h1 className="text-3xl font-bold text-blue-900 mb-4">Расчет фасок</h1>
                <p className="text-gray-600">Калькулятор фасок в разработке</p>
              </div>
            </main>
            <Footer />
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  // For home page, render it directly (it includes its own Header/Footer)
  if (currentPage === 'home') {
    return (
      <>
        <FaviconTags />
        <SEOMetaTags
          title={seoConfig.title}
          description={seoConfig.description}
          keywords={seoConfig.keywords}
          pageType="website"
          calculatorType={seoConfig.calculatorType}
          ogImage={seoConfig.ogImage}
        />
        <HomePage />
        <LoginModal 
          open={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </>
    );
  }

  // For other pages, render with the main layout
  return (
    <>
      <FaviconTags />
      <SEOMetaTags
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        pageType="calculator"
        calculatorType={seoConfig.calculatorType}
        ogImage={seoConfig.ogImage}
      />
      {renderPage()}
      <LoginModal 
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      
      <SEODev />
    </>
  );
}