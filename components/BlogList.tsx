import React, { useState } from 'react';
import { BlogPost, Content } from '../types';
import { Search, Clock, ArrowRight, PenSquare, Edit2, Trash2, Sparkles, RotateCcw } from 'lucide-react';
import { trackBlogPostView } from '../analytics';

interface BlogListProps {
  posts: BlogPost[];
  content: Content['blog'];
  onPostClick: (post: BlogPost) => void;
  onWritePost?: () => void;
  onEditPost?: (post: BlogPost) => void;
  onDeletePost?: (postId: string) => void;
  onResetDefaults?: () => void;
  hasCustomPosts?: boolean;
}

const BlogList: React.FC<BlogListProps> = ({ 
  posts, 
  content, 
  onPostClick,
  onWritePost,
  onEditPost,
  onDeletePost,
  onResetDefaults,
  hasCustomPosts
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];

  const handlePostInteraction = (post: BlogPost) => {
    trackBlogPostView(post.title, post.category);
    onPostClick(post);
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Write Post Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-greek-100 text-greek-800 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-greek-600" />
              <span>Hukuki Bilgi Bankası & Güncel Rehberler</span>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{content.title}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mt-2">{content.subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onResetDefaults && hasCustomPosts && (
              <button
                type="button"
                onClick={onResetDefaults}
                className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors shadow-sm"
                title="Varsayılan yazıları geri yükle"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Varsayılanları Yükle</span>
              </button>
            )}

            {onWritePost && (
              <button
                type="button"
                onClick={onWritePost}
                className="flex items-center gap-2 px-5 py-3 bg-greek-600 hover:bg-greek-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg shadow-greek-600/20 transition-all cursor-pointer"
              >
                <PenSquare className="w-4 h-4" />
                <span>{content.writePost || 'Yeni Blog Yazısı Yaz'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-greek-500 focus:border-greek-500 sm:text-sm shadow-sm transition-all"
              placeholder={content.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 overflow-x-auto max-w-full pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-greek-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat === 'All' ? content.categories.all : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div 
              key={post.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-gray-100 cursor-pointer relative"
              onClick={() => handlePostInteraction(post)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-greek-800 uppercase tracking-wide shadow-sm">
                  {post.category}
                </div>

                {post.isCustom && (
                  <div className="absolute top-4 right-4 bg-greek-600 text-white px-2.5 py-0.5 rounded-full text-[11px] font-semibold shadow">
                    Yeni Eklenen
                  </div>
                )}
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-gray-500 mb-3 gap-4">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                  <span>{post.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-greek-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed flex-1">
                  {post.summary}
                </p>
                
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                  <span className="flex items-center text-greek-600 text-sm font-semibold group-hover:text-greek-800 transition-colors">
                    {content.readMore}
                    <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>

                  {/* Actions for editing/deleting */}
                  {(onEditPost || onDeletePost) && (
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                      {onEditPost && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditPost(post);
                          }}
                          className="p-1.5 text-gray-400 hover:text-greek-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Yazıyı Düzenle"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                      {onDeletePost && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm('Bu blog yazısını silmek istediğinize emin misiniz?')) {
                              onDeletePost(post.id);
                            }
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Yazıyı Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 p-8 max-w-lg mx-auto shadow-sm">
            <PenSquare className="w-12 h-12 text-greek-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Aradığınız kriterlere uygun yazı bulunamadı</h3>
            <p className="text-sm text-gray-500 mb-6">
              Arama filtrenizi temizleyebilir veya hemen yeni bir blog yazısı oluşturabilirsiniz.
            </p>
            {onWritePost && (
              <button
                type="button"
                onClick={onWritePost}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-greek-600 hover:bg-greek-700 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                <PenSquare className="w-4 h-4" />
                {content.writePost || 'Yeni Blog Yazısı Yaz'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;