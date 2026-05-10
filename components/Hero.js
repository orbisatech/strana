'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const sectionRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [phase, setPhase] = useState('black')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('logo-in'), 200)
    const t2 = setTimeout(() => setPhase('done'), 1400)
    return () => [t1, t2].forEach(clearTimeout)
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

  const photoScale = 0.65 + progress * 0.45
  const leftX = -22 - progress * 20
  const rightX = 22 + progress * 20
  const photoOpacity = Math.min(0.5 + progress * 0.8, 1)
  const centerY = 10 - progress * 15

  return (
    <section ref={sectionRef} style={{ position: 'relative', height: '200vh', background: '#080808' }}>
      <style>{`
        @keyframes logoIn { from{opacity:0;transform:scale(0.6) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes floatY { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        .logo-float { animation: floatY 5s ease-in-out infinite; }
        .welcome-text { animation: fadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
        .sub-text { animation: fadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 0.6s both; }
        .btn-anim { animation: fadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 0.9s both; }
      `}</style>

      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>

        {/* Video bg */}
        <video autoPlay muted loop playsInline style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', opacity: 0.4, zIndex: 1,
        }}>
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,8,0.55)', zIndex: 1 }} />

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
          background: 'linear-gradient(to bottom, transparent, #080808)',
          zIndex: 5, pointerEvents: 'none',
        }} />

        {/* 3 FOTOS — más nítidas */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2,
        }}>
          {/* Izquierda */}
          <div style={{
            position: 'absolute',
            width: 'clamp(120px, 22vw, 300px)',
            aspectRatio: '2/3',
            transform: `translateX(${leftX}vw) translateY(${centerY}px) scale(${photoScale})`,
            opacity: photoOpacity,
            transition: 'none',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
          }}>
            <img src="/people-01.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', filter: 'brightness(0.9) contrast(1.05)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.6) 0%, transparent 50%)' }} />
          </div>

          {/* Centro */}
          <div style={{
            position: 'absolute',
            width: 'clamp(200px, 35vw, 500px)',
            aspectRatio: '16/10',
            transform: `translateY(${30 - progress * 35}vh) scale(${0.45 + progress * 0.65})`,
            opacity: Math.min(progress * 2, 1),
            transition: 'none',
            overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(0,0,0,0.9)',
          }}>
            <img src="/venue-13.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.95) contrast(1.1) saturate(1.1)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.5) 0%, transparent 50%)' }} />
          </div>

          {/* Derecha */}
          <div style={{
            position: 'absolute',
            width: 'clamp(120px, 22vw, 300px)',
            aspectRatio: '2/3',
            transform: `translateX(${rightX}vw) translateY(${centerY}px) scale(${photoScale})`,
            opacity: photoOpacity,
            transition: 'none',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
          }}>
            <img src="/people-02.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', filter: 'brightness(0.9) contrast(1.05)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.6) 0%, transparent 50%)' }} />
          </div>

          {/* Texto inmersivo — aparece con scroll */}
          <div style={{
            position: 'absolute',
            bottom: '10vh',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: 10,
            opacity: Math.min(progress * 2.5, 1),
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}>
            <p style={{ fontSize: '1rem', letterSpacing: '0.12em', color: '#ffffff', marginBottom: '0.5rem', fontFamily: "'DM Sans', sans-serif", textShadow: '0 0 30px rgba(255,255,255,0.4)' }}>
              Get ready for the ultimate immersive experience.
            </p>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', textShadow: '0 0 20px rgba(200,169,110,0.6)' }}>
              May 2026
            </p>
          </div>
        </div>

        {/* LOGO + Welcome to STRANA */}
        <div style={{
          position: 'relative', zIndex: 10,
          opacity: phase === 'black' ? 0 : logoOpacity,
          transform: `scale(${logoScale})`,
          transition: phase === 'logo-in' ? 'opacity 1.2s ease, transform 1.2s cubic-bezier(0.16,1,0.3,1)' : 'none',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          pointerEvents: logoOpacity < 0.1 ? 'none' : 'all',
        }}>
          {/* Welcome to */}
          {phase === 'done' && (
            <p className="welcome-text" style={{
              fontSize: 'clamp(0.6rem, 1.5vw, 0.8rem)',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: 'var(--dim)',
              marginBottom: '1.2rem',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Welcome to
            </p>
          )}

          <div className={phase === 'done' && progress < 0.1 ? 'logo-float' : ''}>
            <Image
              src="/logo.png"
              alt="STRANA"
              width={560}
              height={560}
              style={{
                width: 'clamp(200px, 28vw, 400px)',
                height: 'auto',
                filter: 'drop-shadow(0 0 60px rgba(200,169,110,0.3)) drop-shadow(0 0 120px rgba(200,169,110,0.1))',
              }}
              priority
            />
          </div>

          <p className="sub-text" style={{
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

          <div className="btn-anim" style={{
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
