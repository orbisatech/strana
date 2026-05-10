'use client'
export default function Location() {
  const LAT = 20.69742
  const LNG = -103.38209
  const ADDRESS = 'Av. Pablo Neruda 2715, Providencia 2a. Secc, Guadalajara, Jal.'
  return (
    <section id="ubicacion" style={{ padding: '5rem 0', borderTop: '1px solid var(--border)' }}>
      <style>{`
        .location-info { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--border); }
        .location-info-cell { padding: 2rem 2.5rem; border-right: 1px solid var(--border); }
        @media (max-width: 768px) { .location-info { grid-template-columns: 1fr; } .location-info-cell { border-right: none; border-bottom: 1px solid var(--border); padding: 1.5rem; } }
      `}</style>
      <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '3rem', letterSpacing: '0.06em', color: 'var(--white)' }}>Location</h2>
      </div>
      <div style={{ height: '380px', position: 'relative', overflow: 'hidden' }}>
        <iframe src={`https://maps.google.com/maps?q=${LAT},${LNG}&z=15&output=embed`} width="100%" height="100%" style={{ border: 'none', filter: 'grayscale(1) invert(1) contrast(0.9) brightness(0.8)' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'rgba(200,169,110,0.04)', mixBlendMode: 'color' }} />
      </div>
      <div className="location-info">
        {[['Address', ADDRESS], ['Hours', 'Thu – Sat · 11:00 PM – 3:00 AM'], ['Contact', 'correo@correo.com']].map(([key, val]) => (
          <div key={key} className="location-info-cell">
            <p style={{ fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.7rem' }}>{key}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--dim)', lineHeight: 1.7, fontWeight: 300 }}>{val}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
