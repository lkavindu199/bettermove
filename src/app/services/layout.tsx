'use client'

import './styles.css'
import useScripts from '../../hooks/useScripts'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useScripts()

  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
        
        {/* Custom CSS */}
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body>
        <div id="mobile-menu-container"></div>
        {children}
      </body>
    </html>
  )
}