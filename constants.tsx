import { Content, Language } from './types';
import { 
  Building2, 
  Globe2, 
  Home, 
  FileText, 
  Briefcase, 
  ShieldCheck, 
  Clock, 
  Users,
  Award
} from 'lucide-react';

export const CONTENT: Record<Language, Content> = {
  tr: {
    nav: {
      home: "Ana Sayfa",
      services: "Hizmetler",
      about: "Neden Biz?",
      contact: "İletişim",
      blog: "Blog",
      cta: "Danışmanlık Alın",
    },
    hero: {
      title: "Yunanistan'da Yasal Hizmetler - Türk Vatandaşları İçin Çözümler",
      subtitle: "Golden Visa, şirket kurulumu ve hukuki danışmanlık süreçlerinde yanınızdayız. Uzman ekibimizle sınırları kaldırın.",
      ctaPrimary: "Hemen Başvurun",
      ctaSecondary: "Hizmetlerimiz",
    },
    services: {
      title: "Hizmet Alanlarımız",
      subtitle: "Yunanistan'daki tüm yasal süreçlerinizde profesyonel destek sunuyoruz.",
      items: [
        {
          id: "residency",
          title: "Oturum İzni & Vize",
          description: "Golden Visa programı, çalışma izinleri ve oturum kartı başvurularında uçtan uca danışmanlık.",
          iconName: "Globe2"
        },
        {
          id: "company",
          title: "Şirket Kurulumu",
          description: "Yunanistan'da iş kurmak isteyenler için şirket tescili, vergi kaydı ve bürokratik işlemler.",
          iconName: "Building2"
        },
        {
          id: "realestate",
          title: "Gayrimenkul İşlemleri",
          description: "Satın alma, kiralama ve tapu devir süreçlerinde hukuki denetim ve sözleşme hazırlığı.",
          iconName: "Home"
        },
        {
          id: "tax",
          title: "Vergi Danışmanlığı",
          description: "Çifte vergilendirmeyi önleme anlaşmaları ve yerel vergi mevzuatı konusunda uzman görüşü.",
          iconName: "FileText"
        },
        {
          id: "retirement",
          title: "Emeklilik & Sosyal Güvenlik",
          description: "Yunanistan'da emeklilik hakları ve sosyal güvenlik sistemi entegrasyonu.",
          iconName: "ShieldCheck"
        }
      ]
    },
    whyUs: {
      title: "Neden Bizi Seçmelisiniz?",
      subtitle: "Yılların deneyimi ve iki ülke arasındaki köklü ilişkilerimizle fark yaratıyoruz.",
      features: [
        {
          title: "Uzman Kadro",
          description: "Hem Türk hem Yunan hukukuna hakim, çift dilli avukat ve danışmanlar."
        },
        {
          title: "Hızlı Sonuç",
          description: "Bürokratik engelleri en aza indirerek süreçlerinizi hızlandırıyoruz."
        },
        {
          title: "Şeffaf Süreç",
          description: "Her adımda bilgilendirme ve sürpriz maliyetler olmadan net fiyatlandırma."
        }
      ]
    },
    contact: {
      title: "İletişime Geçin",
      subtitle: "Sorularınız için aşağıdaki formu doldurabilir veya bize doğrudan ulaşabilirsiniz.",
      form: {
        name: "Adınız Soyadınız",
        email: "E-posta Adresiniz",
        phone: "Telefon Numaranız",
        subject: "Konu",
        message: "Mesajınız",
        submit: "Gönder",
      },
      info: {
        address: "Leoforos Kifisias 24, Atina, Yunanistan",
        email: "info@grecoturk.law",
        phone: "+30 210 123 4567",
        whatsapp: "+90 555 500 07 00"
      }
    },
    blog: {
      title: "GrecoTurk Blog",
      subtitle: "Yunanistan'da yatırım, yaşam ve hukuk hakkında güncel bilgiler ve uzman rehberleri.",
      searchPlaceholder: "Yazılarda ara...",
      readMore: "Devamını Oku",
      backToBlog: "Blog Listesine Dön",
      backToHome: "Ana Sayfaya Dön",
      categories: {
        all: "Tümü",
        investment: "Yatırım",
        process: "Prosedür",
        lifestyle: "Yaşam"
      }
    },
    footer: {
      rights: "Tüm hakları saklıdır.",
      description: "Türkiye ve Yunanistan arasındaki hukuki köprünüz."
    }
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "Why Us?",
      contact: "Contact",
      blog: "Blog",
      cta: "Get Consultation",
    },
    hero: {
      title: "Legal Services in Greece - Solutions for Turkish Citizens",
      subtitle: "We are by your side for Golden Visa, company formation, and legal consultancy. Remove borders with our expert team.",
      ctaPrimary: "Apply Now",
      ctaSecondary: "Our Services",
    },
    services: {
      title: "Our Practice Areas",
      subtitle: "Professional support for all your legal processes in Greece.",
      items: [
        {
          id: "residency",
          title: "Residency & Visa",
          description: "End-to-end consultancy for Golden Visa programs, work permits, and residency card applications.",
          iconName: "Globe2"
        },
        {
          id: "company",
          title: "Company Formation",
          description: "Company registration, tax registration, and bureaucratic procedures for setting up business in Greece.",
          iconName: "Building2"
        },
        {
          id: "realestate",
          title: "Real Estate",
          description: "Legal auditing and contract preparation for purchasing, leasing, and title deed transfer processes.",
          iconName: "Home"
        },
        {
          id: "tax",
          title: "Tax Consultancy",
          description: "Expert opinion on double taxation prevention treaties and local tax legislation.",
          iconName: "FileText"
        },
        {
          id: "retirement",
          title: "Retirement & Social Security",
          description: "Integration into the Greek social security system and retirement rights.",
          iconName: "ShieldCheck"
        }
      ]
    },
    whyUs: {
      title: "Why Choose Us?",
      subtitle: "We make a difference with years of experience and deep-rooted relations between the two countries.",
      features: [
        {
          title: "Expert Team",
          description: "Bilingual lawyers and consultants versed in both Turkish and Greek law."
        },
        {
          title: "Fast Results",
          description: "We accelerate your processes by minimizing bureaucratic obstacles."
        },
        {
          title: "Transparent Process",
          description: "Information at every step and clear pricing without surprise costs."
        }
      ]
    },
    contact: {
      title: "Contact Us",
      subtitle: "Fill out the form below or contact us directly for your inquiries.",
      form: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        subject: "Subject",
        message: "Message",
        submit: "Send Message",
      },
      info: {
        address: "Leoforos Kifisias 24, Athens, Greece",
        email: "info@grecoturk.law",
        phone: "+30 210 123 4567",
        whatsapp: "+90 555 500 07 00"
      }
    },
    blog: {
      title: "GrecoTurk Blog",
      subtitle: "Latest information and expert guides on investment, life, and law in Greece.",
      searchPlaceholder: "Search posts...",
      readMore: "Read More",
      backToBlog: "Back to Blog",
      backToHome: "Back to Home",
      categories: {
        all: "All",
        investment: "Investment",
        process: "Process",
        lifestyle: "Lifestyle"
      }
    },
    footer: {
      rights: "All rights reserved.",
      description: "Your legal bridge between Turkey and Greece."
    }
  }
};

export const Icons = {
  Building2,
  Globe2,
  Home,
  FileText,
  Briefcase,
  ShieldCheck,
  Clock,
  Users,
  Award
};