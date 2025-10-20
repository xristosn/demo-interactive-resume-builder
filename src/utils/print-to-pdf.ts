import htmlToPdf from 'html2pdf.js';

import { toaster } from '@/components/ui/toaster';

import { A4_DIMENSIONS } from '@/models/constants/paper-dimensions';

import { dataURIToBlobUrl } from './data-uri';

export async function printPDF(fileName: string) {
  try {
    const el = document.getElementById('preview');

    if (!el || !el.firstElementChild) return;

    Array.from(el.querySelectorAll('img')).forEach((imgEl) => {
      if (imgEl.src.startsWith('data:')) {
        imgEl.src = dataURIToBlobUrl(imgEl.src);
      }
    });

    return await htmlToPdf(el, {
      filename: `${fileName}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { dpi: 192, useCORS: true },
      enableLinks: true,
      jsPDF: {
        unit: 'mm',
        format: [pxToMm(A4_DIMENSIONS.width), pxToMm(el.scrollHeight)],
      },
    });
  } catch (err) {
    ['.html2pdf__overlay', '.html2canvas-container'].forEach((selector) =>
      document.querySelector(selector)?.remove()
    );

    console.error(err);

    toaster.error({
      closable: true,
      title: 'An error occured while creating the PDF',
      description: (err as Error)?.message || '',
    });
  }
}

function pxToMm(px: number) {
  return px * 0.264583;
}
