import React, { useState } from 'react';
import {
  Plus,
  FileEdit,
  Users,
  Bed,
  Clock,
  X,
} from 'lucide-react';
import { adminService } from '../services/adminService';
import { Department } from '../../data/hospitalData';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const AdminDepartmentsPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(adminService.getDepartments());
  const [doctors] = useState(adminService.getDoctors());

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<{
    id?: string;
    name: string;
    hindiName: string;
    tagline: string;
    hindiTagline: string;
    image: string;
    stats: string;
    overview: string;
    hindiOverview: string;
  }>({
    name: '',
    hindiName: '',
    tagline: '',
    hindiTagline: '',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    stats: '24/7 Clinical Care',
    overview: '',
    hindiOverview: '',
  });

  const reloadData = () => {
    setDepartments(adminService.getDepartments());
  };

  const getDoctorCount = (deptId: string) => {
    return doctors.filter((d) => d.departmentId === deptId).length;
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData({
      id: `dept-${Date.now()}`,
      name: '',
      hindiName: '',
      tagline: 'Super Speciality Medical Excellence',
      hindiTagline: 'सुपर स्पेशलिटी चिकित्सा उत्कृष्टता',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
      stats: '24/7 ICU & Modular OT',
      overview: '',
      hindiOverview: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dept: Department) => {
    setIsEditing(true);
    setFormData({
      id: dept.id,
      name: dept.name,
      hindiName: dept.hindiName,
      tagline: dept.tagline,
      hindiTagline: dept.hindiTagline,
      image: dept.image,
      stats: dept.stats,
      overview: dept.overview,
      hindiOverview: dept.hindiOverview,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const existing = departments.find((d) => d.id === formData.id);

    const completeDept: Department = {
      id: formData.id || `dept-${Date.now()}`,
      name: formData.name,
      hindiName: formData.hindiName || formData.name,
      tagline: formData.tagline || 'Super Speciality Clinical Care',
      hindiTagline: formData.hindiTagline || 'सुपर स्पेशलिटी चिकित्सा',
      icon: existing?.icon || 'HeartPulse',
      image: formData.image,
      stats: formData.stats || 'Comprehensive Care',
      overview: formData.overview || `${formData.name} provides advanced clinical healthcare at Janhit Hospital.`,
      hindiOverview: formData.hindiOverview || `${formData.hindiName || formData.name} में अत्याधुनिक चिकित्सा सुविधा उपलब्ध है।`,
      keyHighlights: existing?.keyHighlights || ['24/7 Emergency Care', 'Experienced Specialists', 'Modular Care Units'],
      hindiKeyHighlights: existing?.hindiKeyHighlights || ['24/7 आपातकालीन सेवा', 'अनुभवी विशेषज्ञ डॉक्टर'],
      services: existing?.services || [
        {
          title: 'Specialist Outpatient Consultations',
          hindiTitle: 'विशेषज्ञ बाह्य रोगी परामर्श',
          description: 'Daily clinical consultations by senior super-specialists.',
          hindiDescription: 'वरिष्ठ सुपर-विशेषज्ञों द्वारा दैनिक क्लिनिकल परामर्श।',
        },
      ],
      conditionsTreated: existing?.conditionsTreated || [],
      procedures: existing?.procedures || [],
      treatmentsOffered: existing?.treatmentsOffered || ['Emergency Care', 'Inpatient Medical Care'],
      hindiTreatmentsOffered: existing?.hindiTreatmentsOffered || ['आपातकालीन देखभाल'],
      diagnosticFacilities: existing?.diagnosticFacilities || ['Digital Diagnostics', 'Ultrasound & Imaging'],
      hindiDiagnosticFacilities: existing?.hindiDiagnosticFacilities || ['डिजिटल डायग्नोस्टिक्स'],
      doctorIds: existing?.doctorIds || [],
      faqs: existing?.faqs || [],
    };

    adminService.saveDepartment(completeDept);
    reloadData();
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Clinical Departments & Centres of Excellence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure hospital divisions, key highlights, emergency protocols, and medical staff assignments.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
          Add Department
        </Button>
      </div>

      {/* 2. Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map((dept) => {
          const docCount = getDoctorCount(dept.id);

          return (
            <Card
              key={dept.id}
              className="overflow-hidden bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Banner Thumbnail */}
                <div className="relative h-36 w-full bg-slate-100 dark:bg-navy-950">
                  <img
                    src={dept.image}
                    alt={dept.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                      {dept.hindiName}
                    </span>
                    <h3 className="font-extrabold text-base truncate">
                      {dept.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {dept.tagline}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06] grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <Users className="w-3.5 h-3.5 text-medical-500" />
                      <span>{docCount} Specialists</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <Bed className="w-3.5 h-3.5 text-teal-500" />
                      <span>{dept.stats}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 col-span-2">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span className="truncate">08:00 AM - 08:00 PM (Daily OPD)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEdit(dept)}
                  leftIcon={<FileEdit className="w-3.5 h-3.5" />}
                  className="text-xs py-1"
                >
                  Edit Details
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 3. Add / Edit Department Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <Card className="w-full max-w-xl p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-2xl rounded-2xl relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-base sm:text-lg font-bold text-navy-950 dark:text-white">
              {isEditing ? `Edit Department • ${formData.name}` : 'Create Clinical Department'}
            </h2>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Department Name (English)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Cardiology & Heart Care"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Department Name (Hindi / हिन्दी)
                  </label>
                  <input
                    type="text"
                    value={formData.hindiName}
                    onChange={(e) => setFormData({ ...formData, hindiName: e.target.value })}
                    placeholder="e.g. हृदय रोग एवं कार्डियक सर्जरी"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tagline / Speciality Focus (English)
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Comprehensive cardiac care with digital cath lab..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Clinical Overview
                </label>
                <textarea
                  rows={3}
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  placeholder="Summary of medical capabilities and equipment..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Banner Image URL
                </label>
                <input
                  type="url"
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
                  {isEditing ? 'Save Changes' : 'Create Department'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
export default AdminDepartmentsPage;
