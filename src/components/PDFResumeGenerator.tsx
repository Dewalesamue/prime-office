/**
 * PDF RESUME GENERATOR COMPONENT
 * Generates and downloads a PDF version of the resume
 * Uses HTML to PDF conversion for consistent formatting
 * 
 * CUSTOMIZATION NOTES:
 * - Update all personal information and content
 * - Modify styling and layout as needed
 * - Replace contact details with your own
 */

import React from 'react';
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { jsPDF } from 'jspdf';

interface PDFResumeGeneratorProps {
  personalInfo: {
    name: string;
    nickname: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    website: string;
    linkedin: string;
    github: string;
    summary: string;
  };
  workExperience: Array<{
    position: string;
    company: string;
    location: string;
    duration: string;
    responsibilities: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    location: string;
    duration: string;
    honors: string;
    achievements: string[];
  }>;
  skills: {
    frontend: string[];
    backend: string[];
    ai: string[];
    tools: string[];
    soft: string[];
  };
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    id: string;
  }>;
}

export function PDFResumeGenerator({
  personalInfo,
  workExperience,
  education,
  skills,
  certifications
}: PDFResumeGeneratorProps) {

  /**
   * GENERATE PDF RESUME HANDLER
   * Creates a PDF version of the resume and triggers a direct download
   */
  const generatePDFResume = () => {
    try {
      const doc = new jsPDF({ unit: 'pt', format: 'letter', orientation: 'portrait' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 36;
      let y = margin;

      const addText = (text: string, fontSize = 10, style: 'normal' | 'bold' | 'italic' = 'normal') => {
        if (y > pageHeight - margin - 20) {
          doc.addPage();
          y = margin;
        }

        doc.setFont('helvetica', style);
        doc.setFontSize(fontSize);
        const lines = doc.splitTextToSize(text || '', pageWidth - (margin * 2));
        lines.forEach((line: string) => {
          if (y > pageHeight - margin - 12) {
            doc.addPage();
            y = margin;
          }
          doc.text(line, margin, y);
          y += fontSize * 1.35;
        });
      };

      const addBulletPoints = (items: string[]) => {
        items.forEach((item) => {
          addText(`• ${item}`);
        });
      };

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(24);
      doc.text(personalInfo.name, margin, y);
      y += 28;

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(12);
      doc.text(`"${personalInfo.nickname}"`, margin, y);
      y += 18;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.text(`${personalInfo.title}`, margin, y);
      y += 18;
      doc.text(`${personalInfo.location} • ${personalInfo.email} • ${personalInfo.phone}`, margin, y);
      y += 24;

      addText('Professional Summary', 14, 'bold');
      addText(personalInfo.summary || 'No summary provided yet.');
      y += 8;

      addText('Work Experience', 14, 'bold');
      workExperience.length > 0 ? workExperience.forEach((job) => {
        addText(`${job.position} — ${job.company}`, 11, 'bold');
        addText(`${job.duration} • ${job.location}`);
        addBulletPoints(job.responsibilities);
        y += 6;
      }) : addText('No work experience listed.');
      y += 6;

      addText('Education', 14, 'bold');
      education.length > 0 ? education.forEach((edu) => {
        addText(`${edu.degree} — ${edu.institution}`, 11, 'bold');
        addText(`${edu.duration} • ${edu.location}`);
        addText(edu.honors || '');
        addBulletPoints(edu.achievements);
        y += 6;
      }) : addText('No education details listed.');
      y += 6;

      addText('Technical Skills', 14, 'bold');
      addText(`Frontend: ${skills.frontend.join(', ') || 'N/A'}`);
      addText(`Backend & Auth: ${skills.backend.join(', ') || 'N/A'}`);
      addText(`Generative AI: ${skills.ai.join(', ') || 'N/A'}`);
      addText(`Tools: ${skills.tools.join(', ') || 'N/A'}`);
      addText(`Soft Skills: ${skills.soft.join(', ') || 'N/A'}`);
      y += 6;

      addText('Certifications', 14, 'bold');
      certifications.length > 0 ? certifications.forEach((cert) => {
        addText(`${cert.name} — ${cert.issuer}`, 11, 'bold');
        addText(`${cert.date} • ID: ${cert.id}`);
      }) : addText('No certifications listed.');

      doc.save(`${personalInfo.name}_Resume.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Unable to generate PDF. Please try again.');
    }
  };

  return (
    <Button
      onClick={generatePDFResume}
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      Download PDF
    </Button>
  );
}