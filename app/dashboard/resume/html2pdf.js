// html2pdf.js .

function html2pdf() {
    const options = {
      margin: [10, 10, 10, 10],
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
  
    function set(opts) {
      Object.assign(options, opts);
      return this;
    }
  
    function from(element) {
      options.element = element;
      return this;
    }
  
    async function save() {
      const { default: jsPDF } = await import('jspdf');
      const { default: html2canvas } = await import('html2canvas');
  
      const { margin, filename, image, html2canvas: html2canvasOptions, jsPDF: jsPDFOptions, element } = options;
  
      const canvas = await html2canvas(element, html2canvasOptions);
      const imgData = canvas.toDataURL('image/jpeg', image.quality);
  
      const pdf = new jsPDF(jsPDFOptions);
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth() - margin[1] - margin[3];
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, 'JPEG', margin[1], margin[0], pdfWidth, pdfHeight);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = pdf.output('bloburl');
      link.download = filename;
  
      // Programmatically click the link to trigger the download
      link.click();
  
      // Clean up the temporary link element
      link.remove();
    }
  
    return {
      set,
      from,
      save,
    };
  }
  
  export default html2pdf;