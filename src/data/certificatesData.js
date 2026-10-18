import { certificatesList } from '../components/sections/certificatesData';

export const certificatesData = certificatesList.map((cert, index) => ({
  id: cert.id || index + 1,
  title: cert.title,
  organization: cert.organization,
  duration: cert.duration,
  description: cert.description,
  image_url: cert.fileUrl || '/assets/NPTEL26CS84S46490101104522103.pdf',
  award: cert.award,
  category: cert.category,
  skills: cert.skills,
  display_order: index + 1
}));
