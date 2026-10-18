import React, { useMemo, useState } from 'react';
import { skills, filters } from './skillsData';
import './SkillsSection.css';

function SearchIcon() {
  return (
    <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="10.6" cy="10.6" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function SkillLogo({ skill }) {
  if (skill.icon === 'react') {
    return (
      <span className="gg-skills-logo gg-skills-logo--react" aria-hidden="true">
        <svg viewBox="0 0 42 42" width="35" height="35" fill="none" stroke="currentColor" strokeWidth="1.8">
          <ellipse cx="21" cy="21" rx="18" ry="7.3" />
          <ellipse cx="21" cy="21" rx="18" ry="7.3" transform="rotate(60 21 21)" />
          <ellipse cx="21" cy="21" rx="18" ry="7.3" transform="rotate(120 21 21)" />
          <circle cx="21" cy="21" r="3.1" fill="currentColor" stroke="none" />
        </svg>
      </span>
    );
  }

  if (skill.icon === 'docker') {
    return (
      <span className="gg-skills-logo gg-skills-logo--docker" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186zm5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm-2.929 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185zm-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185zm-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185zm21.688 1.409c-.397-.267-.933-.298-1.528-.109-.16.052-.317.117-.468.192-.403-.328-.888-.54-1.423-.59-.092-.01-.186-.013-.28-.013-.585 0-1.157.17-1.64.492a2.31 2.31 0 00-.472.417 8.35 8.35 0 00-3.136-.598H1.674a.488.488 0 00-.488.489 8.23 8.23 0 003.582 6.782c3.08 2.087 7.42 2.227 10.745.349a10.875 10.875 0 004.887-5.918c.328-.052.65-.136.953-.25.59-.22.955-.589 1.134-1.042.179-.452.123-.925-.192-1.2z" />
        </svg>
      </span>
    );
  }

  return (
    <span className={`gg-skills-logo gg-skills-logo--${skill.icon}`} aria-hidden="true">
      {skill.mark}
    </span>
  );
}

export function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');

  const counts = useMemo(
    () =>
      Object.fromEntries(
        filters.map((f) => [
          f.id,
          f.id === 'All' ? skills.length : skills.filter((s) => s.category === f.id).length
        ])
      ),
    []
  );

  const visible = useMemo(
    () =>
      skills.filter(
        (s) =>
          (activeFilter === 'All' || s.category === activeFilter) &&
          `${s.name} ${s.summary || ''} ${s.category}`.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [activeFilter, query]
  );

  const handleProjectsClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="gg-skills" id="skills" aria-labelledby="gg-skills-title">
      <div className="gg-skills-container">
        {/* Header */}
        <header className="gg-skills-head">
          <div className="gg-skills-eyebrow">
            <span className="gg-skills-eyebrow-dot" /> MY DEVELOPMENT TOOLKIT <span className="gg-skills-eyebrow-line" />
          </div>
          <h2 id="gg-skills-title">
            The stack behind <span>what I build.</span>
          </h2>
          <p>
            A practical mix of frontend craft, backend development and the tools I use to turn ideas into useful web applications.
          </p>
        </header>

        {/* Top Showcase Banner */}
        <div className="gg-skills-showcase">
          <div className="gg-skills-showcase-main">
            <div className="gg-skills-showcase-top">
              <span className="gg-skills-chip-light">
                <i /> MY CORE STACK
              </span>
              <span className="gg-skills-asterisk" aria-hidden="true">
                ✳
              </span>
            </div>
            <h3>
              From polished interfaces to <em>dependable backends.</em>
            </h3>
            <p>Connecting user experiences, APIs and relational data into one complete application.</p>
            <div className="gg-skills-architecture" aria-label="Typical web application flow: React or Next.js, Node and Express, MySQL">
              <div>
                <small>FRONTEND</small>
                <strong>React / Next.js</strong>
              </div>
              <span className="gg-skills-flow-arrow" aria-hidden="true">
                →
              </span>
              <div>
                <small>BACKEND</small>
                <strong>Node / Express</strong>
              </div>
              <span className="gg-skills-flow-arrow" aria-hidden="true">
                →
              </span>
              <div>
                <small>DATABASE</small>
                <strong>MySQL</strong>
              </div>
            </div>
          </div>

          <div className="gg-skills-showcase-aside">
            <article className="gg-skills-capability">
              <div className="gg-skills-capability-icon gg-skills-purple" aria-hidden="true">
                ⌘
              </div>
              <div>
                <small>01 / EXPERIENCE</small>
                <h4>Web interfaces</h4>
                <p>React, Next.js, JavaScript and responsive design.</p>
              </div>
            </article>

            <article className="gg-skills-capability">
              <div className="gg-skills-capability-icon gg-skills-blue" aria-hidden="true">
                {`{}`}
              </div>
              <div>
                <small>02 / ENGINEERING</small>
                <h4>APIs &amp; data</h4>
                <p>Node.js, Express and structured MySQL workflows.</p>
              </div>
            </article>

            <article className="gg-skills-capability">
              <div className="gg-skills-capability-icon gg-skills-green" aria-hidden="true">
                ⑂
              </div>
              <div>
                <small>03 / WORKFLOW</small>
                <h4>Build together</h4>
                <p>Git, GitHub and a clear development process.</p>
              </div>
            </article>
          </div>
        </div>

        {/* Explorer Section */}
        <div className="gg-skills-explorer" id="gg-skills-explorer">
          <div className="gg-skills-section-label">
            <span>EXPLORE MY TECHNOLOGIES</span>
            <i />
          </div>

          <div className="gg-skills-explorer-heading">
            <div>
              <h3>Tools &amp; technologies</h3>
              <p>Explore the tools I work with and what I’m currently learning.</p>
            </div>
            <span className="gg-skills-total">{skills.length} TECHNOLOGIES</span>
          </div>

          {/* Filter Tabs & Search Bar */}
          <div className="gg-skills-toolbar">
            <div className="gg-skills-filters" role="group" aria-label="Filter skills by category">
              {filters.map((f) => (
                <button
                  type="button"
                  key={f.id}
                  className={`gg-skills-filter${activeFilter === f.id ? ' is-active' : ''}`}
                  aria-pressed={activeFilter === f.id}
                  onClick={() => setActiveFilter(f.id)}
                >
                  {f.label}
                  <span>{counts[f.id]}</span>
                </button>
              ))}
            </div>

            <label className="gg-skills-search">
              <SearchIcon />
              <span className="gg-skills-sr-only">Search technologies</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a technology..."
                aria-label="Search technologies"
              />
            </label>
          </div>

          {/* Grid of Technology Cards */}
          <div className="gg-skills-grid" aria-live="polite">
            {visible.map((skill) => (
              <article className="gg-skills-card" key={skill.id}>
                <div className="gg-skills-card-top">
                  <SkillLogo skill={skill} />
                  <span
                    className={`gg-skills-level ${
                      skill.level === 'Currently learning'
                        ? 'gg-skills-level-learning'
                        : skill.level === 'Core stack'
                        ? 'gg-skills-level-core'
                        : ''
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>
                <h4>{skill.name}</h4>
                <p>{skill.summary}</p>
                <div className="gg-skills-card-bottom">
                  <span>{skill.category.toUpperCase()}</span>
                </div>
              </article>
            ))}
          </div>

          {visible.length === 0 && (
            <div className="gg-skills-empty">
              <strong>No matching technologies.</strong>
              <p>Try a different search term or category.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveFilter('All');
                  setQuery('');
                }}
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Footnote */}
          <div className="gg-skills-footnote">
            <span>
              <span className="gg-skills-footnote-dot" /> Learning is ongoing — proficiency labels are intentionally not represented as percentages.
            </span>
            <a href="#projects" onClick={handleProjectsClick}>
              See these skills in action <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Skills = SkillsSection;
export default SkillsSection;
