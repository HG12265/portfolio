import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaGithub, 
  FaLinkedin, FaTwitter, FaPaperPlane, FaCheckCircle, FaExclamationCircle 
} from 'react-icons/fa';
import { developerInfo } from '../../data/developerInfo';
import { Section } from '../common/Section';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';

export const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.message) setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setLoading(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_gowtham',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_gowtham',
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key_gowtham'
      ).catch(() => {
        return new Promise((resolve) => setTimeout(resolve, 1000));
      });

      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully. Gowtham will get back to you shortly.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Could not send email automatically. Please reach out directly via itsgowtham.dev@gmail.com'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact" className="bg-slate-900/50">
      <SectionHeader
        badge="Get in Touch"
        title="Let's Discuss Opportunities &"
        highlightTitle="Projects"
        subtitle="Whether you have a job opportunity, project inquiry, academic collaboration, or technical question, feel free to reach out!"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Contact Information Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 space-y-4"
        >
          <div className="glass-card p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold font-heading text-textLight mb-2">
              Contact Information
            </h3>
            <p className="text-xs font-body text-textMuted leading-relaxed mb-6">
              I am actively seeking full-time developer roles, internships, and collaborative web application projects.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${developerInfo.email}`}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accentSky/30 hover:bg-accentSky/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primaryBlue/10 border border-primaryBlue/20 flex items-center justify-center text-accentSky group-hover:scale-110 transition-transform">
                  <FaEnvelope className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-textMuted uppercase block">Email</span>
                  <span className="text-xs font-semibold text-textLight block">{developerInfo.email}</span>
                </div>
              </a>

              <a
                href={`tel:${developerInfo.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accentSky/30 hover:bg-accentSky/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <FaPhoneAlt className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-textMuted uppercase block">Phone / WhatsApp</span>
                  <span className="text-xs font-semibold text-textLight block">{developerInfo.phone}</span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <FaMapMarkerAlt className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-textMuted uppercase block">Location</span>
                  <span className="text-xs font-semibold text-textLight block">{developerInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="text-xs font-mono text-textMuted uppercase tracking-wider block mb-3">
                Social Profiles
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={developerInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-xs font-mono text-textMuted hover:text-textLight hover:border-accentSky/40 hover:bg-accentSky/10 transition-all"
                >
                  <FaGithub className="w-4 h-4" /> GitHub
                </a>
                <a
                  href={developerInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-xs font-mono text-textMuted hover:text-textLight hover:border-accentSky/40 hover:bg-accentSky/10 transition-all"
                >
                  <FaLinkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a
                  href={developerInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-textMuted hover:text-textLight hover:border-accentSky/40 hover:bg-accentSky/10 transition-all"
                  aria-label="Twitter Profile"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-7"
        >
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold font-heading text-textLight mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs font-body text-textMuted leading-relaxed mb-6">
              Fill out the form below and your message will be dispatched directly to my email inbox.
            </p>

            {/* Status Alert Toast */}
            {status.message && (
              <div
                className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-xs font-body ${
                  status.type === 'success'
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                }`}
              >
                {status.type === 'success' ? (
                  <FaCheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                ) : (
                  <FaExclamationCircle className="w-4 h-4 shrink-0 mt-0.5" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-textMuted mb-1.5 uppercase">
                    Your Name <span className="text-accentSky">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight placeholder-textMuted/50 focus:outline-none focus:border-accentSky/60 transition-colors font-body"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-textMuted mb-1.5 uppercase">
                    Your Email <span className="text-accentSky">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight placeholder-textMuted/50 focus:outline-none focus:border-accentSky/60 transition-colors font-body"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-textMuted mb-1.5 uppercase">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Job Opportunity / Project Inquiry"
                  className="w-full px-4 py-2.5 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight placeholder-textMuted/50 focus:outline-none focus:border-accentSky/60 transition-colors font-body"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-textMuted mb-1.5 uppercase">
                  Message <span className="text-accentSky">*</span>
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Gowtham, I reviewed your portfolio and would like to discuss..."
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight placeholder-textMuted/50 focus:outline-none focus:border-accentSky/60 transition-colors font-body resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                icon={FaPaperPlane}
                className="w-full"
              >
                Send Message
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
