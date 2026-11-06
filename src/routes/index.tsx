import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { useLanguage } from '../hooks/useLanguage';
import { RouteLoadingFallback } from '../components/common/RouteLoadingFallback';

// 1. Critical Public Routes: Eagerly imported to eliminate Suspense delays and ensure instant navigation on first click
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { DoctorsPage } from '../pages/DoctorsPage';
import { DepartmentsPage } from '../pages/DepartmentsPage';
import { TreatmentsPage } from '../pages/TreatmentsPage';
import { FacilitiesPage } from '../pages/FacilitiesPage';
import { AppointmentPage } from '../pages/AppointmentPage';
import { GalleryPage } from '../pages/GalleryPage';
import { ContactPage } from '../pages/ContactPage';

// 2. Secondary Detail Routes: Code-split via React.lazy
const DoctorProfilePage = lazy(() => import('../pages/DoctorProfilePage').then((m) => ({ default: m.DoctorProfilePage })));
const DepartmentDetailPage = lazy(() => import('../pages/DepartmentDetailPage').then((m) => ({ default: m.DepartmentDetailPage })));
const TreatmentDetailPage = lazy(() => import('../pages/TreatmentDetailPage').then((m) => ({ default: m.TreatmentDetailPage })));
const FacilityDetailPage = lazy(() => import('../pages/FacilityDetailPage').then((m) => ({ default: m.FacilityDetailPage })));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));
const PlaceholderPage = lazy(() => import('../pages/PlaceholderPage').then((m) => ({ default: m.PlaceholderPage })));

// 3. Admin Portal Routes: Code-split to minimize main bundle footprint
const AdminProtectedRoute = lazy(() => import('../admin/components/AdminProtectedRoute').then((m) => ({ default: m.AdminProtectedRoute })));
const AdminLayout = lazy(() => import('../admin/AdminLayout').then((m) => ({ default: m.AdminLayout })));
const AdminLoginPage = lazy(() => import('../admin/pages/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('../admin/pages/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })));
const AdminAppointmentsPage = lazy(() => import('../admin/pages/AdminAppointmentsPage').then((m) => ({ default: m.AdminAppointmentsPage })));
const AdminDoctorsPage = lazy(() => import('../admin/pages/AdminDoctorsPage').then((m) => ({ default: m.AdminDoctorsPage })));
const AdminDepartmentsPage = lazy(() => import('../admin/pages/AdminDepartmentsPage').then((m) => ({ default: m.AdminDepartmentsPage })));
const AdminBlogsPage = lazy(() => import('../admin/pages/AdminBlogsPage').then((m) => ({ default: m.AdminBlogsPage })));
const AdminGalleryPage = lazy(() => import('../admin/pages/AdminGalleryPage').then((m) => ({ default: m.AdminGalleryPage })));
const AdminEnquiriesPage = lazy(() => import('../admin/pages/AdminEnquiriesPage').then((m) => ({ default: m.AdminEnquiriesPage })));
const AdminSettingsPage = lazy(() => import('../admin/pages/AdminSettingsPage').then((m) => ({ default: m.AdminSettingsPage })));
const AdminAuditLogsPage = lazy(() => import('../admin/pages/AdminAuditLogsPage').then((m) => ({ default: m.AdminAuditLogsPage })));

const LanguageSyncWrapper: React.FC<{ lang: 'hi' | 'en' }> = ({ lang }) => {
  const { language, setLanguage } = useLanguage();
  useEffect(() => {
    if (language !== lang) {
      setLanguage(lang);
    }
  }, [lang, language, setLanguage]);

  return <Outlet />;
};

