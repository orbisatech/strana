'use client'
import { useState, useEffect } from 'react'

const CAROUSEL_PHOTOS = [
  '/dj-01.jpeg',
  '/dj-02.jpeg',
  '/dj-03.jpeg',
  '/dj-04.jpeg',
  '/dj-05.jpeg',
  '/dj-06.jpeg',
  '/dj-07.jpeg',
]

export default function Events() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % CAROUSEL_PHOTOS.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const prev = () => setCurrent(p => (p - 1 + CAROUSEL_PHOTOS.length) % CAROUSEL_PHOTOS.length)
  const next = () => setCurrent(p => (p + 1) % CAROUSEL_PHOTOS.length)

  return (
    <section id="eventos" style={{ background: 'var(--black)', borderTop: '1px solid var(--border)' }}>
      <style>{`
        .event-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid var(--border);
        }
        .event-info-cell { padding: 3rem 2.5rem; }
        .carousel-btn {
          background: none;
          border: 1px solid rgba(240,237,230,0.2);
          color: var(--white);
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: border-color 0.3s, background 0.3s;
          font-size: 1rem;
        }
        .carousel-btn:hover { border-color: var(--gold); background: rgba(200,169,110,0.1); }
        @media (max-width: 768px) {
          .event-body { grid-template-columns: 1fr; }
          .event-info-cell { padding: 2rem 1.5rem; }
        }
      `}</style>

      <div style={{ padding: '4rem 2.5rem 2rem', display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.06em', color: 'var(--white)' }}>Upcoming Events</h2>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', color: 'var(--gold)' }}>01</span>
      </div>

      {/* Carrusel */}
      <div style={{ position: 'relative', height: '90vh', overflow: 'hidden' }}>
        {CAROUSEL_PHOTOS.map((src, i) => (
          <div key={src} style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.55)',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.9s ease',
          }} />
        ))}

        {/* Overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.2) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,8,0.6) 0%, transparent 60%)' }} />

        {/* Badge */}
        <div style={{ position: 'absolute', top: '2rem', left: '2.5rem', background: 'var(--gold)', color: 'var(--black)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.35rem 1rem', fontWeight: 600 }}>
          Opening Week
        </div>

        {/* Dots */}
        <div style={{ position: 'absolute', top: '2rem', right: '2.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {CAROUSEL_PHOTOS.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? '20px' : '6px',
              height: '6px',
              border: 'none',
              background: i === current ? 'var(--gold)' : 'rgba(240,237,230,0.3)',
              borderRadius: '3px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: 0,
            }} />
          ))}
        </div>

        {/* Arrows */}
        <div style={{ position: 'absolute', bottom: '7rem', right: '2.5rem', display: 'flex', gap: '0.5rem' }}>
          <button className="carousel-btn" onClick={prev}>←</button>
          <button className="carousel-btn" onClick={next}>→</button>
        </div>

        {/* Text */}
        <div style={{ position: 'absolute', bottom: '3rem', left: '2.5rem', right: '2.5rem' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.8rem' }}>
            Guadalajara · Grand Opening
          </p>
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 8vw, 8rem)', lineHeight: 0.9, letterSpacing: '0.02em', color: 'var(--white)', marginBottom: '1.5rem' }}>
            OPENING<br />WEEK
          </h3>
        </div>
      </div>

      {/* DJ + Details */}
      <div className="event-body">
        <div style={{ borderRight: '1px solid var(--border)' }}>
          <div style={{ padding: '2rem 2.5rem 1rem' }}>
            <p style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)' }}>Resident DJ</p>
          </div>
          <div style={{ padding: '1.5rem 2.5rem', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '100px 1fr', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--gold)', fontWeight: 300 }}>12:00 AM</span>
            <div>
              <p style={{ fontSize: '1rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.06em', color: 'var(--white)', marginBottom: '0.2rem' }}> DJ Alygor</p>
              <p style={{ fontSize: '0.6rem', color: 'var(--dim)', letterSpacing: '0.08em' }}>Open Format · Club</p>
            </div>
          </div>
        </div>
        <div className="event-info-cell">
          <p style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '2rem' }}>Details</p>
          {[
            ['Date', 'MAY'],
            ['Hours', '11:00 PM – 4:00 AM'],
            ['Dress Code', 'Formal / All Black'],
          ].map(([k, v]) => (
            <div key={k} style={{ marginBottom: '1.8rem', paddingBottom: '1.8rem', borderBottom: '1px solid var(--border)' }}>
              <p style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '0.4rem' }}>{k}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--white)', fontWeight: 300 }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}