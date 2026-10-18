import React, { useState } from 'react';
import ContactIcon from './ContactIcons';
import { defaultContact } from './contactData';
import { usePortfolio } from '../../context/PortfolioContext';
import './ContactFooter.css';

export function ContactSection({ contact, onSubmitMessage }) {
  const { about } = usePortfolio();
  const details = {
    ...defaultContact,
    email: about?.email || defaultContact.email,
    phone: about?.phone || defaultContact.phone,
    phoneLabel: about?.phone || defaultContact.phoneLabel,
    location: about?.location || defaultContact.location,
    ...contact,
  };

  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  async function copyEmail() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard is unavailable');
      await navigator.clipboard.writeText(details.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setFeedback(`Please select and copy this address: ${details.email}`);
    }
  }

  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const fields = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      inquiry: String(data.get('inquiry') || ''),
      subject: String(data.get('subject') || '').trim(),
      message: String(data.get('message') || '').trim(),
    };

    if (fields.name.length < 2 || fields.subject.length < 3 || fields.message.length < 10) {
      setFeedback('Please complete all required fields with enough detail.');
      return;
    }

    if (typeof onSubmitMessage === 'function') {
      setLoading(true);
      setFeedback('');
      try {
        const result = await onSubmitMessage(fields);
        if (result === false) throw new Error('Delivery was not confirmed.');
        setFeedback('Message submitted successfully. Thank you for reaching out!');
        form.reset();
      } catch {
        setFeedback('The message could not be sent. Please email me directly using the address on this page.');
      } finally {
        setLoading(false);
      }
      return;
    }

    // Direct Web3Forms submission if configured
    const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (web3FormsKey && web3FormsKey !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
      setLoading(true);
      setFeedback('');
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: fields.name,
            email: fields.email,
            replyto: fields.email,
            subject: `[Portfolio Inquiry] ${fields.subject}`,
            inquiry_type: fields.inquiry,
            message: fields.message,
            from_name: `${fields.name} (Portfolio Inquiry)`,
          }),
        });
        const result = await res.json();
        if (result.success) {
          setFeedback('Message sent successfully! Thank you for reaching out. I will respond promptly.');
          form.reset();
          return;
        }
      } catch {
        // Fallback to mailto below if network fails
      } finally {
        setLoading(false);
      }
    }

    // Default mailto compose fallback
    const body = `Name: ${fields.name}\nEmail: ${fields.email}\nInquiry Type: ${fields.inquiry}\n\n${fields.message}`;
    const url = `mailto:${details.email}?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(body)}`;
    setFeedback('Your email app will open with your message prepared. Press Send to deliver it!');
    window.location.assign(url);
  }

  return (
    <section id="contact" className="ggc-contact" aria-labelledby="ggc-contact-heading">
      <div className="ggc-container">
        {/* Header */}
        <div className="ggc-section-head">
          <div className="ggc-eyebrow">LET'S CONNECT</div>
          <h2 id="ggc-contact-heading">
            Let's build something <span className="ggc-gradient">meaningful.</span>
          </h2>
          <p>
            Open to internships, full-stack developer opportunities, and thoughtful collaborations. Have a project, position, or idea in mind? I'd love to hear about it.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="ggc-contact-grid">
          {/* Left Intro Panel */}
          <aside className="ggc-intro-panel">
            <div className="ggc-status">
              <span /> OPEN TO OPPORTUNITIES
            </div>
            <h3>
              Great things start with a <em>conversation.</em>
            </h3>
            <p className="ggc-intro-copy">
              I'm passionate about developing clean, scalable web applications and working with people who care about building things well. Let's explore what we can create together.
            </p>

            <div className="ggc-opportunity">
              <div className="ggc-small-label">I'M INTERESTED IN</div>
              <div className="ggc-opportunity-list">
                <span>Full-Stack Roles</span>
                <span>MCA Internships</span>
                <span>Web Projects</span>
              </div>
            </div>

            <div className="ggc-direct-contacts">
              <div className="ggc-direct-row">
                <span className="ggc-direct-icon">
                  <ContactIcon name="mail" size={19} />
                </span>
                <div className="ggc-direct-body">
                  <span>EMAIL ME DIRECTLY</span>
                  <a href={`mailto:${details.email}`}>{details.email}</a>
                </div>
                <button
                  type="button"
                  className="ggc-copy"
                  onClick={copyEmail}
                  title={copied ? 'Copied!' : 'Copy email'}
                  aria-label={copied ? 'Email copied' : 'Copy email address'}
                >
                  <ContactIcon name={copied ? 'check' : 'copy'} size={16} />
                </button>
              </div>

              <div className="ggc-direct-row">
                <span className="ggc-direct-icon">
                  <ContactIcon name="pin" size={18} />
                </span>
                <div className="ggc-direct-body">
                  <span>BASED IN</span>
                  <strong>{details.location}</strong>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Inquiry Form */}
          <div className="ggc-form-panel">
            <div className="ggc-form-head">
              <div className="ggc-form-kicker">SEND AN INQUIRY</div>
              <h3>Tell me a little about your idea.</h3>
              <p>Fill in the details below and I'll have everything needed to get the conversation started.</p>
            </div>

            <form className="ggc-form" onSubmit={submit}>
              <div className="ggc-form-pair">
                <div className="ggc-field">
                  <label htmlFor="ggc-name">
                    Full name <b>*</b>
                  </label>
                  <input
                    id="ggc-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    minLength={2}
                    maxLength={80}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="ggc-field">
                  <label htmlFor="ggc-email">
                    Email address <b>*</b>
                  </label>
                  <input
                    id="ggc-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={150}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="ggc-field">
                <label htmlFor="ggc-inquiry">
                  What is this about? <b>*</b>
                </label>
                <select id="ggc-inquiry" name="inquiry" required defaultValue="">
                  <option value="" disabled>
                    Select an inquiry type
                  </option>
                  <option>Internship / Job Opportunity</option>
                  <option>Website or Web Application Project</option>
                  <option>Collaboration / Partnership</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div className="ggc-field">
                <label htmlFor="ggc-subject">
                  Subject <b>*</b>
                </label>
                <input
                  id="ggc-subject"
                  name="subject"
                  type="text"
                  minLength={3}
                  maxLength={120}
                  placeholder="A short title for your message"
                  required
                />
              </div>

              <div className="ggc-field">
                <label htmlFor="ggc-message">
                  Your message <b>*</b>
                </label>
                <textarea
                  id="ggc-message"
                  name="message"
                  minLength={10}
                  maxLength={3000}
                  placeholder="Hi Gowtham, I'd like to talk about..."
                  required
                />
              </div>

              <button className="ggc-submit" disabled={loading} type="submit">
                <ContactIcon name="send" size={16} />{' '}
                {loading ? 'Sending...' : 'Compose Email'}{' '}
                <ContactIcon name="arrow-up-right" size={16} />
              </button>

              <div className="ggc-form-note">
                <ContactIcon name="shield" size={14} />
                <span>Opens your email application with the message prepared. It does not send anything automatically.</span>
              </div>

              {feedback && (
                <div className="ggc-form-feedback" role="status" aria-live="polite">
                  {feedback}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Extra Bottom Hello */}
        <div className="ggc-extra">
          <ContactIcon name="spark" size={17} /> Prefer a quick introduction?{' '}
          <a href={`mailto:${details.email}?subject=Hello%20Gowtham`}>
            Say hello directly <ContactIcon name="arrow-up-right" size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}

export const Contact = ContactSection;
export default ContactSection;