const renderPublicRoutes = () => (
  <>
    {/* Main Landing & Global Architecture (Direct Eager Load for 0ms LCP) */}
    <Route index element={<HomePage />} />

    {/* Primary Public Pages: Eager loaded to ensure instantaneous transition without Suspense delays */}
    <Route path="about" element={<AboutPage />} />
    <Route path="doctors" element={<DoctorsPage />} />
    <Route
      path="doctors/:id"
      element={
        <Suspense fallback={<RouteLoadingFallback />}>
          <DoctorProfilePage />
        </Suspense>
      }
    />

    <Route path="departments" element={<DepartmentsPage />} />
    <Route
      path="departments/:id"
      element={
        <Suspense fallback={<RouteLoadingFallback />}>
          <DepartmentDetailPage />
        </Suspense>
      }
    />

    <Route path="treatments" element={<TreatmentsPage />} />
    <Route
      path="treatments/:id"
      element={
        <Suspense fallback={<RouteLoadingFallback />}>
          <TreatmentDetailPage />
        </Suspense>
      }
    />

    <Route path="facilities" element={<FacilitiesPage />} />
    <Route
      path="facilities/:id"
      element={
        <Suspense fallback={<RouteLoadingFallback />}>
          <FacilityDetailPage />
        </Suspense>
      }
    />

    <Route path="appointment" element={<AppointmentPage />} />
    <Route path="book-appointment" element={<AppointmentPage />} />

    {/* Redirect removed routes cleanly to avoid 404s */}
    <Route path="patient-corner" element={<Navigate to="/" replace />} />
    <Route path="patient-corner/*" element={<Navigate to="/" replace />} />
    <Route path="blog" element={<Navigate to="/" replace />} />
    <Route path="blog/*" element={<Navigate to="/" replace />} />

    <Route path="gallery" element={<GalleryPage />} />
    <Route path="contact" element={<ContactPage />} />

    <Route
      path="emergency"
      element={
        <Suspense fallback={<RouteLoadingFallback />}>
          <PlaceholderPage
            title="24/7 Emergency, Trauma & Mobile ICU"
            hindiTitle="24/7 इमरजेंसी, ट्रॉमा एवं एम्बुलेंस सेवा"
            subtitle="Immediate life-saving response, triage, stroke protocols, and trauma resuscitation."
            hindiSubtitle="त्वरित जीवन रक्षक सेवा, ट्राइएज, स्ट्रोक केयर एवं एम्बुलेंस सहायता।"
            phaseScheduled="Phase 05 (Emergency Systems)"
            badgeText="Critical Care Active"
          />
        </Suspense>
      }
    />

    <Route
      path="privacy"
      element={
        <Suspense fallback={<RouteLoadingFallback />}>
          <PlaceholderPage
            title="Patient Privacy Policy"
            hindiTitle="मरीज गोपनीयता नीति"
            subtitle="Protecting your electronic medical records and personal health information."
            hindiSubtitle="आपकी मेडिकल रिपोर्ट्स और निजी जानकारी की सुरक्षा के नियम।"
            phaseScheduled="Governance & Compliance"
          />
        </Suspense>
      }
    />
    <Route
      path="terms"
      element={
        <Suspense fallback={<RouteLoadingFallback />}>
          <PlaceholderPage
            title="Terms & Conditions"
            hindiTitle="नियम व शर्तें"
            subtitle="Terms governing healthcare consultations, payments, and online service utilization."
            hindiSubtitle="चिकित्सा सेवाओं और ऑनलाइन पोर्टल उपयोग के नियम व शर्तें।"
            phaseScheduled="Governance & Compliance"
          />
        </Suspense>
      }
    />
  </>
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 1. Default Public Routes (Root URL Architecture) */}
      <Route path="/" element={<MainLayout />}>
        {renderPublicRoutes()}
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>

      {/* 2. Explicit Hindi Language Prefix (/hi/...) */}
      <Route path="/hi" element={<LanguageSyncWrapper lang="hi" />}>
        <Route element={<MainLayout />}>
          {renderPublicRoutes()}
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Route>

      {/* 3. Explicit English Language Prefix (/en/...) */}
      <Route path="/en" element={<LanguageSyncWrapper lang="en" />}>
        <Route element={<MainLayout />}>
          {renderPublicRoutes()}
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Route>

      {/* ========================================================================= */}
      {/* HOSPITAL ADMIN PORTAL (PHASE 12)                                         */}
      {/* ========================================================================= */}
      {/* 1. Admin Authentication Login */}
      <Route
        path="/admin/login"
        element={
          <Suspense fallback={<RouteLoadingFallback />}>
            <AdminLoginPage />
          </Suspense>
        }
      />

      {/* 2. Protected Admin Dashboard Shell */}
      <Route
        path="/admin"
        element={
          <Suspense fallback={<RouteLoadingFallback />}>
            <AdminProtectedRoute />
          </Suspense>
        }
      >
        <Route
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <AdminDashboardPage />
              </Suspense>
            }
          />
          <Route
            path="appointments"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <AdminAppointmentsPage />
              </Suspense>
            }
          />
          <Route
            path="doctors"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <AdminDoctorsPage />
              </Suspense>
            }
          />
          <Route
            path="departments"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <AdminDepartmentsPage />
              </Suspense>
            }
          />
          <Route
            path="blogs"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <AdminBlogsPage />
              </Suspense>
            }
          />
          <Route
            path="gallery"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <AdminGalleryPage />
              </Suspense>
            }
          />
          <Route
            path="enquiries"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <AdminEnquiriesPage />
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <AdminSettingsPage />
              </Suspense>
            }
          />
          <Route
            path="audit-logs"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <AdminAuditLogsPage />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};
