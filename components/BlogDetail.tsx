import React, { useEffect, useState } from 'react';
import { BlogPost, Content } from '../types';
import { ArrowLeft, Calendar, Clock, User, Share2, Edit2, Trash2, Check, Bookmark } from 'lucide-react';

interface BlogDetailProps {
  post: BlogPost;
  content: Content['blog'];
  onBack: () => void;
  onEdit?: (post: BlogPost) => void;
  onDelete?: (postId: string) => void;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post, content, onBack, onEdit, onDelete }) => {
  const [copied, setCopied] = useState(false);
  
  // Scroll to top when mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <article className="bg-white min-h-screen pt-24 pb-20">
      {/* Hero Image */}
      <div className="w-full h-[45vh] md:h-[55vh] relative mb-10 md:mb-16">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-8">
           <div className="max-w-4xl mx-auto text-white">
              <div className="flex items-center justify-between gap-4 mb-6">
                <button 
                  onClick={onBack}
                  className="inline-flex items-center text-white/90 hover:text-white transition-colors bg-black/30 hover:bg-black/50 px-4 py-2 rounded-full backdrop-blur-md text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {content.backToBlog}
                </button>

                {(onEdit || onDelete) && (
                  <div className="flex items-center gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(post)}
                        className="inline-flex items-center text-white bg-greek-600/80 hover:bg-greek-600 px-3.5 py-1.5 rounded-full backdrop-blur-md text-xs font-semibold transition-colors shadow-sm"
                      >
                        <Edit2 className="w-3.5 h-3.5 mr-1.5" />
                        {content.editPost || 'Yazıyı Düzenle'}
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => {
                          if (window.confirm('Bu blog yazısını silmek istediğinize emin misiniz?')) {
                            onDelete(post.id);
                          }
                        }}
                        className="inline-flex items-center text-white bg-red-600/80 hover:bg-red-600 px-3 py-1.5 rounded-full backdrop-blur-md text-xs font-semibold transition-colors shadow-sm"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" />
                        {content.deletePost || 'Sil'}
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3 text-sm md:text-base font-medium text-greek-100 mb-4 flex-wrap">
                 <span className="bg-greek-600 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{post.category}</span>
                 <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
                 {post.isCustom && (
                   <span className="bg-emerald-600/90 text-white text-xs px-2.5 py-0.5 rounded-full font-medium">
                     Kullanıcı Tarafından Yazıldı
                   </span>
                 )}
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-md">
                {post.title}
              </h1>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-gray-200 text-sm md:text-base">
                 <div className="flex items-center gap-2">
                    <div className="bg-white/10 p-2 rounded-full">
                       <User className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{post.author}</span>
                 </div>
                 <div className="hidden md:block w-1 h-1 bg-gray-400 rounded-full"></div>
                 <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Summary Highlight Box */}
      {post.summary && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="p-6 bg-greek-50/70 border-l-4 border-greek-600 rounded-r-2xl text-greek-950 font-medium text-lg leading-relaxed shadow-sm">
            {post.summary}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg md:prose-xl prose-greek mx-auto text-gray-700 leading-relaxed">
           {/* Rendering HTML content safely */}
           <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Footer of Article */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-3">
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:text-greek-600 hover:bg-gray-50 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600">Bağlantı Kopyalandı!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Yazıyı Paylaş</span>
                  </>
                )}
              </button>
           </div>
           
           <button 
             onClick={onBack}
             className="text-greek-600 font-semibold hover:underline flex items-center gap-1.5"
           >
             <ArrowLeft className="w-4 h-4" />
             {content.backToBlog}
           </button>
        </div>
      </div>

      <style>{`
        .prose h2 { color: #0c4a6e; font-weight: 700; font-size: 1.75rem; margin-top: 2rem; margin-bottom: 1rem; }
        .prose h3 { color: #0c4a6e; font-weight: 700; font-size: 1.4rem; margin-top: 2rem; margin-bottom: 1rem; }
        .prose ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .prose ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .prose li { margin-bottom: 0.5rem; }
        .prose strong { color: #075985; font-weight: 600; }
        .prose p { line-height: 1.8; margin-bottom: 1.5rem; }
      `}</style>
    </article>
  );
};

export default BlogDetail;