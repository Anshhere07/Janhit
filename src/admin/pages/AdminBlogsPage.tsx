import React, { useState } from 'react';
import {
  Plus,
  Search,
  FileEdit,
  Trash2,
  X,
} from 'lucide-react';
import { adminService, AdminBlogItem } from '../services/adminService';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const AdminBlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<AdminBlogItem[]>(adminService.getBlogs());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'en' | 'hi'>('en');

  const [formData, setFormData] = useState<Partial<AdminBlogItem>>({
    titleEn: '',
    titleHi: '',
    excerptEn: '',
    excerptHi: '',
    contentEn: '',
    contentHi: '',
    featuredImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
    author: 'Dr. Ramesh Sharma',
    categorySlug: 'heart-health',
    categoryName: 'Cardiovascular Wellness',
    readTime: '5 min read',
    status: 'PUBLISHED',
  });

  const reloadData = () => {
    setBlogs(adminService.getBlogs());
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q || b.titleEn.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.categoryName.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData({
      id: `blog-${Date.now()}`,
      slug: `article-${Date.now()}`,
      titleEn: '',
      titleHi: '',
      excerptEn: '',
      excerptHi: '',
      contentEn: '',
      contentHi: '',
      featuredImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
      author: 'Dr. Ramesh Sharma',
      categorySlug: 'heart-health',
      categoryName: 'Cardiovascular Wellness',
      readTime: '5 min read',
      publishedDate: new Date().toISOString().split('T')[0],
      status: 'PUBLISHED',
      viewCount: 0,
    });
    setActiveTab('en');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (blog: AdminBlogItem) => {
    setIsEditing(true);
    setFormData({ ...blog });
    setActiveTab('en');
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      adminService.deleteBlog(id);
      reloadData();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleEn) return;

    const completeBlog: AdminBlogItem = {
      ...(formData as AdminBlogItem),
      id: formData.id || `blog-${Date.now()}`,
      slug: formData.slug || formData.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      publishedDate: formData.publishedDate || new Date().toISOString().split('T')[0],
      viewCount: formData.viewCount || 0,
    };

    adminService.saveBlog(completeBlog);
    reloadData();
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Health Blog & Patient Education CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Author and publish doctor-verified medical articles with bilingual translations and SEO metadata.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
          Write New Article
        </Button>
      </div>

      {/* 2. Filters & Search */}
      <Card className="p-4 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, author, or medical topic..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-medical-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {(['ALL', 'PUBLISHED', 'DRAFT'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                statusFilter === st
                  ? 'bg-medical-600 text-white'
                  : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </Card>

      {/* 3. Blog List */}
      <div className="space-y-4">
        {filteredBlogs.map((blog) => (
          <Card
            key={blog.id}
            className="p-4 sm:p-5 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4 min-w-0 flex-1">
              <img
                src={blog.featuredImage}
                alt={blog.titleEn}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-white/[0.08]"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={blog.status === 'PUBLISHED' ? 'success' : 'neutral'} className="text-[10px] px-2 py-0">
                    {blog.status}
                  </Badge>
                  <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400">
                    {blog.categoryName}
                  </span>
                  <span className="text-[11px] text-slate-400">• {blog.readTime}</span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-navy-950 dark:text-white mt-1">
                  {blog.titleEn}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {blog.excerptEn}
                </p>
                <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-2">
                  <span>Author: {blog.author}</span>
                  <span>Published: {blog.publishedDate}</span>
                  <span>{blog.viewCount} views</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenEdit(blog)}
                leftIcon={<FileEdit className="w-3.5 h-3.5" />}
                className="text-xs py-1"
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(blog.id, blog.titleEn)}
                className="text-xs py-1 text-red-500 hover:text-white hover:bg-red-500"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* 4. Add / Edit Blog Modal with Bilingual Tabs */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <Card className="w-full max-w-3xl p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-2xl rounded-2xl relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-base sm:text-lg font-bold text-navy-950 dark:text-white">
              {isEditing ? `Edit Article • ${formData.titleEn}` : 'Compose Healthcare Article'}
            </h2>

            {/* Bilingual Version Switcher Tabs */}
            <div className="flex items-center gap-2 mt-4 border-b border-slate-200 dark:border-white/[0.08] pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'en'
                    ? 'bg-medical-600 text-white'
                    : 'text-slate-500 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                English Version
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('hi')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'hi'
                    ? 'bg-medical-600 text-white'
                    : 'text-slate-500 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                Hindi Version (हिन्दी)
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs sm:text-sm">
              {activeTab === 'en' ? (
                <>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Article Title (English)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.titleEn || ''}
                      onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                      placeholder="e.g. Warning Signs of Silent Heart Attacks"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Brief Excerpt (English)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.excerptEn || ''}
                      onChange={(e) => setFormData({ ...formData, excerptEn: e.target.value })}
                      placeholder="Short summary for preview cards..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Article Content (English Markdown)
                    </label>
                    <textarea
                      rows={6}
                      value={formData.contentEn || ''}
                      onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
                      placeholder="Full educational text, prevention steps, clinical insights..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white font-mono text-xs"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      लेख शीर्षक (हिन्दी / Hindi)
                    </label>
                    <input
                      type="text"
                      value={formData.titleHi || ''}
                      onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })}
                      placeholder="e.g. साइलेंट हार्ट अटैक: लक्षण एवं बचाव"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      संक्षिप्त विवरण (हिन्दी / Hindi)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.excerptHi || ''}
                      onChange={(e) => setFormData({ ...formData, excerptHi: e.target.value })}
                      placeholder="लेख का मुख्य सार..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      सम्पूर्ण लेख सामग्री (हिन्दी / Hindi)
                    </label>
                    <textarea
                      rows={6}
                      value={formData.contentHi || ''}
                      onChange={(e) => setFormData({ ...formData, contentHi: e.target.value })}
                      placeholder="विस्तृत स्वास्थ्य जानकारी..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white font-mono text-xs"
                    />
                  </div>
                </>
              )}

              {/* Shared Metadata Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Author / Reviewer
                  </label>
                  <input
                    type="text"
                    value={formData.author || ''}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Publish Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as AdminBlogItem['status'] })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                  >
                    <option value="PUBLISHED">Published (Live)</option>
                    <option value="DRAFT">Draft (Unpublished)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Read Duration
                  </label>
                  <input
                    type="text"
                    value={formData.readTime || '5 min read'}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  value={formData.featuredImage || ''}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-white/[0.06]">
                <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  {isEditing ? 'Save Article' : 'Publish Article'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
export default AdminBlogsPage;
