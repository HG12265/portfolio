import React from 'react';
import './AboutSection.css';

function Icon({ name, size = 20 }) {
  const paths = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    arrowUp: (
      <>
        <path d="M7 17 17 7M7 7h10v10" />
      </>
    ),
    sparkle: (
      <>
        <path d="m12 3 1.65 5.35L19 10l-5.35 1.65L12 17l-1.65-5.35L5 10l5.35-1.65L12 3Z" />
        <path d="m19 17 .6 1.4L21 19l-1.4.6L19 21l-.6-1.4L17 19l1.4-.6L19 17Z" />
      </>
    ),
    terminal: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="m7 9 3 3-3 3m6 0h4" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20v-2a6 6 0 0 1 12 0v2H3Z" />
        <path d="M17 5a3 3 0 0 1 0 6m2 4a5 5 0 0 1 2 4" />
      </>
    ),
    chart: (
      <>
        <path d="M4 20V6m0 14h16" />
        <path d="m8 16 4-4 3 2 5-7" />
        <path d="M16 7h4v4" />
      </>
    ),
    check: (
      <>
        <path d="m5 12 4 4L19 6" />
      </>
    ),
    graduation: (
      <>
        <path d="m2 9 10-5 10 5-10 5-10-5Z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5M22 9v6" />
      </>
    ),
    map: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-12 7a25 25 0 0 0 18 0" />
      </>
    ),
    code: (
      <>
        <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-11-2 14" />
      </>
    )
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

/**
 * Standalone, responsive About section matching the approved Royal Indigo portfolio style.
 */
