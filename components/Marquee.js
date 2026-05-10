'use client'
export default function Marquee() {
  const items = ['STRANA GDL', 'Club & Venue', 'Guadalajara', 'NFC VIP Access', 'Unique Experiences', 'Exclusive Zone', 'Techno · House · Electronic']
  const repeated = [...items, ...items]
  return (
    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '1rem 0', overflow: 'hidden', background: 'var(--black)' }}>
      <div className="marquee-track" style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap', width: 'max-content' }}>
        {repeated.map((item, i) => (
          <span key={i} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.2em', color: i % 2 === 0 ? 'var(--dim)' : 'var(--gold)' }}>
            {item} <span style={{ color: 'var(--border)', margin: '0 1rem' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
