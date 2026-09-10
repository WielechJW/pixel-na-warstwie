import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Panel CMS dla bloga Pixel na Warstwie.',
  title: 'Pixel na Warstwie CMS',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="pl">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
