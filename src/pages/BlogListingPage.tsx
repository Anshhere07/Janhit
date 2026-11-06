import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  ChevronRight,
  Clock,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Download,
  BookOpen,
  Sparkles,
  Heart,
  Activity,
  Baby,
  Apple,
  CloudRain,
  PhoneCall,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { BLOG_CATEGORIES, BLOG_ARTICLES, BlogArticle } from '../data/blogData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { HOSPITAL_INFO } from '../utils/constants';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportStandard } from '../utils/animations';
import { getResponsiveSrcSet } from '../utils/imageUtils';

export const BlogListingPage: React.FC = () => {
  const { language, t } = useLanguage();
  const isHindi = language === 'hi';
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategoryParam = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState<string>(selectedCategoryParam);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [displayCount, setDisplayCount] = useState<number>(6);

  // Sync category state with search param
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setDisplayCount(6);
    if (categoryId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'all' || article.categoryId === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle =
        article.title.toLowerCase().includes(q) ||
        article.hindiTitle.toLowerCase().includes(q);
      const matchExcerpt =
        article.excerpt.toLowerCase().includes(q) ||
        article.hindiExcerpt.toLowerCase().includes(q);
      const matchTag = article.tags.some((t) => t.toLowerCase().includes(q));
      const matchDoctor =
        article.author.name.toLowerCase().includes(q) ||
        article.author.hindiName.toLowerCase().includes(q) ||
        article.reviewer.name.toLowerCase().includes(q);

      return matchTitle || matchExcerpt || matchTag || matchDoctor;
    });
  }, [selectedCategory, searchQuery, isHindi]);

  // Distinct featured article (or first article)
  const featuredArticle: BlogArticle | null = useMemo(() => {
    if (selectedCategory === 'all' && !searchQuery) {
      return BLOG_ARTICLES.find((a) => a.featured) || BLOG_ARTICLES[0];
    }
    return null;
  }, [selectedCategory, searchQuery]);

  // List of remaining articles to display in grid
  const gridArticles = useMemo(() => {
    if (featuredArticle) {
      return filteredArticles.filter((a) => a.id !== featuredArticle.id);
    }
    return filteredArticles;
  }, [filteredArticles, featuredArticle]);

  // Visible articles after pagination limit
  const visibleArticles = gridArticles.slice(0, displayCount);
  const hasMore = visibleArticles.length < gridArticles.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 6);
  };

  // Helper to render category icon
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-3.5 h-3.5" />;
      case 'Activity':
        return <Activity className="w-3.5 h-3.5" />;
      case 'Baby':
        return <Baby className="w-3.5 h-3.5" />;
      case 'Apple':
        return <Apple className="w-3.5 h-3.5" />;
      case 'CloudRain':
        return <CloudRain className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-navy-950 pb-24">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION & SEARCH                                                  */}
      {/* ========================================================================= */}
      <section className="relative pt-28 pb-16 bg-gradient-to-b from-medical-50/80 via-white to-slate-50/70 dark:from-navy-900 dark:via-navy-950 dark:to-navy-950 border-b border-slate-200/80 dark:border-white/[0.08] overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-medical-400/10 dark:bg-medical-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-accent-400/10 dark:bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mb-6"
          >
            <Link
              to="/"
              className="hover:text-medical-600 dark:hover:text-medical-400 transition-colors"
            >
              {isHindi ? 'होम' : 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-slate-900 dark:text-white font-semibold">
              {isHindi ? 'स्वास्थ्य ब्लॉग' : 'Health Blog'}
            </span>
          </nav>

          {/* Heading Block */}
          <div className="max-w-3xl">
            <Badge variant="medical" className="mb-3 px-3 py-1 font-semibold uppercase tracking-wider text-xs">
              {t('blogPage.heroBadge')}
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 dark:text-white tracking-tight leading-tight">
              {t('blogPage.heroTitle')}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('blogPage.heroSubtitle')}
            </p>
          </div>

          {/* Search Bar Input */}
          <div className="mt-8 max-w-2xl">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('blogPage.searchPlaceholder')}
                className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-navy-900 border border-slate-300 dark:border-navy-700 rounded-2xl text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500 shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {isHindi ? 'हटाएं' : 'Clear'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CATEGORY FILTER BAR                                                    */}
      {/* ========================================================================= */}
      <section className="sticky top-20 z-20 bg-white/95 dark:bg-navy-900/95 backdrop-blur-md border-b border-slate-200 dark:border-white/[0.08] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 overflow-x-auto py-3.5 no-scrollbar">
            {/* All Categories Pill */}
            <button
              type="button"
              onClick={() => handleCategorySelect('all')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-medical-600 text-white shadow-md shadow-medical-600/20'
                  : 'text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{t('blogPage.allCategories')}</span>
            </button>

            {/* Individual Categories */}
            {BLOG_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-medical-600 text-white shadow-md shadow-medical-600/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                  }`}
                >
                  {renderCategoryIcon(cat.iconName)}
                  <span>{isHindi ? cat.hindiName : cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MAIN ARTICLES SECTION                                                  */}
      {/* ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* 3A. FEATURED HERO ARTICLE SPOTLIGHT (WHEN NO FILTER/SEARCH) */}
        {featuredArticle && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportStandard}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-medical-600 dark:text-medical-400">
              <Sparkles className="w-4 h-4" />
              <span>{t('blogPage.featuredArticle')}</span>
            </div>

            <Card className="overflow-hidden border-slate-200 dark:border-white/[0.08] bg-white dark:bg-navy-900 shadow-md hover:shadow-xl transition-all group">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Image Section (7 Cols on desktop) */}
                <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[360px] overflow-hidden">
                  <img
                    src={featuredArticle.image}
                    alt={isHindi ? featuredArticle.hindiTitle : featuredArticle.title}
                    loading="lazy"
                    decoding="async"
                    srcSet={getResponsiveSrcSet(featuredArticle.image)}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="medical" className="px-3 py-1 font-bold text-xs uppercase shadow-sm">
                      {isHindi ? featuredArticle.hindiCategoryName : featuredArticle.categoryName}
                    </Badge>
                  </div>
                </div>

                {/* Content Section (5 Cols on desktop) */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {isHindi ? featuredArticle.hindiReadTime : featuredArticle.readTime}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {isHindi ? featuredArticle.hindiPublishDate : featuredArticle.publishDate}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white leading-tight group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors">
                      <Link to={`/blog/${featuredArticle.slug}`}>
                        {isHindi ? featuredArticle.hindiTitle : featuredArticle.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {isHindi ? featuredArticle.hindiExcerpt : featuredArticle.excerpt}
                    </p>
                  </div>

                  {/* Author, Reviewer & Button */}
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/[0.06] space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={featuredArticle.author.avatar}
                          alt={featuredArticle.author.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-white/[0.1]"
                        />
                        <div>
                          <p className="text-xs font-bold text-navy-950 dark:text-white">
                            {isHindi ? featuredArticle.author.hindiName : featuredArticle.author.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {isHindi ? featuredArticle.author.hindiRole : featuredArticle.author.role}
                          </p>
                        </div>
                      </div>

                      <div className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-lg">
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                        <span>{isHindi ? 'सत्यापित' : 'Reviewed'}</span>
                      </div>
                    </div>

                    <Link to={`/blog/${featuredArticle.slug}`}>
                      <Button
                        variant="primary"
                        size="md"
                        className="w-full"
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        {t('blogPage.readArticleBtn')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* 3B. ARTICLES GRID */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-navy-950 dark:text-white">
              {featuredArticle ? t('blogPage.latestArticles') : `${filteredArticles.length} ${isHindi ? 'लेख उपलब्ध' : 'Articles Found'}`}
            </h3>
            {searchQuery && (
              <span className="text-xs text-slate-400">
                {isHindi ? `खोज परिणाम: "${searchQuery}"` : `Results for "${searchQuery}"`}
              </span>
            )}
          </div>

          {visibleArticles.length > 0 ? (
            <motion.div
              variants={staggerContainer(0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {visibleArticles.map((article) => (
                <motion.div key={article.id} variants={fadeInUp} className="flex flex-col h-full">
                  <Card
                    className="overflow-hidden border-slate-200 dark:border-white/[0.08] bg-white dark:bg-navy-900 shadow-sm hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group h-full"
                  >
                    <div>
                      {/* Image Header */}
                      <Link to={`/blog/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-navy-950">
                        <img
                          src={article.image}
                          alt={isHindi ? article.hindiTitle : article.title}
                          loading="lazy"
                          decoding="async"
                          srcSet={getResponsiveSrcSet(article.image)}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge variant="medical" className="text-[10px] py-0.5 px-2 font-bold uppercase shadow-sm">
                            {isHindi ? article.hindiCategoryName : article.categoryName}
                          </Badge>
                        </div>
                      </Link>

                      {/* Content */}
                      <div className="p-5 sm:p-6 space-y-2.5">
                        <div className="flex items-center gap-2.5 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {isHindi ? article.hindiReadTime : article.readTime}
                          </span>
                          <span>•</span>
                          <span>{isHindi ? article.hindiPublishDate : article.publishDate}</span>
                        </div>

                        <h4 className="font-bold text-base sm:text-lg text-navy-950 dark:text-white leading-snug group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors line-clamp-2">
                          <Link to={`/blog/${article.slug}`}>
                            {isHindi ? article.hindiTitle : article.title}
                          </Link>
                        </h4>

                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                          {isHindi ? article.hindiExcerpt : article.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-5 sm:p-6 pt-0">
                      <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={article.author.avatar}
                            alt={article.author.name}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[130px]">
                            {isHindi ? article.author.hindiName : article.author.name}
                          </span>
                        </div>

                        <Link
                          to={`/blog/${article.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-medical-600 dark:text-medical-400 hover:underline"
                        >
                          <span>{isHindi ? 'पढ़ें' : 'Read'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="py-16 text-center rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/[0.08]">
              <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h4 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                {t('blogPage.noArticlesFound')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                {isHindi
                  ? 'कृपया अन्य शब्दों से खोजें अथवा विभिन्न श्रेणियों का चयन करें।'
                  : 'Try searching with different terms or selecting another clinical category.'}
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4"
              >
                {t('blogPage.resetSearch')}
              </Button>
            </div>
          )}

          {/* Load More Pagination */}
          {hasMore && (
            <div className="text-center pt-10">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handleLoadMore}
                className="px-8 shadow-sm"
              >
                {t('blogPage.loadMoreBtn')}
              </Button>
            </div>
          )}
        </div>

        {/* ======================================================================= */}
        {/* 4. HEALTH RESOURCES & HELPLINE STRIP                                    */}
        {/* ======================================================================= */}
        <section className="pt-8 border-t border-slate-200 dark:border-white/[0.08]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Free Guides Download */}
            <Card className="p-6 bg-gradient-to-br from-medical-600 to-teal-700 text-white shadow-md">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                <Download className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-base sm:text-lg text-white">
                {t('blogPage.downloadResourceTitle')}
              </h4>
              <p className="text-xs text-emerald-100 mt-2 leading-relaxed">
                {t('blogPage.downloadResourceDesc')}
              </p>
              <a
                href="#download-guides"
                onClick={(e) => {
                  e.preventDefault();
                  alert(
                    isHindi
                      ? 'जनहित हॉस्पिटल स्वास्थ्य मार्गदर्शिका पीडीएफ डाउनलोड आरंभ हो रहा है।'
                      : 'Downloading Janhit Hospital Patient Health Handbook PDF.'
                  );
                }}
                className="mt-5 inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-white text-medical-800 font-bold text-xs hover:bg-emerald-50 transition-colors shadow-sm"
              >
                <span>{t('blogPage.downloadBtn')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </Card>

            {/* 2. Medical Specialist Consultation */}
            <Card className="p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08]">
              <div className="w-10 h-10 rounded-xl bg-medical-50 dark:bg-medical-950/60 text-medical-600 dark:text-medical-400 flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base sm:text-lg text-navy-950 dark:text-white">
                {isHindi ? 'डॉक्टर से परामर्श लें' : 'Consult Our Specialists'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                {isHindi
                  ? 'किसी भी लक्षण या बीमारी के लिए जनहित हॉस्पिटल के अनुभवी सुपर-स्पेशलिस्ट से परामर्श का समय बुक करें।'
                  : 'Schedule an in-person or OPD consultation with senior specialists across 8+ clinical super-specialties.'}
              </p>
              <Link
                to="/appointment"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-medical-600 dark:text-medical-400 hover:underline"
              >
                <span>{isHindi ? 'अपॉइंटमेंट बुक करें' : 'Book Consultation'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </Card>

            {/* 3. 24/7 Emergency Alert */}
            <Card className="p-6 bg-emergency-50/90 dark:bg-emergency-950/40 border-emergency-200/80 dark:border-emergency-800/40 text-emergency-950 dark:text-emergency-100">
              <div className="w-10 h-10 rounded-xl bg-emergency-600 text-white flex items-center justify-center mb-4">
                <PhoneCall className="w-5 h-5 animate-pulse" />
              </div>
              <h4 className="font-bold text-base sm:text-lg">
                {isHindi ? '24/7 इमरजेंसी हेल्पलाइन' : '24/7 Emergency Response'}
              </h4>
              <p className="text-xs text-emergency-800 dark:text-emergency-300 mt-2 leading-relaxed">
                {isHindi
                  ? 'हार्ट अटैक, गंभीर सांस की तकलीफ या दुर्घटना के मामलों में तुरंत कॉल करें।'
                  : 'For acute emergencies, stroke signs, or severe trauma, reach our emergency triage desk directly.'}
              </p>
              <a
                href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/-/g, '')}`}
                className="mt-5 inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-emergency-600 text-white font-mono font-bold text-xs hover:bg-emergency-700 transition-colors shadow-sm"
              >
                <span>{HOSPITAL_INFO.emergencyPhone}</span>
              </a>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};
export default BlogListingPage;
