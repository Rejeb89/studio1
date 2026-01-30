'use client';

export const downloadAsDoc = (content: string, filename: string) => {
  // Create a more structured HTML content for better DOC conversion.
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${filename}</title>
      <style>
        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 12pt;
          line-height: 1.5;
        }
        p {
          margin-bottom: 1em;
        }
      </style>
    </head>
    <body>
      ${content.split('\n').map(para => `<p>${para}</p>`).join('')}
    </body>
    </html>
  `;
  const blob = new Blob([htmlContent], { type: 'application/msword' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  
  // Append to body to make it clickable, then click, then remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up the object URL to free memory
  URL.revokeObjectURL(link.href);
};
