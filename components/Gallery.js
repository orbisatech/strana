'use client'

export default function Gallery() {
  return (
    <section id="galeria" style={{ padding: '5rem 0', borderTop: '1px solid var(--border)', background: 'var(--black)' }}>
      <div style={{ padding: '0 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '3rem', letterSpacing: '0.06em', color: 'var(--white)' }}>El Universo</h2>
      </div>

      {/* Video inmersivo */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
        <video
          autoPlay muted loop playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>

        {/* Overlay con texto */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(8,8,8,0.45)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '2rem',
        }}>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.8rem)',
            letterSpacing: '0.08em',
            color: 'var(--white)',
            fontFamily: "'DM Sans', sans-serif",
            maxWidth: '700px',
            lineHeight: 1.7,
            marginBottom: '1.5rem',
            textShadow: '0 0 40px rgba(255,255,255,0.2)',
          }}>
            Un espacio donde la arquitectura, la tecnología y el arte convergen para crear experiencias únicas.
          </p>
          <span style={{
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            textShadow: '0 0 20px rgba(200,169,110,0.5)',
          }}>
            Guadalajara · México
          </span>
        </div>

        {/* Gradientes laterales */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,8,0.4) 0%, transparent 20%, transparent 80%, rgba(8,8,8,0.4) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to bottom, transparent, var(--black))', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '20%', background: 'linear-gradient(to top, transparent, var(--black))', pointerEvents: 'none' }} />
      </div>
    </section>
  )
}