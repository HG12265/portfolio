import React from 'react';
import ContactIcon from '../sections/ContactIcons';
import { defaultContact } from '../sections/contactData';
import { usePortfolio } from '../../context/PortfolioContext';
import '../sections/ContactFooter.css';

const navLinks = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Projects', '#projects'],
  ['Skills', '#skills'],
  ['Education', '#education'],
  ['Certificates', '#certificates'],
];

export function PortfolioFooter({ contact, socialLinks }) {
  const { about } = usePortfolio();
  const details = {
    ...defaultContact,
    email: about?.email || defaultContact.email,
    phone: about?.phone || defaultContact.phone,
    phoneLabel: about?.phone || defaultContact.phoneLabel,
    location: about?.location || defaultContact.location,
    ...contact,
  };

  const socials = socialLinks || [
    { label: 'GitHub', url: about?.github_url || 'https://github.com/gowthamg-dev' },
    { label: 'LinkedIn', url: about?.linkedin_url || 'https://linkedin.com/in/gowthamg-dev' },
    { label: 'Twitter', url: about?.twitter_url || 'https://twitter.com/gowthamg_dev' },
  ];

  const handleNavClick = (e, url) => {
    if (url.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(url);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="ggc-footer" aria-label="Portfolio footer">
      <div className="ggc-footer-inner">
        <div className="ggc-footer-top">
          {/* Brand Info */}
          <div>
            <a href="#home" onClick={scrollToTop} className="ggc-footer-brand">
              <span className="ggc-logo-icon">G</span>
              <span>
                GOWTHAM <strong>G</strong>
              </span>
            </a>
            <p className="ggc-footer-brand-copy">
              Full-Stack Web Developer focused on crafting reliable, responsive, and human-centered digital experiences.
            </p>
            <span className="ggc-footer-availability">
              <i /> Open to meaningful opportunities
            </span>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="ggc-footer-heading">EXPLORE</h3>
            <nav className="ggc-footer-links" aria-label="Footer navigation">
              {navLinks.map(([title, url]) => (
                <a key={url} href={url} onClick={(e) => handleNavClick(e, url)}>
                  {title}
                </a>
              ))}
            </nav>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="ggc-footer-heading">GET IN TOUCH</h3>
            <div className="ggc-footer-contact-link">
              <ContactIcon name="mail" size={17} />
              <a href={`mailto:${details.email}`}>{details.email}</a>
            </div>
            {details.phone && (
              <div className="ggc-footer-contact-link">
                <ContactIcon name="phone" size={17} />
                <a href={`tel:${details.phone}`}>{details.phoneLabel || details.phone}</a>
              </div>
            )}
            <div className="ggc-footer-contact-link">
              <ContactIcon name="pin" size={17} />
              <span>{details.location}</span>
            </div>

            {socials.filter((s) => s.url && s.label).length > 0 && (
              <nav className="ggc-footer-links" aria-label="Social profiles" style={{ marginTop: '16px' }}>
                {socials
                  .filter((s) => s.url && s.label)
                  .map((link) => (
                    <a href={link.url} key={link.label} target="_blank" rel="noopener noreferrer">
                      {link.label} <ContactIcon name="arrow-up-right" size={13} />
                    </a>
                  ))}
              </nav>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="ggc-footer-bottom">
          <p>© {new Date().getFullYear()} GOWTHAM G. All rights reserved.</p>
          <p className="ggc-footer-credit">Designed &amp; developed with purpose.</p>
          <a className="ggc-top-btn" href="#home" onClick={scrollToTop}>
            Back to top <ContactIcon name="arrow-up" size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export const Footer = PortfolioFooter;
export default PortfolioFooter;
