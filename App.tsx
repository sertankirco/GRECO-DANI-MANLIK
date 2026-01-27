import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import { CONTENT } from './constants';
import { BLOG_POSTS } from './blogData';
import { Language, BlogPost } from './types';
import { trackPageView, trackEvent } from './analytics';

type ViewState = 'home' | 'blog-list' | 'blog-detail';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('tr');
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const content = CONTENT[language];

  // Track Page Views
  useEffect(() => {
    let path = '/';
    let title = 'Home | GrecoTurk';

    if (currentView === 'blog-list') {
      path = '/blog';
      title = 'Blog | GrecoTurk';
    } else if (currentView === 'blog-detail' && selectedPost) {
      path = `/blog/${selectedPost.id}`;
      title = `${selectedPost.title} | GrecoTurk Blog`;
    }

    trackPageView(path, title);
  }, [currentView, selectedPost]);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentView('blog-detail');
  };

  const handleBackToBlog = () => {
    setCurrentView('blog-list');
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        language={language} 
        setLanguage={setLanguage} 
        content={content.nav}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      
      <main>
        {currentView === 'home' && (
          <>
            <Hero content={content.hero} />
            <Services content={content.services} />
            <WhyUs content={content.whyUs} />
            <Contact content={content.contact} />
          </>
        )}

        {currentView === 'blog-list' && (
          <BlogList 
            posts={BLOG_POSTS} 
            content={content.blog}
            onPostClick={handlePostClick}
          />
        )}

        {currentView === 'blog-detail' && selectedPost && (
          <BlogDetail 
            post={selectedPost} 
            content={content.blog} 
            onBack={handleBackToBlog}
          />
        )}
      </main>

      <Footer content={content.footer} />
    </div>
  );
};

export default App;