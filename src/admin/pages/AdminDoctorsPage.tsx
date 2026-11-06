import React, { useState } from 'react';
import {
  Search,
  Plus,
  FileEdit,
  Trash2,
  Clock,
  Building2,
  X,
  Award,
} from 'lucide-react';
import { adminService } from '../services/adminService';
import { Doctor } from '../../data/hospitalData';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const AdminDoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(adminService.getDoctors());
  const [departments] = useState(adminService.getDepartments());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<{
    id?: string;
    name: string;
    hindiName: string;
    departmentId: string;
    department: string;
    hindiDepartment: string;
    specialization: string;
    hindiSpecialization: string;
    qualifications: string;
    experienceYears: number;
    experience: string;
    designation: string;
    image: string;
    opdTimings: string;
    room: string;
    isAvailableToday: boolean;
  }>({
    name: '',
    hindiName: '',
    departmentId: 'cardiology',
    department: 'Cardiology & Heart Care',
    hindiDepartment: 'कार्डियोलॉजी एवं हृदय रोग',
    specialization: '',
    hindiSpecialization: '',
    qualifications: '',
    experienceYears: 10,
    experience: '10+ Years',
    designation: 'Senior Consultant',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    opdTimings: '10:00 AM - 02:00 PM',
    room: 'OPD-101',
    isAvailableToday: true,
  });

  const reloadData = () => {
    setDoctors(adminService.getDoctors());
  };

  const filteredDoctors = doctors.filter((doc) => {
    const matchesDept = selectedDept === 'all' || doc.departmentId === selectedDept;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      doc.name.toLowerCase().includes(q) ||
      doc.specialization.toLowerCase().includes(q) ||
      doc.qualifications.toLowerCase().includes(q);
    return matchesDept && matchesSearch;
  });

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData({
      id: `doc-${Date.now()}`,
      name: '',
      hindiName: '',
      departmentId: departments[0]?.id || 'cardiology',
      department: departments[0]?.name || 'Cardiology & Heart Care',
      hindiDepartment: departments[0]?.hindiName || 'कार्डियोलॉजी एवं हृदय रोग',
      specialization: '',
      hindiSpecialization: '',
      qualifications: '',
      experienceYears: 10,
      experience: '10+ Years',
      designation: 'Senior Consultant',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
      opdTimings: '10:00 AM - 02:00 PM',
      room: 'OPD-105',
      isAvailableToday: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (doc: Doctor) => {
    setIsEditing(true);
    setFormData({
      id: doc.id,
      name: doc.name,
      hindiName: doc.hindiName,
      departmentId: doc.departmentId,
      department: doc.department,
      hindiDepartment: doc.hindiDepartment,
      specialization: doc.specialization,
      hindiSpecialization: doc.hindiSpecialization,
      qualifications: doc.qualifications,
      experienceYears: doc.experienceYears,
      experience: doc.experience,
      designation: doc.designation,
      image: doc.image,
      opdTimings: doc.opdTimings,
      room: doc.schedule[0]?.room || 'OPD-101',
      isAvailableToday: doc.isAvailableToday !== false,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove Dr. ${name}?`)) {
      adminService.deleteDoctor(id);
      reloadData();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.qualifications) return;

    const matchedDept = departments.find((d) => d.id === formData.departmentId);

    const completeDoctor: Doctor = {
      id: formData.id || `doc-${Date.now()}`,
      name: formData.name,
      hindiName: formData.hindiName || formData.name,
      departmentId: formData.departmentId,
      department: matchedDept?.name || formData.department,
      hindiDepartment: matchedDept?.hindiName || formData.hindiDepartment,
      specialization: formData.specialization,
      hindiSpecialization: formData.hindiSpecialization || formData.specialization,
      qualifications: formData.qualifications,
      experienceYears: formData.experienceYears || 5,
      experience: `${formData.experienceYears || 5}+ Years`,
      hindiExperience: `${formData.experienceYears || 5}+ वर्ष अनुभव`,
      designation: formData.designation || 'Specialist Consultant',
      hindiDesignation: 'वरिष्ठ परामर्शदाता',
      image: formData.image,
      bio: `${formData.name} is a specialist in ${formData.specialization}.`,
      hindiBio: `${formData.hindiName || formData.name} विशेषज्ञ चिकित्सक हैं।`,
      expertise: ['Specialist Consultations', 'Diagnostic Evaluation', 'Patient Care'],
      hindiExpertise: ['विशेषज्ञ परामर्श', 'डायग्नोस्टिक जांच'],
      languagesSpoken: ['Hindi', 'English'],
      hindiLanguagesSpoken: ['हिन्दी', 'अंग्रेजी'],
      opdTimings: formData.opdTimings,
      hindiOpdTimings: formData.opdTimings,
      availabilityDays: ['Mon', 'Wed', 'Fri'],
      isAvailableToday: formData.isAvailableToday,
      schedule: [
        {
          day: 'Monday - Friday',
          hindiDay: 'सोमवार - शुक्रवार',
          time: formData.opdTimings,
          hindiTime: formData.opdTimings,
          room: formData.room,
        },
      ],
    };

    adminService.saveDoctor(completeDoctor);
    reloadData();
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Specialist Doctor Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage clinical profiles, degrees, OPD schedules, room chambers, and booking availability.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
          Add New Doctor
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
            placeholder="Search doctors by name, specialization, or qualification..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-medical-500"
          />
        </div>

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500"
        >
          <option value="all">All Departments ({doctors.length})</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
      </Card>

      {/* 3. Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDoctors.map((doc) => (
          <Card
            key={doc.id}
            className="p-5 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-3.5">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-slate-200 dark:border-white/[0.08]"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <Badge variant={doc.isAvailableToday !== false ? 'success' : 'neutral'} className="text-[10px] px-2 py-0">
                      {doc.isAvailableToday !== false ? 'Available' : 'On Leave'}
                    </Badge>
                    <span className="text-xs font-bold text-medical-600 dark:text-medical-400">
                      {doc.experience}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-navy-950 dark:text-white mt-1 truncate">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {doc.specialization}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.06] space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-medical-500 shrink-0" />
                  <span className="truncate">{doc.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                  <span className="truncate">{doc.qualifications}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">{doc.opdTimings} ({doc.schedule[0]?.room || 'OPD-101'})</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenEdit(doc)}
                leftIcon={<FileEdit className="w-3.5 h-3.5" />}
                className="text-xs py-1"
              >
                Edit Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(doc.id, doc.name)}
                className="text-xs py-1 text-red-500 hover:text-white hover:bg-red-500"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* 4. Add / Edit Doctor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <Card className="w-full max-w-2xl p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-2xl rounded-2xl relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-base sm:text-lg font-bold text-navy-950 dark:text-white">
              {isEditing ? `Edit Profile • ${formData.name}` : 'Register New Specialist Doctor'}
            </h2>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Doctor Name (English)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Doctor Name (Hindi / हिन्दी)
                  </label>
                  <input
                    type="text"
                    value={formData.hindiName}
                    onChange={(e) => setFormData({ ...formData, hindiName: e.target.value })}
                    placeholder="e.g. डॉ. राजेश शर्मा"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Department
                  </label>
                  <select
                    value={formData.departmentId}
                    onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                  >
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Qualifications & Degrees
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.qualifications}
                    onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                    placeholder="e.g. MBBS, MD (Med), DM (Cardiology)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Specialization (English)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    placeholder="e.g. Senior Interventional Cardiologist"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Specialization (Hindi / हिन्दी)
                  </label>
                  <input
                    type="text"
                    value={formData.hindiSpecialization}
                    onChange={(e) => setFormData({ ...formData, hindiSpecialization: e.target.value })}
                    placeholder="e.g. वरिष्ठ हृदय रोग विशेषज्ञ"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    OPD Timings
                  </label>
                  <input
                    type="text"
                    value={formData.opdTimings}
                    onChange={(e) => setFormData({ ...formData, opdTimings: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    OPD Room Number
                  </label>
                  <input
                    type="text"
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Photograph URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.isAvailableToday}
                    onChange={(e) => setFormData({ ...formData, isAvailableToday: e.target.checked })}
                    className="w-4 h-4 rounded text-medical-600"
                  />
                  <span>Active & Available for Online Appointments</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-white/[0.06]">
                <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  {isEditing ? 'Update Doctor Profile' : 'Save Doctor'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
export default AdminDoctorsPage;
