'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·'

function ScrambleText({ text, trigger, delay = 0 }) {
  const [display, setDisplay] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!trigger) return
    let timeout = setTimeout(() => {
      const chars = text.split('')
      let iteration = 0
      const total = chars.length * 3
      const interval = setInterval(() => {
        setDisplay(
          chars.map((char, i) => {
            if (char === ' ') return ' '
            if (iteration >= (i + 1) * 3) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          }).join('')
        )
        iteration++
        if (iteration >= total) {
          clearInterval(interval)
          setDisplay(text)
          setDone(true)
        }
      }, 40)
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
  const [showWelcome, setShowWelcome] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const [hidWelcome, setHidWelcome] = useState(false)
  const [videoOpacity, setVideoOpacity] = useState(0)
  const [scrambleTrigger, setScrambleTrigger] = useState(false)

  useEffect(() => {
    // 0.4s — aparece "WELCOME TO"
    const t1 = setTimeout(() => setShowWelcome(true), 400)
    // 1.4s — aparece logo + video
    const t2 = setTimeout(() => {
      setShowLogo(true)
      setVideoOpacity(0.38)
    }, 1400)
    // 2.4s — desaparece "WELCOME TO"
    const t3 = setTimeout(() => setHidWelcome(true), 2400)
    // 2.8s — scramble del texto dorado
    const t4 = setTimeout(() => setScrambleTrigger(true), 2800)
    // 3.2s — fase done
    const t5 = setTimeout(() => setPhase('done'), 3200)
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout)
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
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
        .logo-float { animation: floatY 5s ease-in-out infinite; }
        @media (max-width: 768px) {
          .immersive-text { font-size: 0.55rem !important; }
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
          transition: 'opacity 1.5s ease',
        }}>
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(8,8,8,0.55)',
          zIndex: 1,
          opacity: videoOpacity > 0 ? 1 : 0,
          transition: 'opacity 1.5s ease',
        }} />

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
          background: 'linear-gradient(to bottom, transparent, #080808)',
          zIndex: 5, pointerEvents: 'none',
        }} />

        {/* WELCOME TO — una sola línea, desaparece después */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 20,
          textAlign: 'center',
          opacity: showWelcome && !hidWelcome ? 1 : 0,
          transition: hidWelcome ? 'opacity 0.6s ease' : 'opacity 0.7s ease',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}>
          <p className="welcome-line" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            letterSpacing: '0.06em',
            color: '#ffffff',
            lineHeight: 1,
            animation: showWelcome ? 'welcomeIn 0.7s cubic-bezier(0.16,1,0.3,1) both' : 'none',
          }}>
            WELCOME TO
          </p>
        </div>

        {/* LOGO — aparece encima del WELCOME TO y se queda */}
        {showLogo && (
          <div style={{
            position: 'relative', zIndex: 10,
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            pointerEvents: logoOpacity < 0.1 ? 'none' : 'all',
            animation: 'logoIn 0.8s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            <div className={phase === 'done' && progress < 0.1 ? 'logo-float' : ''}>
              <Image
                src="/logo.png"
                alt="STRANA"
                width={400}
                height={400}
                style={{
                  width: 'clamp(140px, 18vw, 260px)',
                  height: 'auto',
                  filter: 'drop-shadow(0 0 60px rgba(200,169,110,0.3)) drop-shadow(0 0 120px rgba(200,169,110,0.1))',
                }}
                priority
              />
            </div>

            {/* Texto dorado con efecto scramble */}
            <p style={{
              fontSize: 'clamp(0.5rem, 1vw, 0.65rem)',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginTop: '1rem',
              marginBottom: '2.5rem',
              opacity: Math.max(1 - progress * 3, 0),
              fontFamily: "'DM Sans', sans-serif",
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

        {/* Texto inmersivo — aparece al hacer scroll */}
        <div style={{
          position: 'absolute',
          bottom: '10vh',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 10,
          opacity: phase === 'done' ? Math.min(progress * 2.5, 1) : 0,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}>
          <p className="immersive-text" style={{ fontSize: '1rem', letterSpacing: '0.12em', color: '#ffffff', marginBottom: '0.5rem', fontFamily: "'DM Sans', sans-serif", textShadow: '0 0 30px rgba(255,255,255,0.4)' }}>
            Get ready for the ultimate immersive experience.
          </p>
          <p className="immersive-date" style={{ fontSize: '0.75rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', textShadow: '0 0 20px rgba(200,169,110,0.6)' }}>
            May 2026
          </p>
        </div>

        {/* Scroll hint */}
        {progress < 0.05 && phase === 'done' && (
          <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.52rem', letterSpacing: '0.25em', color: 'var(--dim)', textTransform: 'uppercase' }}>Scroll</span>
            <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--dim), transparent)' }} />
          </div>
        )}
      </div>
    </section>
  )
}