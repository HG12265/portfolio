import React, { useState } from 'react';
import './EducationSection.css';
import { academicRecords, learningTracks } from './educationData';

const SchoolIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 10 9-6 9 6M5 10v9m4-9v9m6-9v9m4-9v9M3 20h18" />
  </svg>
);

const CheckIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m4 10 4 4 8-8" />
  </svg>
);

const ArrowIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10h12m-5-5 5 5-5 5" />
  </svg>
);

export function EducationSection({ projectsHref = '#projects' }) {
  const [selectedTrack, setSelectedTrack] = useState('academics');
  const activeTrack = learningTracks.find((track) => track.id === selectedTrack) || learningTracks[0];

  const handleProjectsClick = (e) => {
    if (projectsHref.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(projectsHref);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="ge-education" id="education" aria-labelledby="ge-title">
      <div className="ge-wrap">
        {/* Intro Header */}
        <header className="ge-intro">
          <div className="ge-eyebrow">EDUCATION &amp; GROWTH</div>
          <h2 id="ge-title">
            From learning to <span className="ge-grad">real-world impact.</span>
          </h2>
          <p>
            A journey from computer science fundamentals to building practical, people-first software — one project, problem and lesson at a time.
          </p>
        </header>

        {/* Main 2-Column Section */}
        <div className="ge-main">
          {/* Academic Timeline */}
          <div className="ge-academic">
            <div className="ge-section-top">
              <div>
                <div className="ge-kicker">MY EDUCATION</div>
                <h3>Academic journey</h3>
              </div>
              <span className="ge-count">
                {academicRecords.length.toString().padStart(2, '0')} MILESTONES
              </span>
            </div>

            <div className="ge-timeline">
              {academicRecords.map((record) => (
                <article className={`ge-item ${record.featured ? 'featured' : ''}`} key={record.id}>
                  <span className={`ge-dot ${record.featured ? 'ge-featured-dot' : ''}`} aria-hidden="true">
                    <SchoolIcon />
                  </span>
                  <div className="ge-line-top">
                    <span className="ge-date">{record.years}</span>
                    <span className={`ge-pill ${record.featured ? '' : 'completed'}`}>
                      {record.status}
                    </span>
                  </div>
                  <h4>{record.title}</h4>
                  <div className="ge-school">
                    <SchoolIcon />
                    {record.institution}
                  </div>
                  <p>{record.description}</p>
                  <div className="ge-subjects" aria-label="Relevant coursework">
                    {record.courses.map((course) => (
                      <span key={course}>{course}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Aside Philosophy & Growth Card */}
          <aside className="ge-aside" aria-label="How I apply what I learn">
            <div className="ge-aside-head">
              <div className="ge-aside-label">
                <span className="ge-aside-dot" /> BEYOND THE CLASSROOM
              </div>
              <h3>
                Learning by building, <span className="ge-aside-em">not just memorizing.</span>
              </h3>
              <p className="ge-aside-desc">
                My academic foundation guides the way I approach real-world engineering — turning theory into dependable, production-tested software.
              </p>
            </div>

            {/* Micro Academic Metrics */}
            <div className="ge-aside-metrics">
              <div className="ge-metric-card">
                <strong>82%</strong>
                <small>MCA Standing</small>
              </div>
              <div className="ge-metric-card">
                <strong>04</strong>
                <small>Milestones</small>
              </div>
              <div className="ge-metric-card">
                <strong>100%</strong>
                <small>Hands-On Code</small>
              </div>
            </div>

            {/* 4 Professional Engineering Stages */}
            <div className="ge-stages">
              <div className="ge-stage">
                <div className="ge-stage-num ge-stage-indigo">01</div>
                <div>
                  <b>Master the Fundamentals</b>
                  <span>Data structures, relational database schemas &amp; OOP architecture.</span>
                </div>
              </div>

              <div className="ge-stage">
                <div className="ge-stage-num ge-stage-blue">02</div>
                <div>
                  <b>Ship Production Portals</b>
                  <span>Building real academic systems for Periyar University.</span>
                </div>
              </div>

              <div className="ge-stage">
                <div className="ge-stage-num ge-stage-emerald">03</div>
                <div>
                  <b>Modern Full-Stack Craft</b>
                  <span>React, Node.js, Express, MySQL and component architecture.</span>
                </div>
              </div>

              <div className="ge-stage">
                <div className="ge-stage-num ge-stage-amber">04</div>
                <div>
                  <b>Continuous Technical Evolution</b>
                  <span>Docker containers, cloud infrastructure &amp; scalable web systems.</span>
                </div>
              </div>
            </div>

            {/* Current Academic Status Footer */}
            <div className="ge-aside-foot">
              <div className="ge-aside-foot-inner">
                <div className="ge-foot-icon">
                  <CheckIcon />
                </div>
                <div>
                  <strong>Currently Pursuing MCA (Final Year)</strong>
                  <span>Periyar University, Salem · Expected 2027</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Learning Roadmap Tabs */}
        <div className="ge-learning">
          <div className="ge-learning-heading">
            <div>
              <div className="ge-overline">MY LEARNING ROADMAP</div>
              <h3>What I'm learning &amp; applying</h3>
              <p>A closer look at the knowledge behind my development journey.</p>
            </div>
            <span className="ge-learning-count">LEARNING IN PROGRESS</span>
          </div>

          <div className="ge-learning-box">
            <div className="ge-tabs" role="tablist" aria-label="Learning focus categories">
              {learningTracks.map((track) => (
                <button
                  key={track.id}
                  id={`ge-tab-${track.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selectedTrack === track.id}
                  aria-controls="ge-track-panel"
                  onClick={() => setSelectedTrack(track.id)}
                >
                  {track.label}
                </button>
              ))}
            </div>

            <div
              id="ge-track-panel"
              className="ge-learning-panel"
              role="tabpanel"
              aria-labelledby={`ge-tab-${activeTrack.id}`}
            >
              <div>
                <div className="ge-track-kicker">{activeTrack.kicker}</div>
                <h4>{activeTrack.heading}</h4>
                <p>{activeTrack.description}</p>
              </div>

              <div className="ge-track-items">
                {activeTrack.items.map((item) => (
                  <div className="ge-track-item" key={item}>
                    <CheckIcon />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="ge-footer-cta">
          <div>
            <h3>Curious how I use these skills?</h3>
            <p>Explore the software projects where learning turns into practical work.</p>
          </div>
          <a href={projectsHref} onClick={handleProjectsClick}>
            Explore my projects <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

export const Education = EducationSection;
export default EducationSection;
