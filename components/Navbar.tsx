import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Language, Content } from '../types';
import { trackLinkClick, trackEvent } from '../analytics';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  content: Content['nav'];
  currentView: 'home' | 'blog-list' | 'blog-detail';
  setCurrentView: (view: 'home' | 'blog-list' | 'blog-detail') => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  language, 
  setLanguage, 
  content,
  currentView,
  setCurrentView
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    
    trackLinkClick(label, href);
    setIsOpen(false);
    
    if (href === '/blog') {
      setCurrentView('blog-list');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (href === '#home' && currentView !== 'home') {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        scrollToSection(href);
      }, 100);
    } else {
      scrollToSection(href);
    }
  };

  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    } else if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const changeLanguage = () => {
    const newLang = language === 'tr' ? 'en' : 'tr';
    trackEvent('language_change', { language: newLang });
    setLanguage(newLang);
  };

  const navLinks = [
    { href: "#home", label: content.home },
    { href: "#services", label: content.services },
    { href: "#why-us", label: content.about },
    { href: "/blog", label: content.blog },
    { href: "#contact", label: content.contact },
  ];

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-md z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={(e) => handleNavigation(e as any, '#home', 'Logo')}>
            <div className="w-8 h-8 bg-greek-900 rounded-tr-xl rounded-bl-xl"></div>
            <span className="text-2xl font-bold text-greek-900 tracking-tight">GrecoTurk</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href, link.label)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    (link.href === '/blog' && currentView.includes('blog')) 
                      ? 'text-greek-600 bg-greek-50' 
                      : 'text-gray-700 hover:text-greek-600'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Section (Lang + CTA) */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={changeLanguage}
              className="flex items-center gap-1 text-gray-600 hover:text-greek-600 font-medium cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>{language.toUpperCase()}</span>
            </button>
            <a 
              href="#contact" 
              onClick={(e) => handleNavigation(e, '#contact', 'Navbar CTA')}
              className="bg-greek-600 hover:bg-greek-700 text-white px-5 py-2 rounded-full font-medium transition-colors shadow-lg shadow-greek-600/20 cursor-pointer"
            >
              {content.cta}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-greek-600 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavigation(e, link.href, link.label)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                   (link.href === '/blog' && currentView.includes('blog'))
                   ? 'text-greek-600 bg-greek-50'
                   : 'text-gray-700 hover:text-greek-600'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between px-3 mt-4">
              <button
                onClick={changeLanguage}
                className="flex items-center gap-2 text-gray-600 font-medium py-2"
              >
                <Globe className="w-5 h-5" />
                <span>{language === 'tr' ? 'English' : 'Türkçe'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;