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
  const logoScale = 1 - progress * 0.15

  const photoScale = 0.55 + progress * 0.55
  const leftX = -18 - progress * 22
  const rightX = 18 + progress * 22
  const photoOpacity = Math.min(0.3 + progress * 1.4, 1)
  const centerY = 15 - progress * 18

  return (
    <section ref={sectionRef} style={{ position: 'relative', height: '200vh', background: '#080808' }}>
      <style>{`
        @keyframes logoIn { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:scale(1)} }
        @keyframes floatY { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
        .logo-anim { animation: logoIn 1s cubic-bezier(0.16,1,0.3,1) both; }
        .logo-float { animation: floatY 4s ease-in-out infinite; }
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
          objectFit: 'cover', opacity: 0.35, zIndex: 1,
        }}>
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,8,0.6)', zIndex: 1 }} />

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
          background: 'linear-gradient(to bottom, transparent, #080808)',
          zIndex: 5, pointerEvents: 'none',
        }} />

        {/* 3 FOTOS */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2,
        }}>
          {/* Izquierda */}
          <div style={{
            position: 'absolute',
            width: 'clamp(100px, 28vw, 320px)',
            aspectRatio: '3/4',
            transform: `translateX(${leftX}vw) translateY(${centerY}px) scale(${photoScale})`,
            opacity: photoOpacity,
            transition: 'none',
            overflow: 'hidden',
            border: '1px solid rgba(240,237,230,0.07)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
          }}>
            <img src="/people-01.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.5) 0%, transparent 60%)' }} />
          </div>

          {/* Centro */}
          <div style={{
            position: 'absolute',
            width: 'clamp(160px, 38vw, 460px)',
            aspectRatio: '4/3',
            transform: `translateY(${28 - progress * 32}vh) scale(${0.5 + progress * 0.6})`,
            opacity: Math.min(progress * 1.8, 1),
            transition: 'none',
            overflow: 'hidden',
            border: '1px solid rgba(240,237,230,0.07)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
          }}>
            <img src="/venue-13.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.5) 0%, transparent 60%)' }} />
          </div>

          {/* Derecha */}
          <div style={{
            position: 'absolute',
            width: 'clamp(100px, 28vw, 320px)',
            aspectRatio: '3/4',
            transform: `translateX(${rightX}vw) translateY(${centerY}px) scale(${photoScale})`,
            opacity: photoOpacity,
            transition: 'none',
            overflow: 'hidden',
            border: '1px solid rgba(240,237,230,0.07)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
          }}>
            <img src="/people-02.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.5) 0%, transparent 60%)' }} />
          </div>

          {/* Texto inmersivo */}
          <div style={{
            position: 'absolute',
            bottom: '12vh',
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

        {/* LOGO */}
        <div style={{
          position: 'relative', zIndex: 10,
          opacity: phase === 'black' ? 0 : logoOpacity,
          transform: `scale(${logoScale})`,
          transition: phase === 'logo-in' ? 'opacity 1s ease, transform 1s cubic-bezier(0.16,1,0.3,1)' : 'none',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          pointerEvents: logoOpacity < 0.1 ? 'none' : 'all',
        }}>
          <div className={phase === 'done' && progress < 0.1 ? 'logo-float' : ''}>
            <Image
              src="/logo.png"
              alt="STRANA"
              width={560}
              height={560}
              style={{
                width: 'clamp(160px, 22vw, 320px)',
                height: 'auto',
                filter: 'drop-shadow(0 0 80px rgba(200,169,110,0.25)) drop-shadow(0 0 160px rgba(200,169,110,0.08))',
              }}
              priority
            />
          </div>

          <p style={{
            fontSize: '0.58rem', letterSpacing: '0.38em', textTransform: 'uppercase',
            color: 'var(--gold)', marginTop: '1.2rem', marginBottom: '2rem',
            opacity: Math.max(1 - progress * 3, 0),
          }}>
            Guadalajara, México · Club & Venue
          </p>

          <div style={{
            display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center',
            opacity: Math.max(1 - progress * 3, 0),
          }}>
            <button
              onClick={() => document.getElementById('eventos')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'var(--white)', color: 'var(--black)', fontFamily: "'DM Sans',sans-serif", fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, padding: '0.9rem 2.5rem', border: 'none', transition: 'background 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--gold)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--white)'}
            >Ver Eventos</button>
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