import React, { useEffect, useState } from 'react';

export default function WellKnown() {
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    fetch('/.well-known/apple-app-site-association')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((text) => setFileContent(text))
      .catch((error) => console.error('Error fetching file:', error));
  }, []);

  return (
    <div>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{fileContent}</pre>
    </div>
  );
}
