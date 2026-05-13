'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·'

function ScrambleText({ text, trigger, delay = 0 }) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    if (!trigger) return
    let timeout = setTimeout(() => {
      const chars = text.split('')
      let iteration = 0
      const total = chars.length * 4
      const interval = setInterval(() => {
        setDisplay(
          chars.map((char, i) => {
            if (char === ' ') return ' '
            if (iteration >= (i + 1) * 4) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          }).join('')
        )
        iteration++
        if (iteration >= total) {
          clearInterval(interval)
          setDisplay(text)
        }
      }, 25)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [trigger, text, delay])

  return <span>{display}</span>
}

export default function Hero() {
  const sectionRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [phase, setPhase] = useState('black')
  const [wordIndex, setWordIndex] = useState(-1)
  const [showLogo, setShowLogo] = useState(false)
  const [hidWelcome, setHidWelcome] = useState(false)
  const [videoOpacity, setVideoOpacity] = useState(0)
  const [scrambleTrigger, setScrambleTrigger] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setWordIndex(0), 400)
    const t2 = setTimeout(() => setVideoOpacity(0.45), 1200)
    const t3 = setTimeout(() => setHidWelcome(true), 2400)
    const t4 = setTimeout(() => setShowLogo(true), 3100)
    const t5 = setTimeout(() => setScrambleTrigger(true), 3600)
    const t6 = setTimeout(() => setPhase('done'), 4200)
    return () => [t1, t2, t3, t4, t5, t6].forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const progress = Math.min(scrollY / (vh * 0.8), 1)
  const logoOpacity = Math.max(1 - progress * 2, 0)
  const logoScale = 1 - progress * 0.08

  return (
    <section ref={sectionRef} style={{ position: 'relative', height: '200vh', background: '#080808' }}>
      <style>{`
        @keyframes welcomeIn {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .logo-float { animation: floatY 5s ease-in-out infinite; }
        .event-corner {
          position: absolute; bottom: 56px; right: 44px;
          display: flex; flex-direction: column; align-items: flex-end; gap: 4px;
          z-index: 12; pointer-events: none;
          animation: fadeLeft 1s 4s both;
        }
        .event-corner-date {
          font-family: 'DM Sans', sans-serif;
          font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(240,237,230,0.3);
        }
        .event-corner-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px; letter-spacing: 0.14em;
          color: rgba(240,237,230,0.85);
        }
        .event-corner-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 8px; letter-spacing: 0.28em; text-transform: uppercase;
          color: var(--gold);
        }
        @media (max-width: 768px) {
          .event-corner { display: none !important; }
          .immersive-text { font-size: 0.55rem !important; white-space: normal !important; padding: 0 24px; }
          .immersive-date { font-size: 0.42rem !important; }
          .welcome-line { font-size: clamp(2.5rem, 10vw, 5rem) !important; }
        }
      `}</style>

      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#080808',
      }}>

        {/* Video bg */}
        <video autoPlay muted loop playsInline style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: videoOpacity,
          zIndex: 1,
          transition: 'opacity 1.8s ease',
        }}>
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(8,8,8,0.55)',
          zIndex: 2,
          opacity: videoOpacity > 0 ? 1 : 0,
          transition: 'opacity 1.8s ease',
        }} />

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '42%',
          background: 'linear-gradient(to bottom, transparent, #080808)',
          zIndex: 5, pointerEvents: 'none',
        }} />

        {/* WELCOME TO */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 20,
          textAlign: 'center',
          opacity: wordIndex >= 0 && !hidWelcome ? 1 : 0,
          transition: hidWelcome ? 'opacity 0.7s ease' : 'opacity 0.7s ease',
          pointerEvents: 'none',
          width: '100%',
          padding: '0 24px',
        }}>
          <p className="welcome-line" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2.8rem, 10vw, 6.5rem)',
            letterSpacing: '0.06em',
            color: 'rgba(240,237,230,0.9)',
            lineHeight: 1,
            animation: wordIndex >= 0 ? 'welcomeIn 0.85s cubic-bezier(0.16,1,0.3,1) both' : 'none',
          }}>
            WELCOME TO
          </p>
        </div>

        {/* LOGO */}
        {showLogo && (
          <div style={{
            position: 'relative', zIndex: 10,
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            pointerEvents: logoOpacity < 0.1 ? 'none' : 'all',
            animation: 'logoIn 1s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            <div className={phase === 'done' && progress < 0.1 ? 'logo-float' : ''}>
              <video
                autoPlay muted loop playsInline
                style={{
                width: 'clamp(140px, 18vw, 260px)',
                height: 'auto',
                filter: 'drop-shadow(0 0 60px rgba(200,169,110,0.3)) drop-shadow(0 0 120px rgba(200,169,110,0.1))',
              }}
              >
  <source src="/logo-animated.webm" type="video/webm" />
  <img src="/logo.png" alt="STRANA" style={{ width: 'clamp(140px, 18vw, 260px)', height: 'auto' }} />
</video>
            </div>

            {/* Texto dorado scramble */}
            <p style={{
              fontSize: 'clamp(0.5rem, 1vw, 0.65rem)',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginTop: '1rem',
              marginBottom: '2.5rem',
              opacity: Math.max(1 - progress * 3, 0),
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
            }}>
              <ScrambleText
                text="GUADALAJARA · MÉXICO · OPENING 2026"
                trigger={scrambleTrigger}
                delay={0}
              />
            </p>

            <div style={{
              display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center',
              opacity: Math.max(1 - progress * 3, 0),
            }}>
              <button
                onClick={() => document.getElementById('eventos')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ background: 'var(--white)', color: 'var(--black)', fontFamily: "'DM Sans',sans-serif", fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, padding: '0.9rem 2.5rem', border: 'none', transition: 'background 0.3s', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--white)'}
              >See Events</button>
            </div>
          </div>
        )}

        {/* Bottom-right event info */}
        <div className="event-corner" style={{
          opacity: logoOpacity * Math.max(1 - progress * 3, 0),
        }}>
          <span className="event-corner-date">Upcoming · May 21/22/23  2026</span>
          <span className="event-corner-name">OPENING WEEK</span>
          <span className="event-corner-sub">DJ Alygor · 11 PM – 4 AM</span>
        </div>

        {/* Texto inmersivo al hacer scroll */}
        <div style={{
          position: 'absolute',
          bottom: '10vh', left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 10,
          opacity: phase === 'done' ? Math.min(progress * 2.5, 1) : 0,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}>
          <p className="immersive-text" style={{
            fontSize: '1rem',
            letterSpacing: '0.12em',
            color: '#ffffff',
            marginBottom: '0.5rem',
            fontFamily: "'DM Sans', sans-serif",
            textShadow: '0 0 30px rgba(255,255,255,0.4)',
          }}>
            Get ready for the ultimate immersive experience.
          </p>
          <p className="immersive-date" style={{
            fontSize: '0.75rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            textShadow: '0 0 20px rgba(200,169,110,0.6)',
          }}>
            May 21/22/23     2026
          </p>
        </div>

        {/* Scroll hint */}
        {progress < 0.05 && phase === 'done' && (
          <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.52rem', letterSpacing: '0.25em', color: 'var(--dim)', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>Scroll</span>
            <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--dim), transparent)' }} />
          </div>
        )}
      </div>
    </section>
  )
}