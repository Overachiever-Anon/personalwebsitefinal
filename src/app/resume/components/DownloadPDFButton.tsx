// src/app/resume/components/DownloadPDFButton.tsx
'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function DownloadPDFButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPDF = async () => {
    try {
      setIsGenerating(true);
      
      // Get the resume content element
      const resumeElement = document.getElementById('resume-content');
      if (!resumeElement) {
        console.error('Resume content element not found');
        return;
      }

      // Temporarily add a class for styling during PDF generation
      resumeElement.classList.add('generating-pdf');

      // Use html2canvas to convert the HTML to an image
      const canvas = await html2canvas(resumeElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Enable CORS for images
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Calculate dimensions for A4 paper
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Generate PDF filename with current date
      const date = new Date();
      const filename = `resume_${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}.pdf`;

      // Save the PDF
      pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('An error occurred while generating the PDF. Please try again.');
    } finally {
      // Remove the temporary class
      const resumeElement = document.getElementById('resume-content');
      if (resumeElement) {
        resumeElement.classList.remove('generating-pdf');
      }
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={downloadPDF}
      disabled={isGenerating}
      className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
      aria-label="Download resume as PDF"
    >
      <Download className="h-5 w-5" />
      <span>{isGenerating ? 'Generating...' : 'Download PDF'}</span>
    </button>
  );
}