export const About = ({ projectAnchor = '#projects', contactAnchor = '#contact' }) => {
  const handleAnchorClick = (e, anchor) => {
    if (anchor && anchor.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="gg-about" id="about" aria-labelledby="gg-about-title">
      <div className="gg-about-inner">
        <header className="gg-about-heading">
          <div className="gg-about-overline">
            <span className="gg-about-overline-dot" /> GET TO KNOW ME <span className="gg-about-overline-line" />
          </div>
          <h2 id="gg-about-title">
            More than just <span>a developer.</span>
          </h2>
          <p>
            A closer look at my approach, the work that motivates me, and the skills I’m building along the way.
          </p>
        </header>

        <div className="gg-about-feature-grid">
          <article className="gg-about-story">
            <div className="gg-about-story-top">
              <span className="gg-about-kicker">01 / MY STORY</span>
              <span className="gg-about-story-mark">
                <Icon name="sparkle" size={19} />
              </span>
            </div>
            <h3>
              Turning ideas into <span>useful digital experiences.</span>
            </h3>
            <p>
              I’m <strong>Gowtham G</strong>, an MCA student at <strong>Periyar University</strong> and a full-stack web developer who enjoys solving practical problems through thoughtful design and development.
            </p>
            <p>
              My work on university websites and academic applications has helped me understand how responsive interfaces, APIs, and reliable databases come together to support real workflows.
            </p>
            <div className="gg-about-principles">
              <div>
                <span className="gg-about-principle-icon">
                  <Icon name="check" size={15} />
                </span>
                <span>Build for real people, not just for demos</span>
              </div>
              <div>
                <span className="gg-about-principle-icon">
                  <Icon name="check" size={15} />
                </span>
                <span>Balance clean design with dependable functionality</span>
              </div>
              <div>
                <span className="gg-about-principle-icon">
                  <Icon name="check" size={15} />
                </span>
                <span>Keep learning, collaborating, and improving</span>
              </div>
            </div>
            <div className="gg-about-story-actions">
              <a
                className="gg-about-btn-primary"
                href={projectAnchor}
                onClick={(e) => handleAnchorClick(e, projectAnchor)}
              >
                Explore my work <Icon name="arrow" size={17} />
              </a>
              <a
                className="gg-about-btn-text"
                href={contactAnchor}
                onClick={(e) => handleAnchorClick(e, contactAnchor)}
              >
                Let's connect <Icon name="arrowUp" size={15} />
              </a>
            </div>
          </article>

          <aside className="gg-about-snapshot" aria-label="Developer snapshot">
            <div className="gg-about-snapshot-bg" aria-hidden="true">
              <div className="gg-about-orbit one" />
              <div className="gg-about-orbit two" />
              <div className="gg-about-orbit three" />
            </div>
            <div className="gg-about-snap-header">
              <div className="gg-about-snap-badge" aria-hidden="true">
                <Icon name="code" size={20} />
              </div>
              <span className="gg-about-snap-eyebrow">DEVELOPER SNAPSHOT</span>
            </div>
            <h3>
              A little about
              <br />
              what I do
            </h3>
            <p className="gg-about-snap-intro">Curious by nature. Focused on building meaningful web products.</p>
            <div className="gg-about-snap-list">
              <div className="gg-about-snap-row">
                <span className="gg-about-snap-icon">
                  <Icon name="graduation" size={21} />
                </span>
                <div>
                  <small>EDUCATION</small>
                  <strong>MCA · 2025—2027</strong>
                  <span>Periyar University</span>
                </div>
              </div>
              <div className="gg-about-snap-row">
                <span className="gg-about-snap-icon">
                  <Icon name="code" size={20} />
                </span>
                <div>
                  <small>TECHNICAL FOCUS</small>
                  <strong>Full-Stack Development</strong>
                  <span>React · Node.js · MySQL</span>
                </div>
              </div>
              <div className="gg-about-snap-row">
                <span className="gg-about-snap-icon">
                  <Icon name="briefcase" size={20} />
                </span>
                <div>
                  <small>PRACTICAL EXPERIENCE</small>
                  <strong>University Web Projects</strong>
                  <span>Academic portals &amp; applications</span>
                </div>
              </div>
            </div>
            <div className="gg-about-snap-footer">
              <span className="gg-about-green-dot" />
              <span>Based in Salem, Tamil Nadu</span>
              <Icon name="map" size={15} />
            </div>
          </aside>
        </div>

        <div className="gg-about-values-head">
          <span>WHAT I BRING TO THE TABLE</span>
          <span className="gg-about-head-rule" />
        </div>
        <div className="gg-about-values">
          <article className="gg-about-value-card">
            <span className="gg-about-value-icon lilac">
              <Icon name="layers" size={23} />
            </span>
            <div className="gg-about-value-number">01</div>
            <h4>End-to-end thinking</h4>
            <p>
              From interface design to backend logic and database structure, I enjoy understanding how the complete application fits together.
            </p>
            <span className="gg-about-value-tag">DESIGN + DEVELOPMENT</span>
          </article>
          <article className="gg-about-value-card">
            <span className="gg-about-value-icon blue">
              <Icon name="people" size={23} />
            </span>
            <div className="gg-about-value-number">02</div>
            <h4>Collaboration &amp; leadership</h4>
            <p>
              University teamwork and department leadership have shaped how I communicate, coordinate tasks, and contribute toward shared goals.
            </p>
            <span className="gg-about-value-tag">TEAMWORK + OWNERSHIP</span>
          </article>
          <article className="gg-about-value-card">
            <span className="gg-about-value-icon mint">
              <Icon name="chart" size={23} />
            </span>
            <div className="gg-about-value-number">03</div>
            <h4>Always improving</h4>
            <p>
              I keep strengthening my development fundamentals while exploring cloud deployment, Docker, and better software delivery practices.
            </p>
            <span className="gg-about-value-tag">LEARNING + GROWTH</span>
          </article>
        </div>
        <div className="gg-about-closer">
          <span className="gg-about-closer-symbol">
            <Icon name="terminal" size={18} />
          </span>
          <p>
            <strong>My mindset:</strong> Keep it simple. Make it useful. Build it to last.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
