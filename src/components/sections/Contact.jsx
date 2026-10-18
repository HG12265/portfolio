import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
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
      const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const emailjsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

      // 1. Web3Forms integration (if configured)
      if (web3FormsKey && web3FormsKey !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: formData.name,
            email: formData.email,
            replyto: formData.email,
            subject: formData.subject ? `[Portfolio] ${formData.subject}` : `New Message from ${formData.name} via Portfolio`,
            message: formData.message,
            from_name: `${formData.name} (Portfolio Contact)`,
            botcheck: false
          })
        });
        const res = await response.json();
        if (res.success) {
          setStatus({
            type: 'success',
            message: 'Thank you! Your message has been sent directly to Gowtham\'s email.'
          });
          setFormData({ name: '', email: '', subject: '', message: '' });
          return;
        }
      }

      // 2. EmailJS integration (if configured)
      if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey && emailjsServiceId !== 'service_gowtham') {
        await emailjs.sendForm(
          emailjsServiceId,
          emailjsTemplateId,
          formRef.current,
          emailjsPublicKey
        );
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully to Gowtham\'s email.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        return;
      }

      // 3. Fallback: mailto link
      const subject = encodeURIComponent(formData.subject || `Portfolio Message from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${about.email || 'itsgowtham.dev@gmail.com'}?subject=${subject}&body=${body}`;

      setStatus({
        type: 'success',
        message: `Opening your email client to send message to ${about.email || 'itsgowtham.dev@gmail.com'}.`
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send message:', error);
      setStatus({
        type: 'error',
        message: 'Failed to send message automatically. Please try emailing directly to ' + (about.email || 'itsgowtham.dev@gmail.com')
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact" className="bg-slate-50/70">
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
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-6">
            <h3 className="text-xl font-bold font-heading text-slate-900">
              Contact Details
            </h3>

            <div className="space-y-4 font-body">
              <a
                href={`mailto:${about.email || 'itsgowtham.dev@gmail.com'}`}
                className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  <FaEnvelope className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase block font-semibold">Email</span>
                  <span className="text-xs font-semibold text-slate-900 block">{about.email || 'itsgowtham.dev@gmail.com'}</span>
                </div>
              </a>

              <a
                href={`tel:${(about.phone || '+91 9344232465').replace(/\s+/g, '')}`}
                className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <FaPhoneAlt className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase block font-semibold">Phone</span>
                  <span className="text-xs font-semibold text-slate-900 block">{about.phone || '+91 9344232465'}</span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <FaMapMarkerAlt className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase block font-semibold">Location</span>
                  <span className="text-xs font-semibold text-slate-900 block">{about.location || 'Salem, Tamil Nadu, India'}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-3 font-semibold">
                Social Profiles
              </span>
              <div className="flex items-center gap-3">
                {about.github_url && (
                  <a
                    href={about.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-indigo-600 border border-slate-200 shadow-sm transition-colors"
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
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-indigo-600 border border-slate-200 shadow-sm transition-colors"
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
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-indigo-600 border border-slate-200 shadow-sm transition-colors"
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
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-indigo-600 border border-slate-200 shadow-sm transition-colors"
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
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm">
            <h3 className="text-xl font-bold font-heading text-slate-900 mb-6">
              Send a Message
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="to_email" value={about.email || 'itsgowtham.dev@gmail.com'} />
              <input type="hidden" name="from_name" value={formData.name} />
              <input type="hidden" name="from_email" value={formData.email} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1 uppercase font-semibold">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-body shadow-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1 uppercase font-semibold">Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-body shadow-sm transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1 uppercase font-semibold">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry / Job Opportunity"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-body shadow-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1 uppercase font-semibold">Your Message *</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Hi Gowtham, I would like to discuss..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-body resize-none shadow-sm transition-colors"
                />
              </div>

              {status.message && (
                <div
                  className={`p-4 rounded-xl text-xs font-body flex items-start gap-2.5 ${
                    status.type === 'success'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border border-rose-200 text-rose-800'
                  }`}
                >
                  {status.type === 'success' ? (
                    <FaCheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <FaExclamationCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
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
                className="w-full shadow-sm"
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
