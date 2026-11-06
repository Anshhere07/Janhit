import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Clock,
  Calendar,
  ShieldCheck,
  Share2,
  Copy,
  Check,
  ArrowLeft,
  AlertTriangle,
  Info,
  Lightbulb,
  Stethoscope,
  PhoneCall,
  Bookmark,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { HOSPITAL_INFO } from '../utils/constants';
import { getResponsiveSrcSet } from '../utils/imageUtils';
import {
  slideInLeft,
  slideInRight,
  threeCardItem,
  staggerContainer,
  viewportStandard,
} from '../utils/animations';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const isHindi = language === 'hi';
  const navigate = useNavigate();

  const [copiedLink, setCopiedLink] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  // Find article by slug
  const article: BlogArticle | undefined = useMemo(() => {
    return BLOG_ARTICLES.find((a) => a.slug === slug);
  }, [slug]);

  // Dynamic SEO & Metadata (Title, Meta Description, Canonical, OG, JSON-LD)
  useEffect(() => {
    if (!article) return;

    const pageTitle = isHindi ? article.seo.hindiMetaTitle : article.seo.metaTitle;
    const pageDescription = isHindi
      ? article.seo.hindiMetaDescription
      : article.seo.metaDescription;

    document.title = pageTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageDescription);

    // Update Canonical URL
    const canonicalUrl = `${window.location.origin}/blog/${article.slug}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Inject JSON-LD Schema (MedicalWebPage / BlogPosting)
    const schemaId = 'article-structured-data';
    let schemaScript = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = schemaId;
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      headline: isHindi ? article.hindiTitle : article.title,
      description: pageDescription,
      image: [article.image],
      datePublished: article.publishDate,
      dateModified: article.lastUpdatedDate,
      author: {
        '@type': 'Person',
        name: article.author.name,
        jobTitle: article.author.role,
      },
      reviewedBy: {
        '@type': 'Person',
        name: article.reviewer.name,
        jobTitle: article.reviewer.designation,
      },
      publisher: {
        '@type': 'MedicalOrganization',
        name: HOSPITAL_INFO.name,
        logo: {
          '@type': 'ImageObject',
          url: `${window.location.origin}/logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
    };

    schemaScript.textContent = JSON.stringify(schemaData);

    return () => {
      document.title = 'Janhit Hospital | Super Speciality Healthcare';
      const scriptToRemove = document.getElementById(schemaId);
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [article, isHindi]);

  // Track active section for Table of Contents
  useEffect(() => {
    if (!article || article.sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );

    article.sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [article]);

  // Social share handlers
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = article ? (isHindi ? article.hindiTitle : article.title) : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${shareTitle}\n\n${currentUrl}`
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareTitle
    )}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Related articles
  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return BLOG_ARTICLES.filter(
      (a) =>
        a.id !== article.id &&
        (article.relatedArticleSlugs.includes(a.slug) || a.categoryId === article.categoryId)
    ).slice(0, 3);
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen pt-36 pb-24 bg-slate-50 dark:bg-navy-950 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-navy-950 dark:text-white">
            {isHindi ? 'स्वास्थ्य लेख नहीं मिला' : 'Article Not Found'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isHindi
              ? 'आपके द्वारा खोजा गया लेख उपलब्ध नहीं है या स्थानांतरित कर दिया गया है।'
              : 'The medical article you are looking for does not exist or has been relocated.'}
          </p>
          <Button
            variant="primary"
            onClick={() => navigate('/blog')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            {isHindi ? 'स्वास्थ्य ब्लॉग पर लौटें' : 'Back to Health Blog'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-navy-950 pb-24">
      {/* ========================================================================= */}
      {/* 1. ARTICLE HEADER & BREADCRUMBS                                           */}
      {/* ========================================================================= */}
      <section className="relative pt-28 pb-12 bg-gradient-to-b from-medical-50/80 via-white to-slate-50/70 dark:from-navy-900 dark:via-navy-950 dark:to-navy-950 border-b border-slate-200/80 dark:border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumbs"
            className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mb-6"
          >
            <Link to="/" className="hover:text-medical-600 transition-colors">
              {isHindi ? 'होम' : 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link to="/blog" className="hover:text-medical-600 transition-colors">
              {isHindi ? 'स्वास्थ्य ब्लॉग' : 'Health Blog'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link
              to={`/blog?category=${article.categoryId}`}
              className="hover:text-medical-600 transition-colors"
            >
              {isHindi ? article.hindiCategoryName : article.categoryName}
            </Link>
          </nav>

          {/* Category Badge & Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link to={`/blog?category=${article.categoryId}`}>
              <Badge variant="medical" className="px-3 py-1 font-bold text-xs uppercase">
                {isHindi ? article.hindiCategoryName : article.categoryName}
              </Badge>
            </Link>
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {isHindi ? article.hindiReadTime : article.readTime}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              {isHindi ? article.hindiPublishDate : article.publishDate}
            </span>
          </div>

          {/* Article Main Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy-950 dark:text-white leading-tight tracking-tight">
            {isHindi ? article.hindiTitle : article.title}
          </h1>

          {/* Subtitle / Excerpt */}
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {isHindi ? article.hindiExcerpt : article.excerpt}
          </p>

          {/* Author & Reviewer Verification Banner */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-white/[0.08] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Author */}
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-medical-500/30"
              />
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {t('blogPage.authorLabel')}
                </span>
                <p className="font-bold text-sm text-navy-950 dark:text-white">
                  {isHindi ? article.author.hindiName : article.author.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isHindi ? article.author.hindiRole : article.author.role}
                </p>
              </div>
            </div>

            {/* Doctor Reviewer Stamp */}
            <div className="flex items-center gap-2.5 sm:border-l sm:border-slate-200 sm:dark:border-white/[0.08] sm:pl-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <span>{t('blogPage.medicallyReviewedBy')}</span>
                </span>
                <p className="font-bold text-xs text-navy-950 dark:text-white">
                  {isHindi ? article.reviewer.hindiName : article.reviewer.name}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isHindi ? article.reviewer.hindiQualification : article.reviewer.qualification}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FEATURED IMAGE                                                         */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
        <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-white/[0.08]">
          <img
            src={article.image}
            alt={isHindi ? article.hindiTitle : article.title}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            srcSet={getResponsiveSrcSet(article.image)}
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="w-full max-h-[480px] object-cover"
          />
          <div className="p-3 bg-white dark:bg-navy-900 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/[0.06]">
            {isHindi ? article.hindiImageCaption : article.imageCaption}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MAIN CONTENT WITH STICKY TABLE OF CONTENTS (2 Columns: Left & Right)   */}
      {/* ========================================================================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* 3A. MAIN CONTENT COLUMN (8 Cols - Slide In Left) */}
          <motion.article
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 space-y-10"
          >
            {/* Mobile / In-content Table of Contents for easy access */}
            {article.sections.length > 2 && (
              <div className="p-5 rounded-2xl bg-slate-100/80 dark:bg-navy-900/80 border border-slate-200 dark:border-white/[0.08] lg:hidden">
                <h3 className="font-bold text-sm text-navy-950 dark:text-white mb-3 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-medical-600" />
                  <span>{t('blogPage.tableOfContents')}</span>
                </h3>
                <nav className="space-y-2 text-xs">
                  {article.sections.map((sec, idx) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block text-medical-600 dark:text-medical-400 hover:underline py-0.5"
                    >
                      {idx + 1}. {isHindi ? sec.hindiHeading : sec.heading}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Sections */}
            <div className="space-y-12">
              {article.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-32 space-y-4">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white tracking-tight border-b border-slate-200/60 dark:border-white/[0.06] pb-3">
                    {isHindi ? section.hindiHeading : section.heading}
                  </h2>

                  {(isHindi ? section.hindiParagraphs : section.paragraphs).map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-base text-slate-700 dark:text-slate-300 leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}

                  {/* Bullet points */}
                  {section.bulletPoints && (
                    <ul className="space-y-2.5 my-4 pl-1">
                      {(isHindi ? section.hindiBulletPoints || section.bulletPoints : section.bulletPoints).map(
                        (bp, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-3 text-sm sm:text-base text-slate-700 dark:text-slate-300"
                          >
                            <div className="w-2 h-2 rounded-full bg-medical-500 mt-2 shrink-0" />
                            <span>{bp}</span>
                          </li>
                        )
                      )}
                    </ul>
                  )}

                  {/* Callout box */}
                  {section.callout && (
                    <div
                      className={`p-5 rounded-2xl border flex items-start gap-3.5 my-6 ${section.callout.type === 'warning'
                          ? 'bg-amber-50/90 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200'
                          : section.callout.type === 'tip'
                            ? 'bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200'
                            : 'bg-medical-50/90 dark:bg-medical-950/30 border-medical-200 dark:border-medical-800/40 text-medical-950 dark:text-medical-200'
                        }`}
                    >
                      {section.callout.type === 'warning' ? (
                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      ) : section.callout.type === 'tip' ? (
                        <Lightbulb className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <Info className="w-5 h-5 text-medical-600 dark:text-medical-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-bold text-sm">
                          {isHindi ? section.callout.hindiTitle : section.callout.title}
                        </h4>
                        <p className="text-xs sm:text-sm mt-1 leading-relaxed opacity-95">
                          {isHindi ? section.callout.hindiText : section.callout.text}
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Article Tags */}
            <div className="pt-6 border-t border-slate-200 dark:border-white/[0.08] flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {isHindi ? 'विषय टैग:' : 'Tags:'}
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Social Share Bar */}
            <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-medical-600" />
                <span className="font-bold text-sm text-navy-950 dark:text-white">
                  {t('blogPage.shareArticle')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={handleShareTwitter}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white transition-colors"
                >
                  Twitter / X
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t('blogPage.copiedLink')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'लिंक कॉपी करें' : 'Copy Link'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Evidence-Based Educational Disclaimer */}
            <div className="p-5 rounded-2xl bg-slate-100/90 dark:bg-navy-900/60 border border-slate-200/80 dark:border-white/[0.06] text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
              <h5 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {t('blogPage.medicalDisclaimerTitle')}
              </h5>
              <p className="leading-relaxed">{t('blogPage.medicalDisclaimerText')}</p>
            </div>

            {/* Consult Specialist Callout Banner */}
            <Card className="p-6 sm:p-8 bg-gradient-to-br from-medical-600 to-teal-700 text-white shadow-lg space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">
                    {t('blogPage.consultSpecialistTitle')}
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-100 mt-1 leading-relaxed">
                    {t('blogPage.consultSpecialistDesc')}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to={`/appointment?doctor=${article.author.doctorId || ''}&department=${article.departmentId}`}
                >
                  <Button
                    variant="secondary"
                    size="md"
                    className="bg-white text-medical-800 hover:bg-emerald-50 shadow-sm"
                  >
                    {t('blogPage.bookConsultationBtn')}
                  </Button>
                </Link>

                <Link
                  to={`/departments/${article.departmentId}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-white/90 hover:underline px-3 py-2"
                >
                  <span>
                    {isHindi
                      ? `${article.hindiDepartmentName} विभाग देखें`
                      : `View ${article.departmentName} Department`}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          </motion.article>

          {/* 3B. RIGHT STICKY SIDEBAR (4 Cols - Slide In Right) */}
          <motion.aside
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="lg:col-span-4 space-y-6 lg:sticky lg:top-36"
          >
            {/* Desktop Table of Contents */}
            {article.sections.length > 1 && (
              <Card className="hidden lg:block p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm">
                <h3 className="font-bold text-sm text-navy-950 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-medical-600" />
                  <span>{t('blogPage.tableOfContents')}</span>
                </h3>
                <nav className="space-y-2 text-xs">
                  {article.sections.map((sec, idx) => {
                    const isActive = activeSectionId === sec.id;
                    return (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        className={`block py-1.5 px-2.5 rounded-lg transition-colors ${isActive
                            ? 'bg-medical-50 dark:bg-medical-950/60 text-medical-700 dark:text-medical-300 font-bold'
                            : 'text-slate-600 dark:text-slate-400 hover:text-navy-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/[0.03]'
                          }`}
                      >
                        {idx + 1}. {isHindi ? sec.hindiHeading : sec.heading}
                      </a>
                    );
                  })}
                </nav>
              </Card>
            )}

            {/* Doctor Reviewer Card */}
            <Card className="p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-medical-50 dark:bg-medical-950/60 text-medical-600 dark:text-medical-400 flex items-center justify-center font-bold text-base shrink-0 border border-medical-500/20">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    {t('blogPage.medicallyReviewedBy')}
                  </span>
                  <h4 className="font-bold text-sm text-navy-950 dark:text-white">
                    {isHindi ? article.reviewer.hindiName : article.reviewer.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {isHindi ? article.reviewer.hindiQualification : article.reviewer.qualification}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/[0.06] pt-3">
                {isHindi ? article.reviewer.hindiDesignation : article.reviewer.designation}
              </p>

              <Link
                to={`/doctors/${article.reviewer.doctorId}`}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-700 text-xs font-bold text-navy-950 dark:text-white transition-colors"
              >
                <span>{isHindi ? 'डॉक्टर प्रोफाइल देखें' : 'View Doctor Profile'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </Card>

            {/* Emergency Hotline Alert */}
            <div className="p-5 rounded-2xl bg-emergency-50/90 dark:bg-emergency-950/40 border border-emergency-200/80 dark:border-emergency-800/40 text-emergency-950 dark:text-emergency-100">
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-emergency-600 animate-pulse" />
                <h4 className="font-bold text-sm">
                  {isHindi ? 'आपातकालीन सहायता' : 'Emergency Triage Desk'}
                </h4>
              </div>
              <p className="text-xs text-emergency-800 dark:text-emergency-300 mt-1.5 leading-relaxed">
                {isHindi
                  ? 'हार्ट अटैक अथवा गंभीर लक्षणों के लिए तुरंत 24/7 हेल्पलाइन पर संपर्क करें।'
                  : 'For acute emergencies, stroke signs, or severe trauma, call immediately:'}
              </p>
              <a
                href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/-/g, '')}`}
                className="mt-3 block text-center font-mono font-bold text-xs py-2 px-3 rounded-xl bg-emergency-600 text-white hover:bg-emergency-700 transition-colors"
              >
                {HOSPITAL_INFO.emergencyPhone}
              </a>
            </div>
          </motion.aside>
        </div>

        {/* ======================================================================= */}
        {/* 4. RELATED ARTICLES (Staggered 3-Card Cascade)                          */}
        {/* ======================================================================= */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200 dark:border-white/[0.08] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
                {t('blogPage.relatedArticles')}
              </h3>
              <Link
                to="/blog"
                className="text-xs font-bold text-medical-600 dark:text-medical-400 hover:underline flex items-center gap-1"
              >
                <span>{isHindi ? 'सभी लेख देखें' : 'View All Articles'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <motion.div
              variants={staggerContainer(0.12)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {relatedArticles.map((rel) => (
                <motion.div key={rel.id} variants={threeCardItem}>
                  <Card
                    className="overflow-hidden border-slate-200 dark:border-white/[0.08] bg-white dark:bg-navy-900 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group h-full"
                  >
                    <div>
                      <Link to={`/blog/${rel.slug}`} className="block relative h-40 overflow-hidden">
                        <img
                          src={rel.image}
                          alt={isHindi ? rel.hindiTitle : rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <Badge variant="medical" className="text-[10px] py-0.5 px-2 font-bold uppercase shadow-sm">
                            {isHindi ? rel.hindiCategoryName : rel.categoryName}
                          </Badge>
                        </div>
                      </Link>

                      <div className="p-4 space-y-2">
                        <span className="text-[11px] text-slate-400">
                          {isHindi ? rel.hindiReadTime : rel.readTime}
                        </span>
                        <h4 className="font-bold text-sm text-navy-950 dark:text-white line-clamp-2 group-hover:text-medical-600 transition-colors">
                          <Link to={`/blog/${rel.slug}`}>
                            {isHindi ? rel.hindiTitle : rel.title}
                          </Link>
                        </h4>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <Link
                        to={`/blog/${rel.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-medical-600 dark:text-medical-400 hover:underline"
                      >
                        <span>{isHindi ? 'पढ़ें' : 'Read Article'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}
      </main>
    </div>
  );
};
export default BlogDetailPage;
