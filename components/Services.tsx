import React from 'react';
import { Content } from '../types';
import { Icons } from '../constants';
import { trackServiceClick } from '../analytics';

interface ServicesProps {
  content: Content['services'];
}

const Services: React.FC<ServicesProps> = ({ content }) => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-greek-600 font-semibold tracking-wide uppercase">
            GrecoTurk
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {content.title}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((service, index) => {
            // Dynamically get icon component
            const IconComponent = (Icons as any)[service.iconName] || Icons.FileText;
            
            return (
              <div 
                key={service.id} 
                onClick={() => trackServiceClick(service.title)}
                className="relative group bg-slate-50 rounded-2xl p-8 hover:bg-white border border-slate-100 hover:border-greek-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-greek-50 rounded-full opacity-0 group-hover:opacity-50 transition-opacity blur-2xl"></div>
                
                <div className="w-12 h-12 inline-flex items-center justify-center rounded-xl bg-greek-100 text-greek-600 mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="mt-4 w-12 h-1 bg-greek-200 rounded-full group-hover:w-24 group-hover:bg-greek-500 transition-all"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;