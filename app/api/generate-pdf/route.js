import puppeteer from 'puppeteer';

export const POST = async (req) => {
  try {
    const { html } = await req.json();

    if (!html) {
      console.error('HTML content is missing in the request body.');
      return new Response(JSON.stringify({ error: 'HTML content is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Launching Puppeteer...');
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });

    const page = await browser.newPage();
    console.log('Setting content...');
    await page.setContent(html, { waitUntil: 'networkidle0' });

    console.log('Generating PDF...');
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    console.log('PDF generated successfully.');
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate PDF', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
