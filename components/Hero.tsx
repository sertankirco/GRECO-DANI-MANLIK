import React from 'react';
import { Content } from '../types';
import { ArrowRight } from 'lucide-react';
import { trackButtonClick } from '../analytics';

interface HeroProps {
  content: Content['hero'];
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string, buttonName: string) => {
    e.preventDefault();
    
    trackButtonClick(buttonName, href);

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
    }
  };

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/1920/1080?grayscale&blur=2"
          alt="Santorini Greece"
          className="w-full h-full object-cover"
        />
        {/* Blue Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-greek-900/90 to-greek-800/70 mix-blend-multiply"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
          {content.title}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-greek-50 mb-10 font-light leading-relaxed">
          {content.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact', 'Hero Primary CTA')}
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-greek-900 bg-white hover:bg-greek-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
          >
            {content.ctaPrimary}
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          <a
            href="#services"
            onClick={(e) => handleScroll(e, '#services', 'Hero Secondary CTA')}
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-full text-white hover:bg-white hover:text-greek-900 transition-all backdrop-blur-sm cursor-pointer"
          >
            {content.ctaSecondary}
          </a>
        </div>
      </div>
      
      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;