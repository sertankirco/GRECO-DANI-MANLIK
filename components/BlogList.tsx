import React, { useState } from 'react';
import { BlogPost, Content } from '../types';
import { Search, Clock, ArrowRight, User } from 'lucide-react';
import { trackBlogPostView } from '../analytics';

interface BlogListProps {
  posts: BlogPost[];
  content: Content['blog'];
  onPostClick: (post: BlogPost) => void;
}

const BlogList: React.FC<BlogListProps> = ({ posts, content, onPostClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchTerm.toLowerCase());
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
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{content.subtitle}</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-greek-500 focus:border-greek-500 sm:text-sm shadow-sm transition-all"
              placeholder={content.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-gray-100 cursor-pointer"
              onClick={() => handlePostInteraction(post)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-greek-800 uppercase tracking-wide">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-sm text-gray-500 mb-3 gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                  <span>{post.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-greek-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                  {post.summary}
                </p>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); handlePostInteraction(post); }}
                  className="flex items-center text-greek-600 font-semibold hover:text-greek-800 transition-colors mt-auto"
                >
                  {content.readMore}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
             No posts found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;