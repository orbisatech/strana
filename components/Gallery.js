'use client'
import { useState } from 'react'

// Solo las 6 fotos del screenshot (sin cabezas)
const PHOTOS = [
  { src: '/venue-07.jpg', span: 2 },
  { src: '/venue-04.jpg', span: 1 },
  { src: '/venue-13.jpg', span: 1 },
  { src: '/venue-06.jpg', span: 1 },
  { src: '/venue-15.jpg', span: 1 },
  { src: '/venue-16.jpg', span: 2 },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="galeria" style={{ padding: '5rem 0', borderTop: '1px solid var(--border)', background: 'var(--black)' }}>
      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px; padding: 0 2px;
        }
        .gallery-cell-wide   { grid-column: span 2; aspect-ratio: 16/9; }
        .gallery-cell-narrow { grid-column: span 1; aspect-ratio: 3/4; }
        @media (max-width: 768px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
          .gallery-cell-wide   { aspect-ratio: 4/3; }
          .gallery-cell-narrow { aspect-ratio: 1/1; }
        }
      `}</style>

      <div style={{ padding:'0 1.5rem', marginBottom:'2rem', display:'flex', alignItems:'baseline', gap:'1rem' }}>
        <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'3rem', letterSpacing:'0.06em', color:'var(--white)' }}>El Universo</h2>
        <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.5rem', color:'var(--gold)' }}>{String(PHOTOS.length).padStart(2,'0')}</span>
      </div>

      <div className="gallery-grid">
        {PHOTOS.map((photo, i) => (
          <div key={i}
            className={photo.span === 2 ? 'gallery-cell-wide' : 'gallery-cell-narrow'}
            onClick={() => setLightbox(photo.src)}
            style={{ position:'relative', overflow:'hidden', background:'#111', cursor:'pointer' }}
            onMouseEnter={e => {
              e.currentTarget.querySelector('.gi').style.transform = 'scale(1.06)'
              e.currentTarget.querySelector('.go').style.opacity = '1'
            }}
            onMouseLeave={e => {
              e.currentTarget.querySelector('.gi').style.transform = 'scale(1)'
              e.currentTarget.querySelector('.go').style.opacity = '0'
            }}
          >
            <div className="gi" style={{ position:'absolute', inset:0, backgroundImage:`url(${photo.src})`, backgroundSize:'cover', backgroundPosition:'center', transition:'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }} />
            <div className="go" style={{ position:'absolute', inset:0, background:'rgba(200,169,110,0.08)', opacity:0, transition:'opacity 0.4s', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontSize:'0.6rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--gold)', border:'1px solid var(--gold)', padding:'0.5rem 1rem' }}>Ver</span>
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position:'fixed', inset:0, zIndex:999, background:'rgba(8,8,8,0.97)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
          <div style={{ position:'relative' }}>
            <img src={lightbox} alt="STRANA" style={{ maxWidth:'90vw', maxHeight:'90vh', objectFit:'contain', border:'1px solid var(--border)' }} />
            <button onClick={() => setLightbox(null)} style={{ position:'absolute', top:'-2.5rem', right:0, background:'none', border:'none', color:'var(--dim)', fontSize:'0.65rem', letterSpacing:'0.18em', textTransform:'uppercase', cursor:'pointer' }}>Cerrar ×</button>
          </div>
        </div>
      )}
    </section>
  )
}
