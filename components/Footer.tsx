import React from 'react';
import { Content } from '../types';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { trackLinkClick } from '../analytics';

interface FooterProps {
  content: Content['footer'];
}

const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-800 pb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-greek-500 rounded-tr-lg rounded-bl-lg"></div>
              <span className="text-xl font-bold tracking-tight">GrecoTurk</span>
            </div>
            <p className="text-gray-400 max-w-sm">
              {content.description}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" onClick={(e) => { e.preventDefault(); trackLinkClick('Privacy Policy', '#'); }} className="hover:text-greek-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); trackLinkClick('Terms of Service', '#'); }} className="hover:text-greek-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); trackLinkClick('Cookie Policy', '#'); }} className="hover:text-greek-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          <div>
             <h4 className="text-lg font-semibold mb-4 text-gray-200">Follow Us</h4>
             <div className="flex space-x-4">
               <a href="#" onClick={(e) => { e.preventDefault(); trackLinkClick('Facebook', '#'); }} className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-6 h-6" /></a>
               <a href="#" onClick={(e) => { e.preventDefault(); trackLinkClick('Twitter', '#'); }} className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-6 h-6" /></a>
               <a href="#" onClick={(e) => { e.preventDefault(); trackLinkClick('Linkedin', '#'); }} className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-6 h-6" /></a>
               <a href="#" onClick={(e) => { e.preventDefault(); trackLinkClick('Instagram', '#'); }} className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-6 h-6" /></a>
             </div>
          </div>
        </div>
        
        <div className="pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} GrecoTurk. {content.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;