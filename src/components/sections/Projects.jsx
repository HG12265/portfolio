import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import projects from './projects.json';
import './ProjectsSection.css';

const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Platforms' },
  { id: 'exam', label: 'Examination' },
  { id: 'management', label: 'Management' },
  { id: 'concept', label: 'Concepts' },
];

const imageOf = (p) => p.image || '/assets/dept-portal.png';

function Icon({ name, size = 16 }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true
  };
  if (name === 'arrow') {
    return (
      <svg {...props}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    );
  }
  if (name === 'external') {
    return (
      <svg {...props}>
        <path d="M13 5h6v6M19 5l-9 9" />
        <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
      </svg>
    );
  }
  if (name === 'check') {
    return (
      <svg {...props}>
        <path d="M5 12l4 4L19 6" />
      </svg>
    );
  }
  if (name === 'search') {
    return (
      <svg {...props}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>
    );
  }
  if (name === 'close') {
    return (
      <svg {...props}>
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    );
  }
  if (name === 'code') {
    return (
      <svg {...props}>
        <path d="m8 8-4 4 4 4m8-8 4 4-4 4M14 5l-4 14" />
      </svg>
    );
  }
  return null;
}

function Tags({ stack }) {
  return (
    <div className="ggp-stack">
      {stack.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  );
}

function MediaBadges({ badges, status }) {
  if (badges && badges.length > 0) {
    return (
      <div className="ggp-card-media-badges">
        {badges.map((b, i) => (
          <span key={i} className={`ggp-media-pill ${b.variant || 'white'}`}>
            {b.dot && <span className={`ggp-media-pill-dot ${b.dot}`} />}
            {b.icon && <span className="ggp-media-pill-icon">{b.icon}</span>}
            {b.label}
          </span>
        ))}
      </div>
    );
  }
  return (
    <span className="ggp-card-media-badge">
      <i /> {status}
    </span>
  );
}

function FeatureCard({ project, onOpen }) {
  return (
    <article className="ggp-feature">
      <div className="ggp-feature-media">
        <div className="ggp-browser">
          <div className="ggp-browser-bar">
            <i className="ggp-browser-dot" />
            <i className="ggp-browser-dot" />
            <i className="ggp-browser-dot" />
            <span className="ggp-browser-url">{project.browserUrl || 'periyaruniversity.ac.in/dept'}</span>
          </div>
          <img
            src={imageOf(project)}
            alt="Screenshot of Periyar University Schools and Departments website"
            loading="eager"
          />
        </div>
      </div>
      <div className="ggp-feature-copy">
        <div className="ggp-label-row">
          <span className="ggp-eyebrow">{project.eyebrow || '01 / FEATURED UNIVERSITY WORK'}</span>
          <span className="ggp-verified">
            <i />
            {project.status || 'Official site'}
          </span>
        </div>
        <h3>
          Periyar University <span>Schools &amp; Departments</span>
        </h3>
        <p>{project.description}</p>
        <div className="ggp-feature-bullets">
          {project.highlights.slice(0, 4).map((h) => (
            <div key={h}>
              <Icon name="check" size={15} />
              {h}
            </div>
          ))}
        </div>
        <Tags stack={project.stack} />
        <div className="ggp-feature-actions">
          <button className="ggp-btn ggp-btn-primary" type="button" onClick={() => onOpen(project)}>
            View Case Study <Icon name="arrow" />
          </button>
          {project.liveUrl && (
            <a
              className="ggp-btn ggp-btn-secondary"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Official Website <Icon name="external" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function RegularCard({ project, onOpen }) {
  return (
    <article className="ggp-card">
      <div className="ggp-card-media">
        <img src={imageOf(project)} alt={`${project.title} screenshot`} loading="lazy" />
        <MediaBadges badges={project.badges} status={project.status} />
      </div>
      <div className="ggp-card-content">
        <div className="ggp-card-heading">
          <span className="ggp-eyebrow">{project.eyebrow}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <Tags stack={project.stack} />
        <div className="ggp-card-footer">
          <span style={{ fontSize: 10, color: '#8391aa', fontWeight: 700 }}>{project.group}</span>
          <button className="ggp-card-link" type="button" onClick={() => onOpen(project)}>
            Explore project <Icon name="arrow" />
          </button>
        </div>
      </div>
    </article>
  );
}

function SmallCard({ project, onOpen }) {
  return (
    <article className="ggp-small">
      <div className="ggp-small-media">
        <img src={imageOf(project)} alt={`${project.title} screenshot`} loading="lazy" />
        <MediaBadges badges={project.badges} status={project.status} />
      </div>
      <div className="ggp-small-copy">
        <span className="ggp-eyebrow">{project.eyebrow}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="ggp-small-bottom">
          <span>{project.group}</span>
          <button className="ggp-card-link" type="button" onClick={() => onOpen(project)}>
            Details <Icon name="arrow" />
          </button>
        </div>
      </div>
    </article>
  );
}

function CaseStudyModal({ project, onClose }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    const oldHtmlOverflow = document.documentElement.style.overflow;
    const activeElement = document.activeElement;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const nodes = [
          ...dialogRef.current.querySelectorAll(
            'button:not(:disabled), a[href], input:not(:disabled), [tabindex]:not([tabindex="-1"])'
          )
        ];
        if (!nodes.length) return;
        if (event.shiftKey && document.activeElement === nodes[0]) {
          event.preventDefault();
          nodes[nodes.length - 1].focus();
        } else if (!event.shiftKey && document.activeElement === nodes[nodes.length - 1]) {
          event.preventDefault();
          nodes[0].focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.documentElement.style.overflow = oldHtmlOverflow;
      document.removeEventListener('keydown', onKey);
      activeElement?.focus?.();
    };
  }, [onClose]);

  const modalElement = (
    <div
      className="ggp-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <section
        className="ggp-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ggp-dialog-title"
      >
        {/* Top Sticky Header */}
        <div className="ggp-modal-top">
          <div className="ggp-modal-title-wrap">
            <div className="ggp-modal-pills-row">
              <span className="ggp-modal-badge">{project.eyebrow || 'PROJECT SHOWCASE'}</span>
              <span className="ggp-modal-status-badge">
                <span className="ggp-modal-status-dot" />
                {project.status || 'Production'}
              </span>
            </div>
            <h3 id="ggp-dialog-title" className="ggp-modal-title">
              {project.title}
            </h3>
          </div>
          <button
            className="ggp-modal-close"
            type="button"
            aria-label="Close case study"
            onClick={onClose}
            ref={closeRef}
          >
            <Icon name="close" size={17} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="ggp-modal-body">
          {/* Full Browser Preview Showcase */}
          <div className="ggp-modal-preview">
            <div className="ggp-modal-browser-bar">
              <div className="ggp-modal-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="ggp-modal-url-pill">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>{project.browserUrl || 'periyaruniversity.ac.in'}</span>
              </div>
              <div className="ggp-modal-bar-actions">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ggp-modal-ext-link"
                    title="Open official site"
                  >
                    <span>Open Live</span>
                    <Icon name="external" size={11} />
                  </a>
                )}
              </div>
            </div>
            <div className="ggp-modal-img-container">
              <img
                src={imageOf(project)}
                alt={`${project.title} complete showcase preview`}
                loading="eager"
              />
            </div>
          </div>

          {/* 2-Column Structured Specs & Story */}
          <div className="ggp-modal-grid">
            {/* Left Main Content */}
            <div className="ggp-modal-main">
              <div className="ggp-modal-section">
                <div className="ggp-section-heading">
                  <span className="ggp-section-icon">📖</span>
                  <h4>Project Overview</h4>
                </div>
                <p className="ggp-modal-desc">{project.overview || project.description}</p>
              </div>

              {project.highlights && project.highlights.length > 0 && (
                <div className="ggp-modal-section">
                  <div className="ggp-section-heading">
                    <span className="ggp-section-icon">⚡</span>
                    <h4>Key Highlights &amp; Capabilities</h4>
                  </div>
                  <div className="ggp-modal-highlights-grid">
                    {project.highlights.map((h, idx) => (
                      <div key={idx} className="ggp-highlight-card">
                        <span className="ggp-highlight-icon">
                          <Icon name="check" size={13} />
                        </span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <aside className="ggp-modal-sidebar">
              <div className="ggp-specs-card">
                <div className="ggp-spec-header">
                  <h5>Project Details</h5>
                </div>
                <div className="ggp-spec-list">
                  <div className="ggp-spec-item">
                    <span className="ggp-spec-label">Organization</span>
                    <strong className="ggp-spec-value">{project.institution || 'Periyar University'}</strong>
                  </div>
                  <div className="ggp-spec-item">
                    <span className="ggp-spec-label">Role</span>
                    <strong className="ggp-spec-value">{project.role || 'Lead Full Stack Developer'}</strong>
                  </div>
                  <div className="ggp-spec-item">
                    <span className="ggp-spec-label">Category</span>
                    <strong className="ggp-spec-value">{project.group}</strong>
                  </div>
                  <div className="ggp-spec-item">
                    <span className="ggp-spec-label">Deployment</span>
                    <strong className="ggp-spec-value highlight">{project.timeline || project.status}</strong>
                  </div>
                </div>
              </div>

              <div className="ggp-modal-stack-wrap">
                <h5>Technologies Used</h5>
                <div className="ggp-modal-stack">
                  {project.stack.map((t) => (
                    <span key={t} className="ggp-modal-tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="ggp-modal-actions-sidebar">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ggp-modal-btn-live"
                  >
                    <span>Visit Official Website</span>
                    <Icon name="external" size={14} />
                  </a>
                )}
                <button
                  type="button"
                  className="ggp-modal-btn-back"
                  onClick={onClose}
                >
                  Back to Projects
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalElement, document.body) : null;
}

export function ProjectsSection({ contactAnchor = '#contact' }) {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        filters.map((f) => [f.id, projects.filter((p) => f.id === 'all' || p.category === f.id).length])
      ),
    []
  );

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (filter === 'all' || p.category === filter) &&
          [p.title, p.description, p.group, ...p.stack].join(' ').toLowerCase().includes(query.trim().toLowerCase())
      ),
    [filter, query]
  );

  const feature = filtered.find((p) => p.featured);
  const primary = filtered.filter((p) => !p.featured && (p.category === 'exam' || p.category === 'web'));
  const secondary = filtered.filter((p) => !p.featured && p.category !== 'exam' && p.category !== 'web');

  const handleContactClick = (e) => {
    if (contactAnchor && contactAnchor.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(contactAnchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="ggp-section" aria-labelledby="ggp-projects-title">
      <div className="ggp-wrap">
        <header className="ggp-heading">
          <div className="ggp-kicker">
            <span />
            <i />
            SELECTED WORK · PROJECT SHOWCASE
            <span />
          </div>
          <h2 id="ggp-projects-title">
            Ideas transformed into <em>real projects.</em>
          </h2>
          <p>
            A closer look at the academic platforms, examination portals and full-stack web experiences I've worked on.
          </p>
        </header>

        <div className="ggp-toolbar">
          <div className="ggp-tabs" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                type="button"
                className="ggp-tab"
                key={f.id}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
                <small>{counts[f.id]}</small>
              </button>
            ))}
          </div>
          <label className="ggp-search">
            <Icon name="search" size={15} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              aria-label="Search projects"
            />
          </label>
        </div>

        <div className="ggp-results-meta">
          <span>{filtered.length} projects in view</span>
          <b>DESIGN • DEVELOPMENT • PROBLEM SOLVING</b>
        </div>

        {feature && <FeatureCard project={feature} onOpen={setSelected} />}

        {primary.length > 0 && (
          <div className="ggp-card-grid">
            {primary.map((p) => (
              <RegularCard key={p.id} project={p} onOpen={setSelected} />
            ))}
          </div>
        )}

        {secondary.length > 0 && (
          <div className="ggp-small-grid">
            {secondary.map((p) => (
              <SmallCard key={p.id} project={p} onOpen={setSelected} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="ggp-empty">
            <strong>No matching projects yet</strong>
            Try another keyword or category.
            <br />
            <button
              type="button"
              onClick={() => {
                setFilter('all');
                setQuery('');
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="ggp-bottom-note">
          <span className="ggp-bottom-note-icon">
            <Icon name="code" size={20} />
          </span>
          <div>
            <strong>Built with curiosity. Improved through real challenges.</strong>
            <br />
            Interested in collaborating on a project or discussing my work?
          </div>
          <a href={contactAnchor} onClick={handleContactClick}>
            Let's connect <Icon name="arrow" />
          </a>
        </div>
      </div>

      {selected && <CaseStudyModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

export const Projects = ProjectsSection;
export default ProjectsSection;
