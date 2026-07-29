import React, { createContext, useContext, useState } from 'react';

// Static Portfolio Data
import { developerInfo } from '../data/developerInfo';
import { projectsData } from '../data/projectsData';
import { skillsData } from '../data/skillsData';
import { educationData } from '../data/educationData';
import { certificatesData } from '../data/certificatesData';

const PortfolioContext = createContext(null);

const formatFileUrl = (url) => {
  if (!url) return '/assets/gowtham-profile.jpg';
  return url;
};

export const PortfolioProvider = ({ children }) => {
  const [portfolioData] = useState({
    about: {
      ...developerInfo,
      profile_image_url: developerInfo.profile_image_url || '/assets/gowtham-profile.jpg',
      github_url: developerInfo.github_url || 'https://github.com/gowthamg-dev',
      linkedin_url: developerInfo.linkedin_url || 'https://linkedin.com/in/gowthamg-dev',
      twitter_url: developerInfo.twitter_url || 'https://twitter.com/gowthamg_dev',
      instagram_url: developerInfo.instagram_url || 'https://instagram.com/gowthamg_dev'
    },
    projects: projectsData,
    skills: skillsData,
    education: educationData,
    certificates: certificatesData,
    resumeUrl: '/assets/resume-gowtham-g.pdf',
    settings: {
      site_title: 'GOWTHAM G | Full Stack & React Developer | MCA Student',
      logo_text: 'GOWTHAM G',
      footer_text: 'Designed & Developed with React, Tailwind CSS & Vite'
    },
    loading: false
  });

  return (
    <PortfolioContext.Provider value={{ ...portfolioData, refreshPortfolio: () => {} }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export { formatFileUrl };
