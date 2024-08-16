import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { pageName, htmlContent } = req.body;

    const cleanedHtmlContent = htmlContent.replace(/<\/?body[^>]*>/g, '');

    const filePath = path.join(process.cwd(), 'pages', `${pageName}.js`);

    const fileContent = `
      import React from 'react';

      export default function ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}() {
        return (
          <>
            ${cleanedHtmlContent}
          </>
        );
      }
    `;

    fs.writeFileSync(filePath, fileContent);
    res.status(200).json({ message: 'Page created successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
