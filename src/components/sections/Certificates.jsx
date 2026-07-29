import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt, FaBuilding, FaCalendarAlt, FaFilePdf, FaEye } from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';
import { Section } from '../common/Section';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

const formatFileUrl = (url) => {
  if (!url) return '/assets/mentor-mentee.png';
  return url;
};

export const Certificates = () => {
  const { certificates } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState(null);

  const handleOpenCertificate = (cert) => {
    const fileUrl = formatFileUrl(cert.image_url || cert.image);
    // If it's a PDF file, open directly in a new browser tab for clean native PDF viewing
    if (fileUrl.toLowerCase().endsWith('.pdf')) {
      window.open(fileUrl, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedCert(cert);
    }
  };

  return (
    <Section id="certificates" className="bg-slate-900/60">
      <SectionHeader
        badge="Certifications & Training"
        title="Professional"
        highlightTitle="Certificates"
        subtitle="Verified credentials, specialized developer training, and technical learning achievements."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((cert, index) => {
          const fileUrl = formatFileUrl(cert.image_url || cert.image);
          const isPdf = fileUrl.toLowerCase().endsWith('.pdf');

          return (
            <motion.div
              key={cert.id || index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25 }}
              className="glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-accentSky/40 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Thumbnail Header */}
                <div className="relative aspect-video bg-surfaceDark overflow-hidden border-b border-white/5">
                  {isPdf ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800/80 text-accentSky p-4">
                      <FaFilePdf className="w-12 h-12 text-red-400 mb-2" />
                      <span className="text-xs font-mono text-textMuted font-semibold">PDF Document</span>
                    </div>
                  ) : (
                    <img
                      src={fileUrl}
                      alt={cert.title}
                      onError={(e) => { e.currentTarget.src = '/assets/mentor-mentee.png'; }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bgDark/80 via-transparent to-transparent opacity-80" />
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-accentSky mb-2">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <FaBuilding className="w-3.5 h-3.5 text-accentSky/70 shrink-0" />
                      {cert.organization || cert.issuer}
                    </span>
                    {(cert.duration || cert.year) && (
                      <span className="flex items-center gap-1 text-textMuted bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 text-[11px]">
                        <FaCalendarAlt className="w-3 h-3 text-textMuted" />
                        {cert.duration || cert.year}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold font-heading text-textLight group-hover:text-accentSky transition-colors leading-snug">
                    {cert.title}
                  </h3>

                  {cert.description && (
                    <p className="text-xs text-textMuted font-body leading-relaxed line-clamp-3 mt-2.5">
                      {cert.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                <button
                  onClick={() => handleOpenCertificate(cert)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primaryBlue/20 hover:bg-primaryBlue text-accentSky hover:text-white border border-primaryBlue/30 text-xs font-mono font-semibold shadow-md transition-all duration-300"
                >
                  <FaEye className="w-3.5 h-3.5" />
                  <span>View Certificate</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Image Certificate Modal View */}
      {selectedCert && (
        <Modal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          title={selectedCert.title}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden bg-surfaceDark border border-white/10 max-h-[70vh] flex items-center justify-center">
              <img
                src={formatFileUrl(selectedCert.image_url || selectedCert.image)}
                alt={selectedCert.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <div>
                <span className="text-xs font-mono text-accentSky block font-semibold">
                  {selectedCert.organization || selectedCert.issuer} &bull; {selectedCert.duration || selectedCert.year}
                </span>
              </div>

              <Button
                variant="primary"
                size="sm"
                href={formatFileUrl(selectedCert.image_url || selectedCert.image)}
                target="_blank"
                icon={FaExternalLinkAlt}
              >
                Open Original File
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </Section>
  );
};
