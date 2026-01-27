export type Language = 'tr' | 'en';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string; // HTML string for rich text
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
}

export interface Content {
  nav: {
    home: string;
    services: string;
    about: string;
    contact: string;
    blog: string;
    cta: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: ServiceItem[];
  };
  whyUs: {
    title: string;
    subtitle: string;
    features: {
      title: string;
      description: string;
    }[];
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
      submit: string;
    };
    info: {
      address: string;
      email: string;
      phone: string;
    };
  };
  blog: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    readMore: string;
    backToBlog: string;
    backToHome: string;
    categories: {
      all: string;
      investment: string;
      process: string;
      lifestyle: string;
    }
  };
  footer: {
    rights: string;
    description: string;
  };
}