/**
 * Main header component with navigation and authentication
 * TEMPORARILY DISABLED AUTH - Backend development in progress
 */

import { Button } from '../ui/button';
import { useAuthStore } from '../../store/authStore';
import { User, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">ОТК</span>
            </div>
            <h1 className="text-white font-bold text-lg hidden sm:block">
              Ассистент контролера ОТК
            </h1>
            <h1 className="text-white font-bold text-sm sm:hidden">
              ОТК Ассистент
            </h1>
          </div>

          {/* Right side: Navigation + User Menu */}
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#home" className="text-blue-100 hover:text-white transition-colors">
                Главная
              </a>
              <a href="#ost22" className="text-blue-100 hover:text-white transition-colors">
                ОСТ 22
              </a>
              <a href="#tolerances" className="text-blue-100 hover:text-white transition-colors">
                Допуски
              </a>
              <a href="#thread" className="text-blue-100 hover:text-white transition-colors">
                Резьба
              </a>
              <a href="#chamfer" className="text-blue-100 hover:text-white transition-colors">
                Фаски
              </a>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Authentication temporarily disabled during backend development */}
              {/* 
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-transparent border-blue-300 text-white hover:bg-blue-500">
                      <User className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">{user?.username}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-transparent border-blue-300 text-white hover:bg-blue-500"
                  data-login-trigger
                >
                  <User className="w-4 h-4 mr-2" />
                  Войти
                </Button>
              )}
              */}

              {/* Mobile Menu Button */}
              <Button
                variant="outline"
                size="sm"
                className="md:hidden bg-transparent border-blue-300 text-white hover:bg-blue-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500">
            <nav className="flex flex-col space-y-2">
              <a 
                href="#home" 
                className="text-blue-100 hover:text-white py-2 px-4 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Главная
              </a>
              <a 
                href="#ost22" 
                className="text-blue-100 hover:text-white py-2 px-4 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                ОСТ 22
              </a>
              <a 
                href="#tolerances" 
                className="text-blue-100 hover:text-white py-2 px-4 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Допуски и посадки
              </a>
              <a 
                href="#thread" 
                className="text-blue-100 hover:text-white py-2 px-4 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Метрическая резьба
              </a>
              <a 
                href="#chamfer" 
                className="text-blue-100 hover:text-white py-2 px-4 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Расчет фасок
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}