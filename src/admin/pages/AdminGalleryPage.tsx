import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Eye,
  X,
} from 'lucide-react';
import { GALLERY_CATEGORIES, GALLERY_ITEMS, GalleryMediaItem } from '../../data/galleryData';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const AdminGalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryMediaItem[]>(GALLERY_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modal State for Add
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    hindiTitle: string;
    categoryId: string;
    image: string;
    description: string;
    hindiDescription: string;
    featured: boolean;
  }>({
    title: '',
    hindiTitle: '',
    categoryId: 'building',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80',
    description: '',
    hindiDescription: '',
    featured: false,
  });

  const filteredItems = items.filter((item) => {
    return selectedCategory === 'all' || item.categoryId === selectedCategory;
  });

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete "${title}" from the gallery?`)) {
      setItems((prev) => prev.filter((it) => it.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.image) return;

    const matchedCat = GALLERY_CATEGORIES.find((c) => c.id === formData.categoryId);

    const newItem: GalleryMediaItem = {
      id: `img-${Date.now()}`,
      title: formData.title,
      hindiTitle: formData.hindiTitle || formData.title,
      categoryId: formData.categoryId,
      categoryName: matchedCat?.name || 'Hospital Building',
      hindiCategoryName: matchedCat?.hindiName || 'अस्पताल भवन',
      image: formData.image,
      thumbnail: formData.image,
      description: formData.description || formData.title,
      hindiDescription: formData.hindiDescription || formData.hindiTitle || formData.title,
      altText: formData.title,
      hindiAltText: formData.hindiTitle || formData.title,
      featured: Boolean(formData.featured),
    };

    setItems((prev) => [newItem, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Hospital Visual Media & Gallery Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Curate verified hospital photography across all 9 approved infrastructure categories.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Upload New Image
        </Button>
      </div>

      {/* 2. Category Filter Pills */}
      <Card className="p-3 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm overflow-x-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-medical-600 text-white'
                : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:text-white'
            }`}
          >
            All Categories ({items.length})
          </button>
          {GALLERY_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
            const count = items.filter((it) => it.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-medical-600 text-white'
                    : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:text-white'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </Card>

      {/* 3. Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col justify-between group"
          >
            <div className="relative h-44 w-full bg-slate-100 dark:bg-navy-950 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2">
                <Badge variant="accent" className="text-[10px] px-2 py-0 uppercase font-bold">
                  {item.categoryName}
                </Badge>
              </div>
            </div>

            <div className="p-3.5">
              <h3 className="font-bold text-xs sm:text-sm text-navy-950 dark:text-white line-clamp-1">
                {item.title}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                {item.hindiTitle}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                <a
                  href={item.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-medical-600 dark:text-medical-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </a>

                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="text-xs text-red-500 hover:text-red-700 p-1 rounded"
                  title="Remove from Gallery"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 4. Add Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <Card className="w-full max-w-lg p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-2xl rounded-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-base sm:text-lg font-bold text-navy-950 dark:text-white">
              Add Verified Hospital Image
            </h2>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                >
                  {GALLERY_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.hindiName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Image Caption / Title (English)
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Modern Level-3 NICU Care Station"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Image Caption / Title (Hindi / हिन्दी)
                </label>
                <input
                  type="text"
                  value={formData.hindiTitle}
                  onChange={(e) => setFormData({ ...formData, hindiTitle: e.target.value })}
                  placeholder="e.g. आधुनिक लेवल-3 एनआईसीयू कक्ष"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  High-Resolution Image URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-white/[0.06]">
                <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save to Gallery
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
export default AdminGalleryPage;
