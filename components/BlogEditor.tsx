import React, { useState, useEffect } from 'react';
import { BlogPost, Language } from '../types';
import { 
  PenSquare, 
  Eye, 
  Save, 
  X, 
  Heading2, 
  Heading3, 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  AlertCircle, 
  Image as ImageIcon, 
  Sparkles, 
  Clock, 
  User, 
  ArrowLeft,
  Check,
  FileText
} from 'lucide-react';

interface BlogEditorProps {
  postToEdit?: BlogPost | null;
  language: Language;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

const PRESET_IMAGES = [
  {
    label: 'Atina & Tarih',
    url: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=1000'
  },
  {
    label: 'Hukuk & Evraklar',
    url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000'
  },
  {
    label: 'Ege & Adalar',
    url: 'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&q=80&w=1000'
  },
  {
    label: 'Aile & Yaşam',
    url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1000'
  },
  {
    label: 'Atina Yaşamı',
    url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1000'
  },
  {
    label: 'İş & Yatırım',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000'
  }
];

const PRESET_TEMPLATES = [
  {
    id: 'golden-visa-update',
    name: 'Golden Visa & Mevzuat Güncellemesi',
    description: 'Yatırım limitleri, yasa değişiklikleri ve pratik hukuki uyarılar',
    data: {
      title: "Yunanistan Golden Visa 2025: Yeni Bölgeler ve Yatırım Şartları Rehberi",
      category: "Yatırım",
      summary: "Yunanistan'ın güncellenen Golden Visa mevzuatı kapsamında değişen minimum yatırım tutarları ve Türk yatırımcılar için stratejik tavsiyeler.",
      imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=1000",
      content: `<p class="mb-4">Yunanistan parlamentosunun kabul ettiği son yasal düzenlemelerle birlikte, Golden Visa programında coğrafi bölgelere göre kademeli bir yatırım sistemi yürürlüğe girmiştir. Türk vatandaşları için hem coğrafi yakınlık hem de yaşam kalitesi açısından cazibesini koruyan bu programda dikkat edilmesi gereken en kritik noktaları derledik.</p>

<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Yeni Yatırım Limitleri ve Bölgeler</h3>
<p class="mb-4">Yunanistan genelinde yatırım eşikleri iki ana kategoriye ayrılmıştır:</p>
<ul class="list-disc pl-5 space-y-2 mb-6">
  <li><strong>800.000 Euro Bölgesi:</strong> Attika bölgesi (Atina'nın tamamı ve Pire), Selanik, Mikonos, Santorini ve nüfusu 3.100'ün üzerindeki adalarda tek bir konut için minimum sınır 800.000 Euro'dur.</li>
  <li><strong>400.000 Euro Bölgesi:</strong> Yukarıdaki bölgeler dışındaki anakara Yunanistan ve daha küçük adalarda sınır 400.000 Euro olarak uygulanmaktadır.</li>
  <li><strong>250.000 Euro İstisnası:</strong> Ticari veya endüstriyel nitelikteki binaların konuta dönüştürülmesi veya tescilli tarihi binaların restorasyonu projelerinde 250.000 Euro sınırı geçerliliğini sürdürmektedir.</li>
</ul>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg my-6">
  <p class="text-amber-900 font-medium"><strong>Hukuki Uyarı:</strong> 800.000€ ve 400.000€ sınırına tabi mülklerin en az 120 metrekare büyüklüğünde tek bir bağımsız bölüm olması zorunludur. Ayrıca mülklerin kısa dönemli (Airbnb) kiralamaya verilmesi yeni yasayla yasaklanmıştır; sadece uzun dönemli kiralama serbesttir.</p>
</div>

<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Başvuru Sürecinde İzlenmesi Gereken Adımlar</h3>
<ol class="list-decimal pl-5 space-y-2 mb-6">
  <li>Yunanistan vergi numarası (AFM) tahsisi ve banka hesabı açılışı</li>
  <li>Tapu ve kadastro kayıtlarında ipotek ve hukuki engel taraması</li>
  <li>Noter huzurunda satış sözleşmesinin tanzimi</li>
  <li>Göçmenlik Bakanlığı portalı üzerinden online başvuru ve Mavi Belge teslimi</li>
  <li>Biyometrik parmak izi randevusu ve 5 yıllık daimi oturum kartının alınması</li>
</ol>

<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Hukuki Danışmanlık ve Destek</h3>
<p>GrecoTurk olarak Atina ve Selanik ofislerimizle, Türkiye'den gelen danışanlarımızın tüm sürecini iki dilli avukat kadromuzla güvenle yürütüyoruz.</p>`
    }
  },
  {
    id: 'afm-banka-rehberi',
    name: 'AFM Vergi Numarası & Banka Hesabı',
    description: 'Yunanistan\'da yasal işlemler için gereken ilk iki temel adım',
    data: {
      title: "Yunanistan'da AFM (Vergi Numarası) ve Banka Hesabı Açılış Kılavuzu",
      category: "Prosedür",
      summary: "Yunanistan'da gayrimenkul almak veya şirket kurmak isteyen Türk vatandaşlarının ilk adımı olan AFM ve banka hesabı sürecinin ayrıntıları.",
      imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000",
      content: `<p class="mb-4">Yunanistan'da gayrimenkul satın almaktan telefon hattı bağlatmaya, elektrik aboneliğinden şirket kurmaya kadar her resmi işlem için 9 haneli <strong>AFM (Arithmos Forologikou Mitroou)</strong> vergi kimlik numarası zorunludur.</p>

<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">AFM Nasıl Alınır?</h3>
<p class="mb-4">Türkiye vatandaşları, Yunanistan'a bizzat gitmeye gerek kalmadan Türkiye'deki Yunanistan Başkonsolosluğu (İstanbul, Ankara veya İzmir) veya yetkili bir Yunan avukata verilen vekaletname ile AFM alabilirler.</p>

<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Gerekli Evraklar:</h3>
<ul class="list-disc pl-5 space-y-2 mb-6">
  <li>Pasaport fotokopisi (Noter onaylı ve apostilli veya konsolosluk tasdikli)</li>
  <li>Doğum kayıt örneği (Apostilli ve Yunanca yeminli tercümeli)</li>
  <li>Yerleşim yeri / ikametgah belgesi (e-Devlet'ten apostilli)</li>
  <li>Hukuki vekaletname (Power of Attorney)</li>
</ul>

<div class="bg-sky-50 border-l-4 border-sky-500 p-4 rounded-r-lg my-6">
  <p class="text-sky-900"><strong>Önemli Bilgi:</strong> Yunanistan'da yerleşik olmayan yabancılar için bir yerel vergi temsilcisi (Fiscal Representative) atanması yasal zorunluluktur. Hukuk büromuz bu temsilcilik hizmetini de üstlenmektedir.</p>
</div>

<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Banka Hesabı Açılışında Dikkat Edilecekler</h3>
<p>Yunanistan Merkez Bankası ve AB Kara Para Aklamayı Önleme (AML) mevzuatları gereği, bankalar gelir kaynağını ispatlayan vergi levhası veya bordro, SGK dökümü ve güncel faturaları talep etmektedir. Sürecin doğru evraklarla başlatılması hesabın birkaç gün içinde onaylanmasını sağlar.</p>`
    }
  },
  {
    id: 'gayrimenkul-guvenlik',
    name: 'Gayrimenkul Alımında Hukuki Güvenlik',
    description: 'Tapu denetimi, mühendis raporu ve sözleşme tuzakları',
    data: {
      title: "Yunanistan'da Ev Alırken Yapılan 5 Kritik Hukuki Hata",
      category: "Hukuk & Mevzuat",
      summary: "Yunanistan'da gayrimenkul yatırımı yaparken mağduriyet yaşamamak için avukat ve mühendis denetiminde dikkat edilmesi gerekenler.",
      imageUrl: "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&q=80&w=1000",
      content: `<p class="mb-4">Yunanistan emlak piyasasında fırsatlar kadar hukuki riskler de bulunmaktadır. Türkiye'den farklı bir tapu ve mülkiyet sistemine sahip olan Yunanistan'da güvenli bir alım gerçekleştirmek için aşağıdaki beş maddeye mutlaka dikkat edilmelidir.</p>

<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Yetersiz Tapu İncelemesi (Title Search)</h3>
<p class="mb-4">Tapu dairesinde (Ypothikofilakeio ve Ktimatologio) geriye dönük en az 20 yıllık mülkiyet geçmişi, ipotekler, hacizler ve miras ihtilafları bağımsız bir avukat tarafından taranmalıdır.</p>

<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. İmar ve Mühendis Denetiminin Atlanması</h3>
<p class="mb-4">Yunan kanunları gereği, satılacak mülkün imar planına aykırılıklarının (örneğin izinsiz kapatılmış balkonlar, bodrum kat kaçakları) tespit edilip yasallaştırılması (legalization) satıcının yükümlülüğüdür. Alıcı mühendisinin bunu teyit etmesi şarttır.</p>

<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Cayma Akçesi (Kapora) Sözleşmelerinin Denetimsiz İmzalanması</h3>
<p class="mb-4">Emlakçıların hazırladığı ön protokoller hukuki güvence sağlamayabilir. Kapora ödemesi ancak mülk temiz raporu verildikten sonra ve şartlı sözleşmeyle yapılmalıdır.</p>

<div class="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg my-6">
  <p class="text-emerald-900"><strong>Tavsiye:</strong> Satın alma bedeli doğrudan satıcıya elden veya kayıt dışı verilmemelidir. Yunanistan'da tüm ödemeler banka transferi veya bloke çek yoluyla resmi olarak belgelenmelidir.</p>
</div>`
    }
  }
];

export const BlogEditor: React.FC<BlogEditorProps> = ({
  postToEdit,
  language,
  onSave,
  onCancel
}) => {
  const isEditing = Boolean(postToEdit);

  const [title, setTitle] = useState(postToEdit?.title || '');
  const [category, setCategory] = useState(postToEdit?.category || 'Yatırım');
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [author, setAuthor] = useState(postToEdit?.author || 'GrecoTurk Hukuki Danışmanlar');
  const [summary, setSummary] = useState(postToEdit?.summary || '');
  const [imageUrl, setImageUrl] = useState(postToEdit?.imageUrl || PRESET_IMAGES[0].url);
  const [content, setContent] = useState(postToEdit?.content || '');
  const [readTime, setReadTime] = useState(postToEdit?.readTime || '5 dk okuma');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [validationError, setValidationError] = useState('');

  // Calculate estimated reading time automatically when content changes
  useEffect(() => {
    if (!postToEdit) {
      const textOnly = content.replace(/<[^>]*>/g, ' ');
      const words = textOnly.trim().split(/\s+/).filter(Boolean).length;
      const minutes = Math.max(1, Math.ceil(words / 150));
      setReadTime(language === 'tr' ? `${minutes} dk okuma` : `${minutes} min read`);
    }
  }, [content, language, postToEdit]);

  const insertSnippet = (snippet: string) => {
    setContent(prev => prev + '\n' + snippet);
  };

  const applyTemplate = (templateData: typeof PRESET_TEMPLATES[0]['data']) => {
    setTitle(templateData.title);
    setCategory(templateData.category);
    setIsCustomCategory(false);
    setSummary(templateData.summary);
    setImageUrl(templateData.imageUrl);
    setContent(templateData.content);
    setValidationError('');
  };

  const handleSave = () => {
    if (!title.trim()) {
      setValidationError(language === 'tr' ? 'Lütfen bir başlık giriniz.' : 'Please enter a title.');
      setActiveTab('edit');
      return;
    }
    if (!summary.trim()) {
      setValidationError(language === 'tr' ? 'Lütfen kısa bir özet giriniz.' : 'Please enter a summary.');
      setActiveTab('edit');
      return;
    }
    if (!content.trim()) {
      setValidationError(language === 'tr' ? 'Lütfen yazı içeriğini doldurunuz.' : 'Please enter the post content.');
      setActiveTab('edit');
      return;
    }

    const finalCategory = isCustomCategory && customCategory.trim() ? customCategory.trim() : category;
    
    // Format date in current language
    const now = new Date();
    const formattedDate = language === 'tr' 
      ? `${now.getDate()} ${['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'][now.getMonth()]} ${now.getFullYear()}`
      : now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    const newPost: BlogPost = {
      id: postToEdit?.id || `post-${Date.now()}`,
      title: title.trim(),
      summary: summary.trim(),
      content: content.trim(),
      author: author.trim() || 'GrecoTurk Hukuki Danışmanlar',
      date: postToEdit?.date || formattedDate,
      readTime: readTime.trim() || '5 dk okuma',
      category: finalCategory,
      imageUrl: imageUrl.trim() || PRESET_IMAGES[0].url,
      isCustom: true
    };

    onSave(newPost);
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="p-2 text-gray-500 hover:text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              title={language === 'tr' ? 'Geri Dön' : 'Go Back'}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <PenSquare className="w-7 h-7 text-greek-600" />
                {isEditing 
                  ? (language === 'tr' ? 'Blog Yazısını Düzenle' : 'Edit Blog Post')
                  : (language === 'tr' ? 'Yeni Blog Yazısı Yaz' : 'Write New Blog Post')
                }
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {language === 'tr'
                  ? 'Yunanistan hukuku, Golden Visa ve yatırımlar hakkında bilgilendirici makalenizi oluşturun.'
                  : 'Create informative articles about Greek law, Golden Visa, and investment insights.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Tab switch: Edit / Preview */}
            <div className="flex bg-gray-200 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'edit'
                    ? 'bg-white text-greek-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                {language === 'tr' ? 'Editör' : 'Editor'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-white text-greek-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Eye className="w-4 h-4" />
                {language === 'tr' ? 'Önizleme' : 'Preview'}
              </button>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 bg-greek-600 hover:bg-greek-700 text-white px-5 py-2 rounded-lg font-medium shadow-md shadow-greek-600/20 transition-all hover:shadow-lg"
            >
              <Save className="w-4 h-4" />
              {language === 'tr' ? 'Yayınla' : 'Publish'}
            </button>
          </div>
        </div>

        {/* Validation error notice */}
        {validationError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
            <span className="text-sm font-medium">{validationError}</span>
          </div>
        )}

        {/* Fast Template Selector (Only when creating new post) */}
        {!isEditing && (
          <div className="mb-8 p-4 bg-gradient-to-r from-greek-50 to-blue-50 border border-greek-100 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-greek-900 font-semibold text-sm">
                <Sparkles className="w-4 h-4 text-greek-600" />
                {language === 'tr' ? 'Hızlı Başlangıç Şablonları' : 'Quick Start Templates'}
              </div>
              <span className="text-xs text-greek-600">
                {language === 'tr' ? 'Tek tıkla hazır taslak yükleyin' : 'Load ready draft in one click'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PRESET_TEMPLATES.map(tmpl => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => applyTemplate(tmpl.data)}
                  className="text-left p-3 bg-white hover:bg-greek-50/50 border border-gray-200 hover:border-greek-400 rounded-xl transition-all shadow-sm hover:shadow group"
                >
                  <div className="text-sm font-bold text-gray-900 group-hover:text-greek-600 transition-colors">
                    {tmpl.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {tmpl.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab 1: Editor Form */}
        {activeTab === 'edit' && (
          <div className="space-y-6">
            
            {/* Title & Category */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  {language === 'tr' ? 'Blog Yazısı Başlığı *' : 'Post Title *'}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => { setTitle(e.target.value); setValidationError(''); }}
                  placeholder={language === 'tr' 
                    ? "Örn: Yunanistan'da Şirket Kurulumu: IKE Şirket Türü ve Avantajları" 
                    : "e.g., Guide to Setting Up a Company in Greece"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-greek-500 focus:border-greek-500"
                />
              </div>

              {/* Category, Author & Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    {language === 'tr' ? 'Kategori' : 'Category'}
                  </label>
                  {!isCustomCategory ? (
                    <div className="flex gap-2">
                      <select
                        value={category}
                        onChange={(e) => {
                          if (e.target.value === '__custom__') {
                            setIsCustomCategory(true);
                          } else {
                            setCategory(e.target.value);
                          }
                        }}
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-800 focus:ring-greek-500 focus:border-greek-500"
                      >
                        <option value="Yatırım">Yatırım (Investment)</option>
                        <option value="Prosedür">Prosedür (Procedure)</option>
                        <option value="Yaşam">Yaşam (Lifestyle)</option>
                        <option value="Hukuk & Mevzuat">Hukuk & Mevzuat (Law)</option>
                        <option value="Vergi & Maliye">Vergi & Maliye (Tax)</option>
                        <option value="Gayrimenkul">Gayrimenkul (Real Estate)</option>
                        <option value="__custom__">+ {language === 'tr' ? 'Özel Kategori Ekle...' : 'Add Custom Category...'}</option>
                      </select>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder={language === 'tr' ? "Yeni Kategori Adı" : "Category Name"}
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setIsCustomCategory(false)}
                        className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 border border-gray-300 rounded"
                      >
                        {language === 'tr' ? 'Vazgeç' : 'Cancel'}
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    {language === 'tr' ? 'Yazar / Danışman' : 'Author'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="GrecoTurk Danışmanlık"
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-800 focus:ring-greek-500 focus:border-greek-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    {language === 'tr' ? 'Okuma Süresi' : 'Read Time'}
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="5 dk okuma"
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-800 focus:ring-greek-500 focus:border-greek-500"
                    />
                  </div>
                </div>
              </div>

              {/* Summary / Excerpt */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  {language === 'tr' ? 'Kısa Özet (Listede ve Önizlemede Görünür) *' : 'Summary (Shown in list card) *'}
                </label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => { setSummary(e.target.value); setValidationError(''); }}
                  placeholder={language === 'tr' 
                    ? "Yazının temel konusunu ve okuyucuya sağladığı hukuki değeri anlatan 1-2 cümlelik özet..."
                    : "A short 1-2 sentence overview of the article..."}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-800 focus:ring-greek-500 focus:border-greek-500"
                />
              </div>
            </div>

            {/* Cover Image Picker */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <label className="block text-sm font-semibold text-gray-800">
                {language === 'tr' ? 'Kapak Görseli' : 'Cover Image'}
              </label>

              {/* Presets */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className={`group relative h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      imageUrl === preset.url ? 'border-greek-600 ring-2 ring-greek-600/30' : 'border-transparent hover:opacity-90'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] font-medium text-white px-1 text-center">
                      {preset.label}
                    </span>
                    {imageUrl === preset.url && (
                      <div className="absolute top-1 right-1 bg-greek-600 text-white rounded-full p-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Custom Image URL */}
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-greek-500 focus:border-greek-500"
                />
              </div>
            </div>

            {/* Content & Toolbar */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="block text-sm font-semibold text-gray-800">
                  {language === 'tr' ? 'Makale İçeriği (HTML & Biçimlendirme) *' : 'Article Content (HTML & Formatting) *'}
                </label>
                <span className="text-xs text-gray-500">
                  {language === 'tr' ? 'Aşağıdaki hızlı araçları kullanarak başlık, liste ve kutucuk ekleyebilirsiniz.' : 'Use quick toolbar buttons to format content.'}
                </span>
              </div>

              {/* Quick Formatting Toolbar */}
              <div className="flex flex-wrap items-center gap-1.5 p-2 bg-gray-50 border border-gray-200 rounded-xl">
                <button
                  type="button"
                  onClick={() => insertSnippet('<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Alt Başlık Başlığı</h3>\n<p class="mb-4">İçerik açıklaması...</p>')}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-white text-gray-700 hover:text-greek-700 hover:bg-greek-50 border border-gray-200 rounded-md transition-colors"
                  title="Başlık Ekle"
                >
                  <Heading2 className="w-3.5 h-3.5 text-greek-600" />
                  H3 Başlık
                </button>

                <button
                  type="button"
                  onClick={() => insertSnippet('<p class="mb-4">Yeni bir paragraf yazısı buraya gelir...</p>')}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-white text-gray-700 hover:text-greek-700 hover:bg-greek-50 border border-gray-200 rounded-md transition-colors"
                >
                  Paragraf
                </button>

                <button
                  type="button"
                  onClick={() => insertSnippet('<strong>Vurgulanan Metin</strong>')}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-white text-gray-700 hover:text-greek-700 hover:bg-greek-50 border border-gray-200 rounded-md transition-colors"
                >
                  <Bold className="w-3.5 h-3.5" />
                  Kalın
                </button>

                <button
                  type="button"
                  onClick={() => insertSnippet('<em>İtalik Açıklama</em>')}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-white text-gray-700 hover:text-greek-700 hover:bg-greek-50 border border-gray-200 rounded-md transition-colors"
                >
                  <Italic className="w-3.5 h-3.5" />
                  İtalik
                </button>

                <button
                  type="button"
                  onClick={() => insertSnippet('<ul class="list-disc pl-5 space-y-2 mb-6">\n  <li>Birinci madde</li>\n  <li>İkinci madde</li>\n  <li>Üçüncü madde</li>\n</ul>')}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-white text-gray-700 hover:text-greek-700 hover:bg-greek-50 border border-gray-200 rounded-md transition-colors"
                >
                  <List className="w-3.5 h-3.5 text-greek-600" />
                  Madde Listesi
                </button>

                <button
                  type="button"
                  onClick={() => insertSnippet('<ol class="list-decimal pl-5 space-y-2 mb-6">\n  <li>İlk adım</li>\n  <li>İkinci adım</li>\n  <li>Üçüncü adım</li>\n</ol>')}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-white text-gray-700 hover:text-greek-700 hover:bg-greek-50 border border-gray-200 rounded-md transition-colors"
                >
                  <ListOrdered className="w-3.5 h-3.5 text-greek-600" />
                  Numaralı Liste
                </button>

                <button
                  type="button"
                  onClick={() => insertSnippet('<div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg my-6">\n  <p class="text-amber-900 font-medium"><strong>Hukuki Uyarı:</strong> Bu alana dikkat edilmesi gereken yasal bir husus yazılır.</p>\n</div>')}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  Uyarı Kutusu
                </button>

                <button
                  type="button"
                  onClick={() => insertSnippet('<div class="bg-sky-50 border-l-4 border-sky-500 p-4 rounded-r-lg my-6">\n  <p class="text-sky-900"><strong>Bilgi Notu:</strong> Danışanlarımıza tavsiye edilen pratik çözüm yolu.</p>\n</div>')}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200 rounded-md transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  Bilgi Kutusu
                </button>
              </div>

              {/* Textarea */}
              <textarea
                rows={16}
                value={content}
                onChange={(e) => { setContent(e.target.value); setValidationError(''); }}
                placeholder={language === 'tr' 
                  ? "<p class=\"mb-4\">Makalenizin giriş paragrafını buraya yazın...</p>\n\n<h3 class=\"text-2xl font-bold text-gray-900 mt-8 mb-4\">Konu Başlığı</h3>\n<p class=\"mb-4\">Ayrıntılı yasal ve pratik bilgiler...</p>"
                  : "<p class=\"mb-4\">Write article intro here...</p>"}
                className="w-full px-4 py-3 font-mono text-sm border border-gray-300 rounded-xl focus:ring-greek-500 focus:border-greek-500 leading-relaxed text-gray-800 bg-white"
              />
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors"
              >
                {language === 'tr' ? 'Vazgeç' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2 bg-greek-600 hover:bg-greek-700 text-white px-7 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
              >
                <Save className="w-4 h-4" />
                {isEditing 
                  ? (language === 'tr' ? 'Değişiklikleri Kaydet' : 'Save Changes')
                  : (language === 'tr' ? 'Yazıyı Yayınla' : 'Publish Post')
                }
              </button>
            </div>

          </div>
        )}

        {/* Tab 2: Live Preview */}
        {activeTab === 'preview' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
            {/* Simulated Hero */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
              <img
                src={imageUrl || PRESET_IMAGES[0].url}
                alt={title || 'Preview'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white max-w-3xl">
                <div className="flex items-center gap-3 text-xs md:text-sm font-medium mb-3">
                  <span className="bg-greek-600 px-3 py-1 rounded-full">{isCustomCategory && customCategory ? customCategory : category}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {readTime}</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-extrabold leading-tight text-white drop-shadow">
                  {title || (language === 'tr' ? 'Makale Başlığı Buraya Gelecek' : 'Article Title Here')}
                </h2>
                <div className="flex items-center gap-2 mt-3 text-xs md:text-sm text-gray-200">
                  <User className="w-4 h-4" />
                  <span>{author || 'GrecoTurk Danışmanlık'}</span>
                </div>
              </div>
            </div>

            {/* Article Body Preview */}
            <div className="p-6 md:p-12 max-w-3xl mx-auto">
              {summary && (
                <div className="text-lg font-medium text-gray-600 italic border-l-4 border-greek-500 pl-4 py-1 mb-8">
                  {summary}
                </div>
              )}

              <div 
                className="prose prose-lg prose-greek text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: content || `<p class="text-gray-400 italic">${language === 'tr' ? 'Henüz içerik yazılmadı. Editör sekmesinden yazı ekleyin.' : 'No content yet.'}</p>` 
                }}
              />

              <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
                <span>{language === 'tr' ? 'Önizleme Modu' : 'Preview Mode'}</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className="text-greek-600 hover:text-greek-800 font-semibold"
                >
                  ← {language === 'tr' ? 'Düzenlemeye Devam Et' : 'Back to Editing'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogEditor;
