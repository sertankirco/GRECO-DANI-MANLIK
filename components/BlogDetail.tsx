import React, { useEffect } from 'react';
import { BlogPost, Content } from '../types';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';

interface BlogDetailProps {
  post: BlogPost;
  content: Content['blog'];
  onBack: () => void;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post, content, onBack }) => {
  
  // Scroll to top when mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <article className="bg-white min-h-screen pt-24 pb-20">
      {/* Hero Image */}
      <div className="w-full h-[40vh] md:h-[50vh] relative mb-10 md:mb-16">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-8">
           <div className="max-w-4xl mx-auto text-white">
              <button 
                onClick={onBack}
                className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-md"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {content.backToBlog}
              </button>
              
              <div className="flex items-center gap-3 text-sm md:text-base font-medium text-greek-100 mb-4">
                 <span className="bg-greek-600 px-3 py-1 rounded-full">{post.category}</span>
                 <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg">
                {post.title}
              </h1>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-gray-200 text-sm md:text-base">
                 <div className="flex items-center gap-2">
                    <div className="bg-white/10 p-2 rounded-full">
                       <User className="w-4 h-4" />
                    </div>
                    {post.author}
                 </div>
                 <div className="hidden md:block w-1 h-1 bg-gray-400 rounded-full"></div>
                 <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg md:prose-xl prose-greek mx-auto text-gray-700">
           {/* Rendering HTML content safely */}
           <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Footer of Article */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-greek-600 transition-colors">
                <Share2 className="w-5 h-5" />
                Share
              </button>
           </div>
           
           <button 
             onClick={onBack}
             className="text-greek-600 font-semibold hover:underline"
           >
             {content.backToBlog}
           </button>
        </div>
      </div>

      <style>{`
        .prose h3 { color: #0c4a6e; margin-top: 2rem; margin-bottom: 1rem; }
        .prose ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .prose li { margin-bottom: 0.5rem; }
        .prose strong { color: #0284c7; }
        .prose p { line-height: 1.8; margin-bottom: 1.5rem; }
      `}</style>
    </article>
  );
};

export default BlogDetail;