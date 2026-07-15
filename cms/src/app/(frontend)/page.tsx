import Link from 'next/link'
import React from 'react'

import './styles.css'

export default async function HomePage() {
  return (
    <div className="cms-home">
      <div>
        <p className="eyebrow">Pixel na Warstwie</p>
        <h1>CMS bloga</h1>
        <p>
          Ta aplikacja obsługuje treści blogowe, media, kategorie i tagi. Publiczny frontend
          może pobierać wpisy z API Payloada.
        </p>
      </div>
      <div className="links">
        <Link className="primary" href="/admin">
          Otwórz panel
        </Link>
        <a href="/api/posts?depth=2&limit=10" rel="noopener noreferrer" target="_blank">
          API wpisów
        </a>
      </div>
    </div>
  )
}
