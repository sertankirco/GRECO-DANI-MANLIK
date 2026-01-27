import React from 'react';
import { Content } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface WhyUsProps {
  content: Content['whyUs'];
}

const WhyUs: React.FC<WhyUsProps> = ({ content }) => {
  return (
    <section id="why-us" className="py-20 bg-greek-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          
          <div className="mb-12 lg:mb-0">
             <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
              {content.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {content.subtitle}
            </p>
            
            <div className="space-y-6">
              {content.features.map((feature, idx) => (
                <div key={idx} className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-greek-600 text-white">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">{feature.title}</h4>
                    <p className="mt-1 text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-greek-600 rounded-3xl transform rotate-3 opacity-10"></div>
             <img 
               src="https://picsum.photos/800/600" 
               alt="Legal Team Meeting" 
               className="relative rounded-3xl shadow-2xl w-full object-cover"
             />
             <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-xs hidden md:block">
               <div className="flex items-center gap-4">
                  <div className="text-greek-600 font-bold text-4xl">10+</div>
                  <div className="text-sm text-gray-600 leading-tight font-medium">
                    Yıllık Deneyim<br/>Years Experience
                  </div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyUs;