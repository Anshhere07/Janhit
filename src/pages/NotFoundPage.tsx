import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Home, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { fadeInUp } from '../utils/animations';

export const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="py-24 sm:py-32 flex items-center justify-center">
      <Container size="sm">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center space-y-6"
        >
          <div className="w-20 h-20 rounded-2xl bg-medical-50 dark:bg-medical-950/60 text-medical-600 dark:text-medical-400 mx-auto flex items-center justify-center font-extrabold text-3xl font-mono border border-medical-200 dark:border-medical-800 shadow-sm">
            404
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white">
              Page Not Found
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              The healthcare page or service link you are looking for might have been moved or is currently being prepared for the next release phase.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <Link to="/">
              <Button variant="primary" leftIcon={<Home className="w-4 h-4" />}>
                {t('nav.home')}
              </Button>
            </Link>
            <Button
              variant="outline"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => window.history.back()}
            >
              {t('common.back')}
            </Button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

