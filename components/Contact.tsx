import React, { useState } from 'react';
import { Content } from '../types';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { trackEvent } from '../analytics';

interface ContactProps {
  content: Content['contact'];
}

const Contact: React.FC<ContactProps> = ({ content }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Formspree Form ID güncellendi
  const FORMSPREE_ID = "f/xpqdggjl"; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Formspree'ye gerçek istek atıyoruz
      const response = await fetch(`https://formspree.io/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      });

      if (response.ok) {
        setSubmitted(true);
        
        // Track the successful submission
        trackEvent('contact_form_submit', {
           form_subject: formState.subject
        });

        setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        // Hata durumu
        const data = await response.json();
        // Fix: Object.hasOwn requires ES2022 lib, use Object.prototype.hasOwnProperty.call for compatibility
        if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
          setErrorMessage(data["errors"].map((error: any) => error["message"]).join(", "));
        } else {
          setErrorMessage("Bir hata oluştu, lütfen tekrar deneyin.");
        }
      }
    } catch (error) {
      setErrorMessage("Sunucuya bağlanılamadı. Lütfen internetinizi kontrol edin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-greek-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
             {/* Abstract circles */}
             <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-greek-800 opacity-50"></div>
             <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-greek-600 opacity-30"></div>

             <div className="relative z-10 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-greek-100" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Address</h3>
                    <p className="text-greek-100 font-light">{content.info.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-greek-100" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-greek-100 font-light">{content.info.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-greek-100" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                    <p className="text-greek-100 font-light">{content.info.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-greek-100" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">WhatsApp / Mesaj</h3>
                    <p className="text-greek-100 font-light">{content.info.whatsapp}</p>
                  </div>
                </div>
             </div>

             <div className="mt-12 relative z-10">
                <div className="w-full h-48 bg-gray-300 rounded-xl overflow-hidden opacity-80 mix-blend-luminosity">
                   {/* Placeholder for map */}
                   <img src="https://picsum.photos/seed/map/600/400" className="w-full h-full object-cover" alt="Map Location" />
                </div>
             </div>
          </div>

          {/* Form */}
          <div className="bg-white p-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{content.form.name}</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-greek-500 focus:border-greek-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{content.form.phone}</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-greek-500 focus:border-greek-500 outline-none transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{content.form.email}</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-greek-500 focus:border-greek-500 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">{content.form.subject}</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  value={formState.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-greek-500 focus:border-greek-500 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{content.form.message}</label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-greek-500 focus:border-greek-500 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-greek-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-greek-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-greek-500 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    {submitted ? 'Sent!' : content.form.submit}
                    {!submitted && <Send className="w-5 h-5" />}
                  </>
                )}
              </button>
              
              {errorMessage && (
                <p className="text-red-600 text-center font-medium bg-red-50 p-2 rounded">
                  {errorMessage}
                </p>
              )}
              
              {submitted && (
                 <p className="text-green-600 text-center font-medium animate-pulse">
                   Mesajınız başarıyla gönderildi! / Message sent successfully!
                 </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;