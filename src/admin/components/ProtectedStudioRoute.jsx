import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import api from '../services/api';

export const ProtectedStudioRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await api.get('/auth/me');
        if (res.data && res.data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    verifySession();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-bgDark flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-primaryBlue border-t-accentSky rounded-full animate-spin" />
          <span className="text-xs font-mono text-textMuted uppercase tracking-widest">
            Authenticating Studio Session...
          </span>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/studio/login" replace />;
};
