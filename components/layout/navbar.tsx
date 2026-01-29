"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Calendar, 
  Users, 
  DollarSign, 
  FileText, 
  Settings,
  Bell,
  Search,
  Moon,
  Sun,
  ChevronDown,
  User,
  BarChart3,
  Clock,
  TrendingUp
} from 'lucide-react';

export function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="h-4 w-4" />, href: '/', badge: null },
    { id: 'puantaj', label: 'Puantaj', icon: <Calendar className="h-4 w-4" />, href: '/puantaj', badge: '3' },
    { id: 'personel', label: 'Personel', icon: <Users className="h-4 w-4" />, href: '/personel', badge: null },
    { id: 'finans', label: 'Finans', icon: <DollarSign className="h-4 w-4" />, href: '/finans', badge: '5' },
    { id: 'raporlar', label: 'Raporlar', icon: <BarChart3 className="h-4 w-4" />, href: '/raporlar', badge: '2' },
    { id: 'mesai', label: 'Mesai', icon: <Clock className="h-4 w-4" />, href: '/mesai', badge: null },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'dark:bg-gray-900/95 bg-white/95 backdrop-blur-xl border-b border-gray-800 shadow-2xl' 
        : 'dark:bg-gray-900 bg-white border-b border-gray-800'
    }`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 lg:space-x-6">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-800 lg:hidden"
            >
              <div className="w-5 h-0.5 bg-gray-300 mb-1"></div>
              <div className="w-5 h-0.5 bg-gray-300 mb-1"></div>
              <div className="w-5 h-0.5 bg-gray-300"></div>
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform">
                  <span className="text-white font-bold text-lg lg:text-xl">PY</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </div>
              <div className="ml-3 lg:ml-4">
                <div className="text-xl lg:text-2xl font-bold gradient-text">
                  Puantaj Yönetici
                </div>
                <div className="text-xs text-gray-400 hidden sm:block">Premium İş Takip Platformu</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 ml-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group relative px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-all"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-300 group-hover:text-white">{item.icon}</span>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Ara..."
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-xl w-48 lg:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl hover:bg-gray-800 transition-colors"
              title={darkMode ? "Açık Tema" : "Koyu Tema"}
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-400" />
              )}
            </button>

            {/* Notifications */}
            <button className="relative p-2.5 rounded-xl hover:bg-gray-800 transition-colors">
              <Bell className="h-5 w-5 text-gray-300" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-800 transition-colors"
              >
                <div className="relative">
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-sm font-semibold text-white">Ahmet Yılmaz</div>
                  <div className="text-xs text-gray-400">Super Admin</div>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <div className="font-semibold text-white">Ahmet Yılmaz</div>
                    <div className="text-sm text-gray-400">ahmet@puantajyonetici.com</div>
                  </div>
                  <div className="py-2">
                    <button className="flex items-center w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700">
                      <User className="h-4 w-4 mr-3" />
                      Profilim
                    </button>
                    <button className="flex items-center w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700">
                      <Settings className="h-4 w-4 mr-3" />
                      Ayarlar
                    </button>
                    <div className="border-t border-gray-700 my-2"></div>
                    <button className="flex items-center w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-900/20">
                      <span className="mr-3">🚪</span>
                      Çıkış Yap
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gray-800 rounded-xl mt-2 p-4 border border-gray-700">
            <div className="grid grid-cols-3 gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-gray-300 mb-1">{item.icon}</span>
                  <span className="text-xs text-gray-300">{item.label}</span>
                  {item.badge && (
                    <span className="absolute top-2 right-2 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
