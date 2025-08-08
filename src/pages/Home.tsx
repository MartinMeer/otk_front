/**
 * Home page component displaying welcome section and calculator cards
 */

import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import WelcomeSection from '../components/Home/WelcomeSection';
import CalculatorCard from '../components/Home/CalculatorCard';
import LoginModal from '../components/Auth/LoginModal';
import AdPlacement from '../components/Ads/AdPlacement';
import AdSettings from '../components/Ads/AdSettings';
import { 
  Settings, 
  Calculator, 
  Wrench, 
  Triangle,
  Shield,
  Zap,
  Users
} from 'lucide-react';


export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated } = useAuthStore();

  // Handle login button click in header
  useEffect(() => {
    const handleLoginClick = () => {
      if (!isAuthenticated) {
        setShowLoginModal(true);
      }
    };

    // Listen for login button clicks
    const loginButton = document.querySelector('[data-login-trigger]');
    if (loginButton) {
      loginButton.addEventListener('click', handleLoginClick);
    }

    return () => {
      if (loginButton) {
        loginButton.removeEventListener('click', handleLoginClick);
      }
    };
  }, [isAuthenticated]);

  const calculators = [
    {
      title: 'ОСТ 1 00022-80',
      description: 'Расчет неуказанных предельных отклонений для элементов отверстий и валов',
      icon: Settings,
      href: '#ost22',
      standard: 'Неуказанные предельные отклонения'
    },
    {
      title: 'ГОСТ 25347-82',
      description: 'Единая система допусков и посадок. Расчет размеров элементов отверстий и валов',
      icon: Calculator,
      href: '#tolerances',
      standard: 'Единая система допусков и посадок'
    },
    {
      title: 'ГОСТ 16093-2004',
      description: 'Резьба метрическая. Допуски. Посадки с зазором. Расчет среднего и номинального диаметра',
      icon: Wrench,
      href: '#thread',
      standard: 'Резьба метрическая'
    },
    {
      title: 'Расчет фасок',
      description: 'Расчет размеров фасок по заданным параметрам и углам',
      icon: Triangle,
      href: '#chamfer',
      standard: 'Геометрические расчеты'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <WelcomeSection />
        
        {/* Main Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
              <div className="lg:col-span-4">
                <h2 className="text-3xl font-bold text-center text-blue-900">
                  Профессиональные инструменты для выполнения измерений и расчетов 
                  в соответствии с действующими стандартами
                </h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Calculator Cards */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {calculators.map((calculator, index) => (
                    <CalculatorCard 
                      key={index}
                      {...calculator}
                    />
                  ))}
                </div>
              </div>
              
              {/* Sidebar with Professional Ads */}
              <div className="lg:col-span-1">
                <AdPlacement 
                  placement="sidebar-primary"
                  title="Рекомендуемые решения"
                  maxAds={2}
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-blue-900 mb-6">О проекте</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Проект "Ассистент контролера ОТК" разработан для упрощения работы с техническими расчетами. 
                Мы стремимся сделать процесс измерений и контроля более удобным и точным, 
                предоставляя современные инструменты для работы с различными стандартами и нормативами.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="flex flex-col items-center p-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-3">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-blue-900">Точные расчеты</h3>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-3">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-blue-900">Соответствие ГОСТу</h3>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-3">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-blue-900">Быстрая работа</h3>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-3">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-blue-900">Для профессионалов</h3>
          </div>
        </div>
        
              
              {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-6 bg-blue-50 rounded-lg">
                  
                  <h3 className="font-semibold text-blue-900 mb-2">Точность</h3>
                  <p className="text-gray-600 text-sm">
                    Все расчеты выполняются в соответствии с действующими стандартами
                  </p>
                </div>
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Удобство</h3>
                  <p className="text-gray-600 text-sm">
                    Простой и интуитивный интерфейс для быстрого получения результатов
                  </p>
                </div>
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Надежность</h3>
                  <p className="text-gray-600 text-sm">
                    Проверенные алгоритмы расчета для профессионального использования
                  </p>
                </div>
              </div>*/}
            </div>
            
            {/* Contextual inline ad */}
            <div className="mt-12">
              <AdPlacement 
                placement="content-inline"
                maxAds={1}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Footer Banner Ads */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <AdPlacement 
            placement="footer-banner"
            title="Партнеры и решения"
            maxAds={2}
          />
        </div>
      </section>
      
      {/* Mobile Sticky Ad */}
      <AdPlacement placement="mobile-sticky" maxAds={1} />
      
      <LoginModal 
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      
      {/* Ad Settings Panel (Dev Mode) */}
      <AdSettings />
    </div>
  );
}