import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Static Data Fallbacks
import { developerInfo as fallbackDevInfo } from '../data/developerInfo';
import { projectsData as fallbackProjects } from '../data/projectsData';
import { skillsData as fallbackSkills } from '../data/skillsData';
import { educationData as fallbackEducation } from '../data/educationData';
import { certificatesData as fallbackCertificates } from '../data/certificatesData';

const PortfolioContext = createContext(null);

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

const formatFileUrl = (url) => {
  if (!url) return '/assets/gowtham-profile.png';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads')) return `${API_BASE_URL}${url}`;
  return url;
};

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState({
    about: {
      ...fallbackDevInfo,
      profile_image_url: '/assets/gowtham-profile.png',
      github_url: 'https://github.com/gowthamg-dev',
      linkedin_url: 'https://linkedin.com/in/gowthamg-dev',
      twitter_url: 'https://twitter.com/gowthamg_dev',
      instagram_url: 'https://instagram.com/gowthamg_dev'
    },
    projects: fallbackProjects,
    skills: fallbackSkills,
    education: fallbackEducation,
    certificates: fallbackCertificates,
    resumeUrl: '/assets/resume-gowtham-g.pdf',
    settings: {
      site_title: 'GOWTHAM G | Full Stack & React Developer | MCA Student',
      logo_text: 'GOWTHAM G',
      footer_text: 'Designed & Developed with React, Tailwind CSS & Vite'
    },
    loading: true
  });

  const fetchPublicPortfolio = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/public/portfolio`);
      if (res.data && res.data.success && res.data.data) {
        const data = res.data.data;
        const formattedProjects = (data.projects || []).map(p => ({
          ...p,
          image_url: formatFileUrl(p.image_url)
        }));

        const formattedCertificates = (data.certificates || []).map(c => ({
          ...c,
          image_url: formatFileUrl(c.image_url)
        }));

        setPortfolioData({
          about: {
            ...fallbackDevInfo,
            name: data.about?.name || fallbackDevInfo.name,
            title: data.about?.title || fallbackDevInfo.title,
            tagline: data.about?.tagline || fallbackDevInfo.tagline,
            bio: data.about?.bio || fallbackDevInfo.bio,
            careerObjective: data.about?.career_objective || fallbackDevInfo.careerObjective,
            interests: data.about?.technical_interests || fallbackDevInfo.interests,
            leadershipText: data.about?.leadership_text || fallbackDevInfo.leadershipText,
            currentLearning: data.about?.current_learning || fallbackDevInfo.currentLearning,
            email: data.about?.email || fallbackDevInfo.email,
            phone: data.about?.phone || fallbackDevInfo.phone,
            location: data.about?.location || fallbackDevInfo.location,
            profile_image_url: formatFileUrl(data.about?.profile_image_url),
            github_url: data.about?.github_url || 'https://github.com/gowthamg-dev',
            linkedin_url: data.about?.linkedin_url || 'https://linkedin.com/in/gowthamg-dev',
            twitter_url: data.about?.twitter_url || 'https://twitter.com/gowthamg_dev',
            instagram_url: data.about?.instagram_url || 'https://instagram.com/gowthamg_dev'
          },
          projects: formattedProjects.length > 0 ? formattedProjects : fallbackProjects,
          skills: data.skills && data.skills.length > 0 ? data.skills : fallbackSkills,
          education: data.education && data.education.length > 0 ? data.education : fallbackEducation,
          certificates: formattedCertificates.length > 0 ? formattedCertificates : fallbackCertificates,
          resumeUrl: formatFileUrl(data.resume?.file_url),
          settings: data.settings || {
            site_title: 'GOWTHAM G | Full Stack & React Developer | MCA Student',
            logo_text: 'GOWTHAM G',
            footer_text: 'Designed & Developed with React, Tailwind CSS & Vite'
          },
          loading: false
        });
      }
    } catch (err) {
      console.log('[PortfolioContext] Backend offline or using static fallback');
      setPortfolioData(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchPublicPortfolio();
  }, []);

  return (
    <PortfolioContext.Provider value={{ ...portfolioData, refreshPortfolio: fetchPublicPortfolio }}>
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
export { API_BASE_URL, formatFileUrl };
