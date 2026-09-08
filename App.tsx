import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import BlogEditor from './components/BlogEditor';
import HomeBlogPreview from './components/HomeBlogPreview';
import { CONTENT } from './constants';
import { BLOG_POSTS } from './blogData';
import { Language, BlogPost } from './types';
import { trackPageView, trackEvent } from './analytics';
import { CheckCircle2, X } from 'lucide-react';

type ViewState = 'home' | 'blog-list' | 'blog-detail' | 'blog-editor';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('tr');
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize posts from localStorage or default blogData
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('grecoturk_blog_posts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge missing default posts (like newly added articles) while preserving custom ones
          const missingDefaults = BLOG_POSTS.filter(dp => !parsed.some((p: BlogPost) => p.id === dp.id));
          if (missingDefaults.length > 0) {
            return [...missingDefaults, ...parsed];
          }
          return parsed;
        }
      }
    } catch (err) {
      console.error('Failed to load posts from storage', err);
    }
    return BLOG_POSTS;
  });

  // Check if user has custom posts or modified list
  const hasCustomPosts = posts.some(p => p.isCustom) || posts.length !== BLOG_POSTS.length;

  // Persist posts to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('grecoturk_blog_posts', JSON.stringify(posts));
    } catch (err) {
      console.error('Failed to save posts to storage', err);
    }
  }, [posts]);

  // Show temporary toast message
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

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
    } else if (currentView === 'blog-editor') {
      path = '/blog/editor';
      title = editingPost ? 'Edit Blog Post | GrecoTurk' : 'Write Blog Post | GrecoTurk';
    }

    trackPageView(path, title);
  }, [currentView, selectedPost, editingPost]);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentView('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlog = () => {
    setCurrentView('blog-list');
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWritePost = () => {
    setEditingPost(null);
    setCurrentView('blog-editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('start_write_blog_post', {});
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setCurrentView('blog-editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('start_edit_blog_post', { postId: post.id });
  };

  const handleSavePost = (savedPost: BlogPost) => {
    setPosts(prevPosts => {
      const existingIndex = prevPosts.findIndex(p => p.id === savedPost.id);
      if (existingIndex >= 0) {
        const updated = [...prevPosts];
        updated[existingIndex] = savedPost;
        return updated;
      } else {
        return [savedPost, ...prevPosts];
      }
    });

    setSelectedPost(savedPost);
    setEditingPost(null);
    setCurrentView('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    showToast(
      language === 'tr' 
        ? 'Blog yazınız başarıyla yayınlandı ve yayına alındı!' 
        : 'Your blog post has been successfully published!'
    );
    trackEvent('publish_blog_post', { postId: savedPost.id, title: savedPost.title });
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
    
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(null);
      setCurrentView('blog-list');
    }

    showToast(
      language === 'tr' 
        ? 'Blog yazısı listeden kaldırıldı.' 
        : 'The blog post has been removed.'
    );
    trackEvent('delete_blog_post', { postId });
  };

  const handleResetDefaults = () => {
    if (window.confirm(
      language === 'tr' 
        ? 'Tüm blog yazılarını varsayılan orijinal haline döndürmek istediğinize emin misiniz?' 
        : 'Are you sure you want to reset all blog posts to default?'
    )) {
      setPosts(BLOG_POSTS);
      try {
        localStorage.removeItem('grecoturk_blog_posts');
      } catch (e) {
        console.error(e);
      }
      showToast(
        language === 'tr' 
          ? 'Varsayılan blog yazıları başarıyla geri yüklendi.' 
          : 'Default blog posts have been restored.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Navbar 
        language={language} 
        setLanguage={setLanguage} 
        content={content.nav}
        currentView={currentView}
        setCurrentView={setCurrentView}
        onWritePost={handleWritePost}
      />
      
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero content={content.hero} />
            <Services content={content.services} />
            <WhyUs content={content.whyUs} />
            <HomeBlogPreview
              posts={posts}
              content={content.blog}
              onPostClick={handlePostClick}
              onViewAll={() => {
                setCurrentView('blog-list');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onWritePost={handleWritePost}
            />
            <Contact content={content.contact} />
          </>
        )}

        {currentView === 'blog-list' && (
          <BlogList 
            posts={posts} 
            content={content.blog}
            onPostClick={handlePostClick}
            onWritePost={handleWritePost}
            onEditPost={handleEditPost}
            onDeletePost={handleDeletePost}
            onResetDefaults={handleResetDefaults}
            hasCustomPosts={hasCustomPosts}
          />
        )}

        {currentView === 'blog-detail' && selectedPost && (
          <BlogDetail 
            post={selectedPost} 
            content={content.blog} 
            onBack={handleBackToBlog}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
          />
        )}

        {currentView === 'blog-editor' && (
          <BlogEditor 
            postToEdit={editingPost}
            language={language}
            onSave={handleSavePost}
            onCancel={() => {
              if (selectedPost) {
                setCurrentView('blog-detail');
              } else {
                setCurrentView('blog-list');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-greek-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-greek-700 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-sm font-medium pr-2">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="p-1 text-gray-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <Footer content={content.footer} />
    </div>
  );
};

export default App;
