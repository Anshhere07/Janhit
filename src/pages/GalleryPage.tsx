import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ChevronRight,
  ChevronLeft,
  X,
  Camera,
  PlayCircle,
  Eye,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  GALLERY_VIDEOS,
  GalleryMediaItem,
  GalleryVideoItem,
} from '../data/galleryData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportStandard } from '../utils/animations';
import { getResponsiveSrcSet } from '../utils/imageUtils';

type GalleryMode = 'photos' | 'videos';

export const GalleryPage: React.FC = () => {
  const { language, t } = useLanguage();
  const isHindi = language === 'hi';
  const [searchParams, setSearchParams] = useSearchParams();

  const modeParam = (searchParams.get('mode') as GalleryMode) || 'photos';
  const categoryParam = searchParams.get('category') || 'all';

  const [activeMode, setActiveMode] = useState<GalleryMode>(modeParam);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);

  // Lightbox Modal State
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [lightboxImgLoaded, setLightboxImgLoaded] = useState<boolean>(false);

  // Reset lightbox loading spinner on index change
  useEffect(() => {
    setLightboxImgLoaded(false);
  }, [activeLightboxIndex]);

  // Video Modal State
  const [activeVideo, setActiveVideo] = useState<GalleryVideoItem | null>(null);

  // Filter photos based on category
  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.categoryId === selectedCategory);
  }, [selectedCategory]);

  const currentLightboxItem: GalleryMediaItem | null = useMemo(() => {
    if (activeLightboxIndex === null) return null;
    return filteredPhotos[activeLightboxIndex] || null;
  }, [activeLightboxIndex, filteredPhotos]);

  // Navigate lightbox
  const handlePrevImage = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev! > 0 ? prev! - 1 : filteredPhotos.length - 1
    );
  }, [activeLightboxIndex, filteredPhotos.length]);

  const handleNextImage = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev! < filteredPhotos.length - 1 ? prev! + 1 : 0
    );
  }, [activeLightboxIndex, filteredPhotos.length]);

  const handleCloseLightbox = useCallback(() => {
    setActiveLightboxIndex(null);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex !== null) {
        if (e.key === 'Escape') handleCloseLightbox();
        if (e.key === 'ArrowLeft') handlePrevImage();
        if (e.key === 'ArrowRight') handleNextImage();
      }
      if (activeVideo !== null && e.key === 'Escape') {
        setActiveVideo(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, activeVideo, handleCloseLightbox, handlePrevImage, handleNextImage]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (activeLightboxIndex !== null || activeVideo !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeLightboxIndex, activeVideo]);

  const handleModeChange = (mode: GalleryMode) => {
    setActiveMode(mode);
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      updated.set('mode', mode);
      return updated;
    });
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      if (catId === 'all') {
        updated.delete('category');
      } else {
        updated.set('category', catId);
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-navy-950 pb-24">
      {/* ========================================================================= */}
      {/* GALLERY CONTROLS (DIRECTLY BELOW NAVBAR)                                  */}
      {/* ========================================================================= */}
      <section className="relative pt-6 sm:pt-8 pb-4 bg-gradient-to-b from-medical-50/50 via-white to-slate-50/70 dark:from-navy-900/60 dark:via-navy-950 dark:to-navy-950 border-b border-slate-200/80 dark:border-white/[0.08] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Mode Tabs (Photos vs Video Tours) */}
          <div className="flex items-center gap-2 p-1.5 bg-white/90 dark:bg-navy-900/90 backdrop-blur-md rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-sm w-fit">
            <button
              type="button"
              onClick={() => handleModeChange('photos')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${activeMode === 'photos'
                ? 'bg-medical-600 text-white shadow-md shadow-medical-600/25'
                : 'text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                }`}
            >
              <Camera className="w-4 h-4" />
              <span>{t('galleryPage.tabPhotos')}</span>
            </button>

            <button
              type="button"
              onClick={() => handleModeChange('videos')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${activeMode === 'videos'
                ? 'bg-medical-600 text-white shadow-md shadow-medical-600/25'
                : 'text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                }`}
            >
              <PlayCircle className="w-4 h-4" />
              <span>{t('galleryPage.tabVideos')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CATEGORY FILTER BAR (FOR PHOTOS)                                       */}
      {/* ========================================================================= */}
      {activeMode === 'photos' && (
        <section className="sticky top-20 z-20 bg-white/95 dark:bg-navy-900/95 backdrop-blur-md border-b border-slate-200 dark:border-white/[0.08] shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 overflow-x-auto py-3.5 no-scrollbar">
              {GALLERY_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count =
                  cat.id === 'all'
                    ? GALLERY_ITEMS.length
                    : GALLERY_ITEMS.filter((i) => i.categoryId === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${isActive
                      ? 'bg-medical-600 text-white shadow-md shadow-medical-600/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                      }`}
                  >
                    <span>{isHindi ? cat.hindiName : cat.name}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.2 rounded-full ${isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-navy-800 text-slate-500 dark:text-slate-400'
                        }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. MAIN GALLERY CONTENT                                                   */}
      {/* ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* ======================================================================= */}
        {/* VIEW 1: RESPONSIVE PHOTO GRID                                           */}
        {/* ======================================================================= */}
        {activeMode === 'photos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>
                {t('galleryPage.showingMedia').replace('{count}', filteredPhotos.length.toString())}
              </span>
              <span>{isHindi ? 'तस्वीर पर क्लिक कर बड़ा देखें' : 'Click any photo to enlarge in lightbox'}</span>
            </div>

            {filteredPhotos.length > 0 ? (
              <motion.div
                variants={staggerContainer(0.05)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportStandard}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {filteredPhotos.map((item, index) => (
                  <motion.div key={item.id} variants={fadeInUp} className="flex flex-col h-full">
                    <Card
                      className="overflow-hidden border-slate-200 dark:border-white/[0.08] bg-white dark:bg-navy-900 shadow-sm hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer h-full flex flex-col justify-between"
                      onClick={() => setActiveLightboxIndex(index)}
                    >
                      {/* Image Area with hover overlay */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-navy-950">
                        <img
                          src={item.thumbnail}
                          alt={isHindi ? item.hindiAltText : item.altText}
                          loading="lazy"
                          decoding="async"
                          srcSet={getResponsiveSrcSet(item.thumbnail)}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            <Eye className="w-6 h-6" />
                          </div>
                        </div>

                        <div className="absolute top-3 left-3">
                          <Badge variant="medical" className="text-[10px] py-0.5 px-2 font-bold uppercase shadow-sm">
                            {isHindi ? item.hindiCategoryName : item.categoryName}
                          </Badge>
                        </div>
                      </div>

                      {/* Captions */}
                      <div className="p-5 space-y-1.5">
                        <h3 className="font-bold text-base text-navy-950 dark:text-white leading-snug group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors">
                          {isHindi ? item.hindiTitle : item.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {isHindi ? item.hindiDescription : item.description}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="py-16 text-center rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/[0.08]">
                <Camera className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  {t('galleryPage.noMediaFound')}
                </h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                  className="mt-4"
                >
                  {isHindi ? 'सभी तस्वीरें देखें' : 'View All Media'}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================================= */}
        {/* VIEW 2: DEDICATED VIDEO GALLERY                                         */}
        {/* ======================================================================= */}
        {activeMode === 'videos' && (
          <div className="space-y-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-navy-950 dark:text-white">
                {isHindi ? 'वर्चुअल वीडियो टूर एवं सर्जिकल प्रक्रियाएं' : 'Hospital Video Tours & Clinical Showcases'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {t('galleryPage.videoDisclaimer')}
              </p>
            </div>

            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {GALLERY_VIDEOS.map((vid) => (
                <motion.div key={vid.id} variants={fadeInUp} className="flex flex-col h-full">
                  <Card
                    className="overflow-hidden border-slate-200 dark:border-white/[0.08] bg-white dark:bg-navy-900 shadow-sm hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer h-full flex flex-col justify-between"
                    onClick={() => setActiveVideo(vid)}
                  >
                    {/* Video Thumbnail with Play Button */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-black">
                      <img
                        src={vid.thumbnail}
                        alt={isHindi ? vid.hindiTitle : vid.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 opacity-80 group-hover:opacity-90 transition-all duration-500"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-medical-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-medical-500 transition-all">
                          <PlayCircle className="w-8 h-8 fill-white/20" />
                        </div>
                      </div>

                      <div className="absolute top-3 left-3">
                        <Badge variant="accent" className="text-[10px] py-0.5 px-2 font-bold uppercase shadow-sm">
                          {isHindi ? vid.hindiCategory : vid.category}
                        </Badge>
                      </div>

                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/80 text-white font-mono text-xs font-semibold">
                        {vid.duration}
                      </div>
                    </div>

                    {/* Video Details */}
                    <div className="p-6 space-y-2">
                      <h3 className="font-bold text-base sm:text-lg text-navy-950 dark:text-white leading-snug group-hover:text-medical-600 transition-colors">
                        {isHindi ? vid.hindiTitle : vid.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {isHindi ? vid.hindiDescription : vid.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 4. IMAGE LIGHTBOX MODAL                                                   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {currentLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseLightbox}
              className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
              aria-label={t('galleryPage.closeLightbox')}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none hidden sm:flex items-center justify-center"
              aria-label={t('galleryPage.prevImage')}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none hidden sm:flex items-center justify-center"
              aria-label={t('galleryPage.nextImage')}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Frame */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            >
              <div className="relative max-h-[70vh] min-h-[280px] sm:min-h-[360px] w-full flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl bg-black/40">
                {!lightboxImgLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-sm z-10">
                    <div className="w-9 h-9 rounded-full border-2 border-white/20 border-t-teal-400 animate-spin" />
                  </div>
                )}
                <img
                  src={currentLightboxItem.image}
                  alt={isHindi ? currentLightboxItem.hindiAltText : currentLightboxItem.altText}
                  onLoad={() => setLightboxImgLoaded(true)}
                  className={`max-h-[70vh] w-auto max-w-full object-contain mx-auto transition-opacity duration-300 ${
                    lightboxImgLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>

              {/* Captions Strip */}
              <div className="mt-4 text-center max-w-2xl px-4 text-white space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[11px] font-mono text-white/60">
                    {activeLightboxIndex! + 1} / {filteredPhotos.length}
                  </span>
                  <Badge variant="medical" className="text-[10px] py-0 px-2 uppercase">
                    {isHindi ? currentLightboxItem.hindiCategoryName : currentLightboxItem.categoryName}
                  </Badge>
                </div>
                <h3 className="font-bold text-lg sm:text-xl text-white">
                  {isHindi ? currentLightboxItem.hindiTitle : currentLightboxItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {isHindi ? currentLightboxItem.hindiDescription : currentLightboxItem.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 5. VIDEO MODAL PLAYER                                                     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6"
          >
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl w-full space-y-4"
            >
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={isHindi ? activeVideo.hindiTitle : activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
              <div className="text-white space-y-1">
                <h3 className="text-lg font-bold">
                  {isHindi ? activeVideo.hindiTitle : activeVideo.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {isHindi ? activeVideo.hindiDescription : activeVideo.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default GalleryPage;

