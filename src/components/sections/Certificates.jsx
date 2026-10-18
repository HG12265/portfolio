import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  certificatesList,
  certificateCategories,
  certificateStats
} from './certificatesData';
import './CertificatesSection.css';

/* SVG Icons for high performance and visual consistency */
function TrophyIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function MedalIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function CertificateIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 8h10" />
      <path d="M7 12h6" />
      <path d="m15 15 2 2 4-4" />
    </svg>
  );
}

function CodeIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function PdfFileIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M9 15h6" />
      <path d="M9 11h2" />
    </svg>
  );
}

function SearchIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ExternalIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function EyeIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function CloseIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* Certificate Detail Modal with React Portal */
function CertificateDetailModal({ cert, onClose }) {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    closeBtnRef.current?.focus?.();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!cert) return null;

  const isPdf = cert.fileType === 'pdf' && cert.fileUrl;

  const modalNode = (
    <div
      className="gc-modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className="gc-modal-panel"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gc-modal-dialog-title"
      >
        {/* Header */}
        <div className="gc-modal-header">
          <div>
            <div className="gc-modal-kicker">{cert.categoryLabel}</div>
            <h3 id="gc-modal-dialog-title" className="gc-modal-title">
              {cert.title}
            </h3>
          </div>
          <button
            type="button"
            className="gc-modal-close"
            onClick={onClose}
            ref={closeBtnRef}
            aria-label="Close details"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className="gc-modal-content">
          {/* Visual Showcase */}
          <div className="gc-modal-preview-box">
            {isPdf ? (
              <div className="gc-visual--pdf" style={{ padding: '24px 0' }}>
                <div className="gc-pdf-icon-ring" style={{ width: '68px', height: '68px' }}>
                  <PdfFileIcon size={32} />
                </div>
                <div style={{ marginTop: '12px' }}>
                  <strong style={{ display: 'block', fontSize: '14px', color: '#0f172a' }}>
                    {cert.title}.pdf
                  </strong>
                  <span className="gc-pdf-label" style={{ marginTop: '6px', display: 'inline-block' }}>
                    Official Verified Document · NPTEL
                  </span>
                </div>
              </div>
            ) : (
              <div className="gc-visual--badge" style={{ padding: '20px 0' }}>
                <div className="gc-visual-award-ring" style={{ width: '70px', height: '70px' }}>
                  {cert.category === 'project' ? <CodeIcon size={32} /> : <TrophyIcon size={32} />}
                </div>
                <div className="gc-award-pill gc-award--winner" style={{ marginTop: '10px' }}>
                  {cert.award}
                </div>
              </div>
            )}
          </div>

          {/* Meta Grid */}
          <div className="gc-modal-meta-grid">
            <div className="gc-modal-meta-item">
              <div className="gc-modal-meta-label">Award & Distinction</div>
              <div className="gc-modal-meta-value">{cert.award}</div>
            </div>
            <div className="gc-modal-meta-item">
              <div className="gc-modal-meta-label">Issuing Organization</div>
              <div className="gc-modal-meta-value">{cert.organization}</div>
            </div>
            <div className="gc-modal-meta-item">
              <div className="gc-modal-meta-label">Timeline / Year</div>
              <div className="gc-modal-meta-value">{cert.duration}</div>
            </div>
            <div className="gc-modal-meta-item">
              <div className="gc-modal-meta-label">Verification / ID</div>
              <div className="gc-modal-meta-value" style={{ fontFamily: 'monospace' }}>
                {cert.credentialId || 'Verified Record'}
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569', marginBottom: '8px' }}>
              Overview & Recognition
            </h4>
            <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#334155', margin: 0 }}>
              {cert.description}
            </p>
          </div>

          {/* Skills */}
          {cert.skills && cert.skills.length > 0 && (
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569', marginBottom: '8px' }}>
                Skills & Technologies Recognized
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cert.skills.map((skill) => (
                  <span key={skill} className="gc-skill-tag" style={{ fontSize: '12px', padding: '4px 10px' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="gc-modal-actions">
          {isPdf && (
            <a
              href={cert.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gc-btn-action gc-btn-primary"
              style={{ padding: '10px 20px' }}
            >
              <span>Open PDF Document</span>
              <ExternalIcon />
            </a>
          )}
          <button
            type="button"
            className="gc-btn-action gc-btn-secondary"
            onClick={onClose}
            style={{ padding: '10px 18px' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalNode, document.body) : null;
}

export const Certificates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalCert, setModalCert] = useState(null);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: certificatesList.length };
    certificateCategories.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = certificatesList.filter((item) => item.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Filtered certificates
  const filteredCertificates = useMemo(() => {
    return certificatesList.filter((cert) => {
      const matchesCategory =
        selectedCategory === 'all' || cert.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesQuery =
        cert.title.toLowerCase().includes(q) ||
        cert.organization.toLowerCase().includes(q) ||
        cert.award.toLowerCase().includes(q) ||
        cert.description.toLowerCase().includes(q) ||
        cert.skills?.some((s) => s.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleCardClick = (cert) => {
    if (cert.fileType === 'pdf' && cert.fileUrl) {
      window.open(cert.fileUrl, '_blank', 'noopener,noreferrer');
    } else {
      setModalCert(cert);
    }
  };

  return (
    <section className="gc-certificates" id="certificates" aria-labelledby="gc-title">
      <div className="gc-container">
        {/* Section Header */}
        <header className="gc-header">
          <div className="gc-eyebrow">ACCREDITATIONS &amp; HONORS</div>
          <h2 id="gc-title" className="gc-title">
            Verified Credentials &amp;{' '}
            <span className="gc-grad">Competition Accolades.</span>
          </h2>
          <p className="gc-subtitle">
            A comprehensive portfolio of NPTEL certifications, state-level symposium winnings, inter-college coding achievements, and hands-on project accomplishments.
          </p>
        </header>

        {/* Top 4-Column Stats Banner */}
        <div className="gc-stats-grid" aria-label="Accolade highlights">
          {certificateStats.map((stat) => (
            <div key={stat.id} className={`gc-stat-card gc-stat-card--${stat.id}`}>
              <div className="gc-stat-icon-wrap" aria-hidden="true">
                {stat.id === 'symposium' && <TrophyIcon size={24} />}
                {stat.id === 'inter' && <MedalIcon size={24} />}
                {stat.id === 'course' && <CertificateIcon size={24} />}
                {stat.id === 'project' && <CodeIcon size={24} />}
              </div>
              <div>
                <div className="gc-stat-num">{stat.number}</div>
                <div className="gc-stat-label">{stat.label}</div>
                <div className="gc-stat-desc">{stat.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs and Live Search Bar */}
        <div className="gc-controls">
          <div className="gc-filter-tabs" role="tablist" aria-label="Filter certificates by category">
            {certificateCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`gc-tab-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span className="gc-tab-count">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="gc-search-wrap">
            <span className="gc-search-icon">
              <SearchIcon />
            </span>
            <input
              type="text"
              className="gc-search-input"
              placeholder="Search awards, skills, NPTEL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search certificates"
            />
            {searchQuery && (
              <button
                type="button"
                className="gc-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Live Filter Summary */}
        <div className="gc-results-bar">
          <div>
            Showing <strong>{filteredCertificates.length}</strong> of{' '}
            <strong>{certificatesList.length}</strong> credentials
            {selectedCategory !== 'all' && (
              <span> in <strong>{certificateCategories.find((c) => c.id === selectedCategory)?.label}</strong></span>
            )}
            {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
          </div>
          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#4f46e5',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <div className="gc-empty-state">
            <div className="gc-empty-icon" aria-hidden="true">
              <SearchIcon size={26} />
            </div>
            <h3 className="gc-empty-title">No credentials found</h3>
            <p className="gc-empty-text">
              No certifications or accolades matched your search "{searchQuery}".
            </p>
            <button
              type="button"
              className="gc-empty-reset"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              View All Credentials
            </button>
          </div>
        )}

        {/* Cards Grid */}
        <div className="gc-cards-grid">
          {filteredCertificates.map((cert) => {
            const isPdf = cert.fileType === 'pdf' && cert.fileUrl;
            const awardClass =
              cert.awardType === 'winner'
                ? 'gc-award--winner'
                : cert.awardType === 'runnerup'
                ? 'gc-award--runnerup'
                : cert.awardType === 'excellence'
                ? 'gc-award--excellence'
                : 'gc-award--certified';

            const catClass =
              cert.category === 'symposium'
                ? 'gc-cat--symposium'
                : cert.category === 'intercollege'
                ? 'gc-cat--intercollege'
                : cert.category === 'project'
                ? 'gc-cat--project'
                : 'gc-cat--course';

            return (
              <article
                key={cert.id}
                className={`gc-card ${cert.featured ? 'gc-card--featured' : ''}`}
              >
                {/* Visual Header */}
                <div
                  className={`gc-card-visual ${isPdf ? 'gc-visual--pdf' : cert.category === 'project' ? 'gc-visual--project' : 'gc-visual--badge'}`}
                  onClick={() => handleCardClick(cert)}
                  style={{ cursor: 'pointer' }}
                  title="Click to view credential"
                >
                  {/* Category Pill Overlay */}
                  <span className={`gc-card-category-tag ${catClass}`}>
                    {cert.categoryLabel}
                  </span>

                  {/* Date Pill Overlay */}
                  <span className="gc-card-date-tag">
                    {cert.duration}
                  </span>

                  {/* Icon illustration */}
                  {isPdf ? (
                    <>
                      <div className="gc-pdf-icon-ring">
                        <PdfFileIcon size={28} />
                      </div>
                      <span className="gc-pdf-label">PDF Certificate · NPTEL</span>
                    </>
                  ) : (
                    <>
                      <div className="gc-visual-award-ring">
                        {cert.category === 'project' ? (
                          <CodeIcon size={28} />
                        ) : (
                          <TrophyIcon size={28} />
                        )}
                      </div>
                      <span className="gc-visual-award-tag">
                        {cert.awardType === 'winner' ? 'Symposium Winner' : cert.categoryLabel}
                      </span>
                    </>
                  )}
                </div>

                {/* Card Body */}
                <div className="gc-card-body">
                  <div className="gc-org-row">
                    <span className="gc-org-name">
                      <span>{cert.organization}</span>
                      <span className="gc-verify-check" title="Verified Organization">✓</span>
                    </span>
                  </div>

                  <h3 className="gc-card-title">{cert.title}</h3>

                  <div className={`gc-award-pill ${awardClass}`}>
                    {cert.award}
                  </div>

                  <p className="gc-card-desc">{cert.description}</p>

                  {/* Skills Pills */}
                  {cert.skills && (
                    <div className="gc-skills-wrap">
                      {cert.skills.map((skill) => (
                        <span key={skill} className="gc-skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="gc-card-footer">
                  {isPdf ? (
                    <a
                      href={cert.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gc-btn-action gc-btn-primary"
                    >
                      <EyeIcon />
                      <span>View PDF</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="gc-btn-action gc-btn-primary"
                      onClick={() => setModalCert(cert)}
                    >
                      <EyeIcon />
                      <span>View Details</span>
                    </button>
                  )}

                  <button
                    type="button"
                    className="gc-btn-action gc-btn-secondary"
                    onClick={() => setModalCert(cert)}
                  >
                    <span>Full Info</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {modalCert && (
        <CertificateDetailModal
          cert={modalCert}
          onClose={() => setModalCert(null)}
        />
      )}
    </section>
  );
};

export default Certificates;
