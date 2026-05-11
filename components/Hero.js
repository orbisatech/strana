'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const sectionRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [phase, setPhase] = useState('black')
  const [wordIndex, setWordIndex] = useState(-1)
  const [videoOpacity, setVideoOpacity] = useState(0)

  const words = ['WELCOME', 'TO', 'STRANA']

  useEffect(() => {
    const t1 = setTimeout(() => setWordIndex(0), 400)
    const t2 = setTimeout(() => setWordIndex(1), 1100)
    const t3 = setTimeout(() => setWordIndex(2), 1800)
    // Video empieza a aparecer cuando sale STRANA
    const t4 = setTimeout(() => setVideoOpacity(0.35), 2000)
    const t5 = setTimeout(() => setPhase('logo-in'), 2800)
    const t6 = setTimeout(() => setPhase('done'), 4000)
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
  const logoScale = 1 - progress * 0.1

  const welcomeOpacity = phase === 'logo-in' || phase === 'done' ? 0 : 1
  const welcomeTransform = phase === 'logo-in' || phase === 'done' ? 'translateY(-30px)' : 'translateY(0)'

  return (
    <section ref={sectionRef} style={{ position: 'relative', height: '200vh', background: '#080808' }}>
      <style>{`
        @keyframes logoIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
        .logo-float { animation: floatY 5s ease-in-out infinite; }
        .logo-enter { animation: logoIn 1s cubic-bezier(0.16,1,0.3,1) both; }
        @media (max-width: 768px) {
          .immersive-text { font-size: 0.7rem !important; }
          .immersive-date { font-size: 0.55rem !important; }
        }
      `}</style>

      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#080808',
      }}>

        {/* Video bg — empieza en 0 y sube gradualmente */}
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

        {/* WELCOME TO STRANA */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          zIndex: 10,
          opacity: welcomeOpacity,
          transform: welcomeTransform,
          transition: 'opacity 0.9s ease, transform 0.9s ease',
          pointerEvents: 'none',
        }}>
          {words.map((word, i) => (
            <div key={word} style={{ overflow: 'hidden', lineHeight: 0.88 }}>
              <span style={{
                display: 'block',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(3.5rem, 14vw, 11rem)',
                letterSpacing: '0.02em',
                color: '#ffffff',
                opacity: wordIndex >= i ? 1 : 0,
                transform: wordIndex >= i ? 'translateY(0)' : 'translateY(100%)',
                transition: 'opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)',
              }}>
                {word}
              </span>
            </div>
          ))}
          <p style={{
            fontSize: '0.65rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginTop: '1.5rem',
            opacity: wordIndex >= 2 ? 1 : 0,
            transform: wordIndex >= 2 ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
          }}>
            Guadalajara · México · Opening 2026
          </p>
        </div>

        {/* Texto inmersivo — solo visible al hacer scroll */}
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

        {/* LOGO */}
        <div style={{
          position: 'relative', zIndex: 10,
          opacity: phase === 'logo-in' || phase === 'done' ? logoOpacity : 0,
          transform: `scale(${logoScale})`,
          display: phase === 'logo-in' || phase === 'done' ? 'flex' : 'none',
          flexDirection: 'column', alignItems: 'center',
          pointerEvents: logoOpacity < 0.1 ? 'none' : 'all',
        }}>
          <div className={`logo-enter ${phase === 'done' && progress < 0.1 ? 'logo-float' : ''}`}>
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

          <p style={{
            fontSize: 'clamp(0.5rem, 1vw, 0.65rem)',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginTop: '1rem',
            marginBottom: '2.5rem',
            opacity: Math.max(1 - progress * 3, 0),
          }}>
            Guadalajara, México · Opening 2026
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