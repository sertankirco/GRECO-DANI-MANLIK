import React from 'react';
import { BlogPost, Content } from '../types';
import { Clock, ArrowRight, PenSquare, BookOpen, Sparkles } from 'lucide-react';

interface HomeBlogPreviewProps {
  posts: BlogPost[];
  content: Content['blog'];
  onPostClick: (post: BlogPost) => void;
  onViewAll: () => void;
  onWritePost: () => void;
}

export const HomeBlogPreview: React.FC<HomeBlogPreviewProps> = ({
  posts,
  content,
  onPostClick,
  onViewAll,
  onWritePost
}) => {
  // Show first 3 posts
  const recentPosts = posts.slice(0, 3);

  return (
    <section id="blog-preview" className="py-24 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-greek-100 text-greek-800 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-greek-600" />
              <span>Güncel Bilgiler & Hukuki Rehberler</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              {content.title}
            </h2>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl">
              Yunanistan'da yasal süreçler, Golden Visa ve gayrimenkul yatırımı hakkında güncel makalelerimizi inceleyin veya kendi yazınızı ekleyin.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onWritePost}
              className="flex items-center gap-2 px-4 py-2.5 bg-greek-600 hover:bg-greek-700 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg shadow-greek-600/20 transition-all cursor-pointer"
            >
              <PenSquare className="w-4 h-4" />
              <span>{content.writePost || 'Blog Yaz'}</span>
            </button>

            <button
              onClick={onViewAll}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl border border-gray-200 transition-colors shadow-sm cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-greek-600" />
              <span>Tüm Yazılar</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => onPostClick(post)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer"
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
                    Yeni
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-gray-500 mb-3 gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-greek-600 transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
                  {post.summary}
                </p>

                <div className="pt-4 border-t border-gray-100 flex items-center text-greek-600 text-sm font-semibold group-hover:text-greek-800 transition-colors mt-auto">
                  <span>{content.readMore}</span>
                  <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 bg-greek-50 border border-greek-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-greek-600 text-white flex items-center justify-center flex-shrink-0">
              <PenSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Siz de Yunanistan deneyiminizi veya yasal analizinizi paylaşın</h4>
              <p className="text-xs text-gray-600 mt-0.5">Editörümüzü kullanarak hazır şablonlarla dakikalar içinde yeni blog yazısı ekleyebilirsiniz.</p>
            </div>
          </div>
          <button
            onClick={onWritePost}
            className="w-full sm:w-auto px-5 py-2.5 bg-greek-900 hover:bg-greek-800 text-white text-xs font-semibold rounded-xl transition-colors flex-shrink-0 cursor-pointer"
          >
            Hemen Blog Yazısı Ekle
          </button>
        </div>

      </div>
    </section>
  );
};

export default HomeBlogPreview;
