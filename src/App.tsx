import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import { AppRoutes } from './routes';
import { InitialWebsiteLoader } from './components/common/InitialWebsiteLoader';
import { ScrollToTop } from './components/common/ScrollToTop';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AdminAuthProvider>
          {/* 1. Full-screen initial startup healthcare loader */}
          <InitialWebsiteLoader />

          {/* 2. Client-side router with route-change scroll reset */}
          <BrowserRouter>
            <ScrollToTop />
            <AppRoutes />
          </BrowserRouter>
        </AdminAuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
