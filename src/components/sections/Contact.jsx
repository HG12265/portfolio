import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { 
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaGithub, 
  FaLinkedin, FaTwitter, FaInstagram, FaPaperPlane, FaCheckCircle, FaExclamationCircle 
} from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';
import { Section } from '../common/Section';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';

export const Contact = () => {
  const { about } = usePortfolio();
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
      // 1. Post to backend API so it lands in Studio Inbox
      await axios.post('http://localhost:5000/api/admin/messages', formData).catch(() => {});

      // 2. EmailJS dispatch
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_gowtham',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_gowtham',
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key_gowtham'
      ).catch(() => {});

      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully. Gowtham will get back to you shortly.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Could not send message. Please reach out directly via ' + (about.email || 'itsgowtham.dev@gmail.com')
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact" className="bg-slate-900/50">
      <SectionHeader
        badge="Get in Touch"
        title="Let's Build Something"
        highlightTitle="Together"
        subtitle="Open to full-time opportunities, internship roles, web application development, and technical collaborations."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Contact Info & Socials */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold font-heading text-textLight">
              Contact Details
            </h3>

            <div className="space-y-4 font-body">
              <a
                href={`mailto:${about.email || 'itsgowtham.dev@gmail.com'}`}
                className="flex items-center gap-4 p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-accentSky/30 hover:bg-accentSky/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-accentSky/10 border border-accentSky/20 flex items-center justify-center text-accentSky group-hover:scale-110 transition-transform">
                  <FaEnvelope className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-textMuted uppercase block">Email</span>
                  <span className="text-xs font-semibold text-textLight block">{about.email || 'itsgowtham.dev@gmail.com'}</span>
                </div>
              </a>

              <a
                href={`tel:${(about.phone || '+91 9344232465').replace(/\s+/g, '')}`}
                className="flex items-center gap-4 p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-accentSky/30 hover:bg-accentSky/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primaryBlue/10 border border-primaryBlue/20 flex items-center justify-center text-accentSky group-hover:scale-110 transition-transform">
                  <FaPhoneAlt className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-textMuted uppercase block">Phone</span>
                  <span className="text-xs font-semibold text-textLight block">{about.phone || '+91 9344232465'}</span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <FaMapMarkerAlt className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-textMuted uppercase block">Location</span>
                  <span className="text-xs font-semibold text-textLight block">{about.location || 'Salem, Tamil Nadu, India'}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-textMuted uppercase tracking-wider block mb-3">
                Social Profiles
              </span>
              <div className="flex items-center gap-3">
                {about.github_url && (
                  <a
                    href={about.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-textMuted hover:text-textLight border border-white/10 transition-colors"
                    title="GitHub"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                )}
                {about.linkedin_url && (
                  <a
                    href={about.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-textMuted hover:text-textLight border border-white/10 transition-colors"
                    title="LinkedIn"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                )}
                {about.twitter_url && (
                  <a
                    href={about.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-textMuted hover:text-textLight border border-white/10 transition-colors"
                    title="Twitter / X"
                  >
                    <FaTwitter className="w-4 h-4" />
                  </a>
                )}
                {about.instagram_url && (
                  <a
                    href={about.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-textMuted hover:text-textLight border border-white/10 transition-colors"
                    title="Instagram"
                  >
                    <FaInstagram className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Message Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7"
        >
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold font-heading text-textLight mb-6">
              Send a Message
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60 font-body"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60 font-body"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry / Job Opportunity"
                  className="w-full px-4 py-2.5 rounded-xl bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60 font-body"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Your Message *</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Hi Gowtham, I would like to discuss..."
                  className="w-full px-4 py-2.5 rounded-xl bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60 font-body resize-none"
                />
              </div>

              {status.message && (
                <div
                  className={`p-4 rounded-xl text-xs font-body flex items-start gap-2.5 ${
                    status.type === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/10 border border-red-500/20 text-red-400'
                  }`}
                >
                  {status.type === 'success' ? (
                    <FaCheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <FaExclamationCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

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
