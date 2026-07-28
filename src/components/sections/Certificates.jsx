import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt, FaExpand } from 'react-icons/fa';
import { certificatesData } from '../../data/certificatesData';
import { Section } from '../common/Section';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

export const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <Section id="certificates" className="bg-glow-radial">
      <SectionHeader
        badge="Verified Credentials"
        title="Certifications &"
        highlightTitle="Accomplishments"
        subtitle="Industry-recognized certifications and professional credentials validating expertise in web application development, cloud hosting, and relational databases."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificatesData.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-accentSky/10 border border-accentSky/20 flex items-center justify-center text-accentSky group-hover:scale-110 transition-transform">
                  <FaCertificate className="w-5 h-5" />
                </div>
                <Badge variant="primary" size="xs">{cert.year}</Badge>
              </div>

              <h3 className="text-lg font-bold font-heading text-textLight group-hover:text-accentSky transition-colors">
                {cert.title}
              </h3>
              <p className="text-xs font-mono text-accentSky mt-1 mb-3">
                {cert.issuer}
              </p>

              <p className="text-xs text-textMuted font-body leading-relaxed mb-4 line-clamp-3">
                {cert.description}
              </p>

              <p className="text-[11px] font-mono text-textMuted/70 mb-4">
                ID: {cert.credentialId}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedCert(cert)}
                className="flex items-center gap-1.5 text-xs font-mono text-textMuted hover:text-textLight transition-colors"
              >
                <FaExpand className="w-3 h-3 text-accentSky" /> View Preview
              </button>

              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-accentSky hover:underline"
              >
                Verify <FaExternalLinkAlt className="w-2.5 h-2.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Certificate Preview Modal */}
      {selectedCert && (
        <Modal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          title={selectedCert.title}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-6">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-surfaceDark flex items-center justify-center">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surfaceDark via-transparent to-transparent opacity-60" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-bold font-heading text-textLight">
                  {selectedCert.title}
                </h4>
                <Badge variant="success">Verified Credential</Badge>
              </div>
              <p className="text-xs font-mono text-accentSky mb-3">
                Issued by: {selectedCert.issuer} &bull; {selectedCert.year}
              </p>
              <p className="text-sm text-textMuted font-body leading-relaxed">
                {selectedCert.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-textMuted">
                Credential ID: <span className="text-textLight">{selectedCert.credentialId}</span>
              </span>
              <Button
                variant="primary"
                href={selectedCert.verifyUrl}
                target="_blank"
                icon={FaExternalLinkAlt}
                iconPosition="right"
              >
                Verify Certificate
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </Section>
  );
};
