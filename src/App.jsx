import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { PublicPortfolio } from './pages/PublicPortfolio';
import { StudioLogin } from './admin/pages/StudioLogin';
import { StudioLayout } from './admin/components/StudioLayout';
import { ProtectedStudioRoute } from './admin/components/ProtectedStudioRoute';

import { StudioDashboard } from './admin/pages/StudioDashboard';
import { ManageAbout } from './admin/pages/ManageAbout';
import { ManageSkills } from './admin/pages/ManageSkills';
import { ManageProjects } from './admin/pages/ManageProjects';
import { ManageEducation } from './admin/pages/ManageEducation';
import { ManageCertificates } from './admin/pages/ManageCertificates';
import { ManageMessages } from './admin/pages/ManageMessages';
import { ManageResume } from './admin/pages/ManageResume';
import { ManageSettings } from './admin/pages/ManageSettings';
import { ActivityLogs } from './admin/pages/ActivityLogs';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Portfolio Route */}
        <Route path="/" element={<PublicPortfolio />} />

        {/* Studio Admin Routes */}
        <Route path="/studio/login" element={<StudioLogin />} />

        {/* Protected Studio Routes */}
        <Route element={<ProtectedStudioRoute />}>
          <Route path="/studio" element={<StudioLayout />}>
            <Route index element={<Navigate to="/studio/dashboard" replace />} />
            <Route path="dashboard" element={<StudioDashboard />} />
            <Route path="about" element={<ManageAbout />} />
            <Route path="skills" element={<ManageSkills />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="education" element={<ManageEducation />} />
            <Route path="certificates" element={<ManageCertificates />} />
            <Route path="messages" element={<ManageMessages />} />
            <Route path="resume" element={<ManageResume />} />
            <Route path="settings" element={<ManageSettings />} />
            <Route path="logs" element={<ActivityLogs />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
