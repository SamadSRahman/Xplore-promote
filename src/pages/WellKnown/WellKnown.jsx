import React from 'react'

export default function WellKnown() {
  return (
    <div>

    <iframe 
      src="/.well-known/apple-app-site-association" 
      style={{ width: '100vw', height: '100vh', border: 'none' }} 
      title="Well Known File"
    ></iframe>
  </div>
  )
}
