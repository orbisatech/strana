'use client'

export default function Events() {
  return (
    <section id="eventos" style={{ background: 'var(--black)', borderTop: '1px solid var(--border)' }}>
      <style>{`
        .event-hero {
          position: relative;
          height: 90vh;
          overflow: hidden;
        }
        .event-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid var(--border);
        }
        .event-info-cell { padding: 3rem 2.5rem; }
        @media (max-width: 768px) {
          .event-hero { height: 70vh; }
          .event-body { grid-template-columns: 1fr; }
          .event-info-cell { padding: 2rem 1.5rem; }
        }
      `}</style>

      {/* Encabezado */}
      <div style={{ padding: '4rem 2.5rem 2rem', display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.06em', color: 'var(--white)' }}>
          Próximos Eventos
        </h2>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', color: 'var(--gold)' }}>01</span>
      </div>

      {/* Hero del evento */}
      <div className="event-hero">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/venue-09.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.55)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.3) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,8,0.7) 0%, transparent 60%)' }} />

        <div style={{ position: 'absolute', top: '2rem', left: '2.5rem', background: 'var(--gold)', color: 'var(--black)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.35rem 1rem', fontWeight: 600 }}>
          Opening Week
        </div>

        <div style={{ position: 'absolute', bottom: '3rem', left: '2.5rem', right: '2.5rem' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.8rem' }}>
            Guadalajara · Reapertura
          </p>
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 8vw, 8rem)', lineHeight: 0.9, letterSpacing: '0.02em', color: 'var(--white)', marginBottom: '1.5rem' }}>
            OPENING<br />WEEK
          </h3>
          <a href="#" style={{ display: 'inline-block', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--black)', background: 'var(--white)', padding: '0.9rem 2.5rem', textDecoration: 'none', transition: 'background 0.3s' }}
            onMouseEnter={e => e.target.style.background = 'var(--gold)'}
            onMouseLeave={e => e.target.style.background = 'var(--white)'}
          >Conseguir Entradas →</a>
        </div>
      </div>

      {/* DJ Alego + Detalles */}
      <div className="event-body">
        {/* DJ Alego */}
        <div style={{ borderRight: '1px solid var(--border)' }}>
          <div style={{ padding: '2rem 2.5rem 1rem' }}>
            <p style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)' }}>Artista Principal</p>
          </div>
          <div style={{ padding: '1.5rem 2.5rem', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '100px 1fr', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--gold)', fontWeight: 300 }}>12:00 AM</span>
            <div>
              <p style={{ fontSize: '1rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.06em', color: 'var(--white)', marginBottom: '0.2rem' }}>Beats by DJ Alego</p>
              <p style={{ fontSize: '0.6rem', color: 'var(--dim)', letterSpacing: '0.08em' }}>Open Format · Club</p>
            </div>
          </div>
        </div>

        {/* Detalles */}
        <div className="event-info-cell">
          <p style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '2rem' }}>Detalles</p>
          {[
            ['Fecha',    'Por confirmar · Reapertura'],
            ['Horario',  '22:00 – 06:00'],
            ['Dress Code','Formal / All Black'],
            ['Entradas', 'Preventa disponible pronto'],
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
