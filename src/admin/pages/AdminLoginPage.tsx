import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ArrowRight, HeartPulse, AlertCircle } from 'lucide-react';
import { useAdminAuth, AdminRole } from '../context/AdminAuthContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, quickLoginAs, isAuthenticated } = useAdminAuth();

  const [email, setEmail] = useState('admin@janhithospital.com');
  const [password, setPassword] = useState('JanhitAdmin@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/admin', { replace: true });
      } else {
        setErrorMessage(result.message || 'Login failed. Please check credentials.');
      }
    } catch {
      setErrorMessage('Network or server error during sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemo = (role: AdminRole) => {
    quickLoginAs(role);
    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-medical-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Branding */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-medical-600 to-teal-500 text-white shadow-xl shadow-medical-900/50 mb-4">
            <HeartPulse className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Janhit Hospital
          </h1>
          <p className="mt-1 text-sm text-slate-400 font-medium">
            Staff & Clinical Administration Portal
          </p>
        </div>

        {/* Login Card */}
        <Card className="mt-8 p-6 sm:p-8 bg-navy-950/80 border-white/[0.08] backdrop-blur-xl shadow-2xl rounded-2xl">
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@janhithospital.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/[0.08] text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-medical-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-navy-900 border border-white/[0.08] text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-medical-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
              className="w-full mt-2"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {isSubmitting ? 'Verifying Credentials...' : 'Sign In to Portal'}
            </Button>
          </form>

          {/* Quick Demo Access Pills */}
          <div className="mt-6 pt-5 border-t border-white/[0.08]">
            <span className="text-[11px] font-semibold text-slate-400 block mb-2.5 uppercase tracking-wider text-center">
              Quick Role Switch (Demo Credentials)
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemo('ADMIN')}
                className="p-2 rounded-lg bg-navy-900 hover:bg-medical-600/30 border border-white/[0.08] text-slate-300 hover:text-white transition-all text-left"
              >
                <span className="font-bold text-white block">Hospital Admin</span>
                <span className="text-[10px] text-slate-400 block">Dr. Anita Desai</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('SUPER_ADMIN')}
                className="p-2 rounded-lg bg-navy-900 hover:bg-teal-600/30 border border-white/[0.08] text-slate-300 hover:text-white transition-all text-left"
              >
                <span className="font-bold text-white block">Super Admin</span>
                <span className="text-[10px] text-slate-400 block">Dr. Ramesh Sharma</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('RECEPTIONIST')}
                className="p-2 rounded-lg bg-navy-900 hover:bg-emerald-600/30 border border-white/[0.08] text-slate-300 hover:text-white transition-all text-left"
              >
                <span className="font-bold text-white block">Reception Desk</span>
                <span className="text-[10px] text-slate-400 block">Sunita Verma</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('CONTENT_EDITOR')}
                className="p-2 rounded-lg bg-navy-900 hover:bg-purple-600/30 border border-white/[0.08] text-slate-300 hover:text-white transition-all text-left"
              >
                <span className="font-bold text-white block">Content Editor</span>
                <span className="text-[10px] text-slate-400 block">Vikram Seth</span>
              </button>
            </div>
          </div>
        </Card>

        {/* Return to Public Hospital Site */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs font-semibold text-slate-400 hover:text-teal-400 transition-colors inline-flex items-center gap-1.5"
          >
            <span>&larr; Return to Janhit Hospital Public Site</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AdminLoginPage;
