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
      }, 70)
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
    const t2 = setTimeout(() => {
      setShowLogo(true)
      setVideoOpacity(0.45)
    }, 1600)
    const t3 = setTimeout(() => setHidWelcome(true), 2800)
    const t4 = setTimeout(() => setScrambleTrigger(true), 3200)
    const t5 = setTimeout(() => setPhase('done'), 3800)
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
    <section ref={sectionRef} style={{ position: 'relative', height: '200vh', background: '#06060a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');

        @keyframes welcomeIn {
          from { opacity: 0; transform: translateY(48px); letter-spacing: 0.2em; }
          to   { opacity: 1; transform: translateY(0);    letter-spacing: 0.06em; }
        }
        @keyframes logoIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes gridPulse {
          0%,100% { opacity: 0.5; }
          50%      { opacity: 0.85; }
        }
        @keyframes scanMove {
          0%   { top: -2px; opacity: 0; }
          4%   { opacity: 0.5; }
          96%  { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes blinkDot {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.15; }
        }
        @keyframes scrollBar {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .logo-float { animation: floatY 5.5s ease-in-out infinite; }
        .scan-line {
          position: absolute; left: 0; right: 0; height: 1.5px;
          background: linear-gradient(90deg, transparent 0%, rgba(200,255,0,0.55) 50%, transparent 100%);
          pointer-events: none; z-index: 4;
          animation: scanMove 7s linear infinite;
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(200,255,0,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,255,0,0.045) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
          animation: gridPulse 9s ease-in-out infinite;
          z-index: 2; pointer-events: none;
        }
        .coords-panel {
          position: absolute; left: 44px; top: 50%;
          transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 6px;
          z-index: 12; pointer-events: none;
          animation: fadeRight 1s 2s both;
        }
        .coord-val {
          font-family: 'Space Mono', monospace;
          font-size: 9px; letter-spacing: 0.25em;
          color: rgba(200,255,0,0.55);
          writing-mode: vertical-rl; transform: rotate(180deg);
        }
        .coord-lbl {
          font-family: 'Space Mono', monospace;
          font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(240,237,232,0.18);
          writing-mode: vertical-rl; transform: rotate(180deg);
        }
        .badge-panel {
          position: absolute; right: 44px; top: 108px;
          display: flex; flex-direction: column; align-items: flex-end; gap: 7px;
          z-index: 12; pointer-events: none;
          animation: fadeLeft 1s 2s both;
        }
        .badge-row {
          font-family: 'Space Mono', monospace;
          font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase;
          color: rgba(240,237,232,0.28);
          display: flex; align-items: center; gap: 8px;
        }
        .badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #c8ff00;
          animation: blinkDot 1.8s ease-in-out infinite;
          display: inline-block;
        }
        .event-corner {
          position: absolute; bottom: 56px; right: 44px;
          display: flex; flex-direction: column; align-items: flex-end; gap: 4px;
          z-index: 12; pointer-events: none;
          animation: fadeLeft 1s 4s both;
        }
        .event-corner-date {
          font-family: 'Space Mono', monospace;
          font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(240,237,232,0.2);
        }
        .event-corner-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px; letter-spacing: 0.14em;
          color: rgba(240,237,232,0.85);
        }
        .event-corner-sub {
          font-family: 'Space Mono', monospace;
          font-size: 8px; letter-spacing: 0.28em; text-transform: uppercase;
          color: #c8ff00;
        }
        .ticker-wrap {
          border-top: 1px solid rgba(240,237,232,0.07);
          border-bottom: 1px solid rgba(240,237,232,0.07);
          overflow: hidden; padding: 13px 0;
          background: rgba(240,237,232,0.015);
          position: relative; z-index: 20;
        }
        .ticker-track {
          display: flex; width: max-content;
          animation: tickerScroll 30s linear infinite;
        }
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-item {
          font-family: 'Space Mono', monospace;
          font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase;
          color: rgba(240,237,232,0.28); white-space: nowrap;
          padding: 0 44px; display: flex; align-items: center; gap: 14px;
        }
        .ticker-accent { color: #c8ff00; font-size: 11px; }
        .scroll-hint {
          position: absolute; bottom: 2.2rem; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          z-index: 12; pointer-events: none;
        }
        .scroll-hint-text {
          font-family: 'Space Mono', monospace;
          font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(240,237,232,0.18);
        }
        .scroll-hint-line {
          width: 1px; height: 44px;
          background: linear-gradient(to bottom, rgba(200,255,0,0.5), transparent);
          animation: scrollBar 2.2s ease-in-out infinite;
        }
        @media (max-width: 768px) {
          .coords-panel, .badge-panel, .event-corner { display: none !important; }
          .immersive-text { font-size: 0.82rem !important; }
          .immersive-date { font-size: 0.55rem !important; }
          .welcome-line { font-size: clamp(2.4rem, 11vw, 5rem) !important; }
        }
      `}</style>

      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#06060a',
      }}>

        {/* Subtle green glow orbs */}
        <div style={{
          position: 'absolute', top: '-140px', right: '-80px',
          width: '560px', height: '560px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,0,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 1, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '380px', height: '380px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,240,200,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 1, pointerEvents: 'none',
        }} />

        {/* Grid */}
        <div className="hero-grid" />

        {/* Scan line */}
        <div className="scan-line" />

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

        {/* Video overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(6,6,10,0.62)',
          zIndex: 2,
          opacity: videoOpacity > 0 ? 1 : 0,
          transition: 'opacity 1.8s ease',
        }} />

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '42%',
          background: 'linear-gradient(to bottom, transparent, #06060a)',
          zIndex: 5, pointerEvents: 'none',
        }} />

        {/* Left coords */}
        <div className="coords-panel">
          <span className="coord-lbl">Coords</span>
          <span className="coord-val">20.6974°N</span>
          <span className="coord-val">103.3820°W</span>
        </div>

        {/* Right badge */}
        <div className="badge-panel">
          <span className="badge-row">Club &amp; Venue · GDL</span>
          <span className="badge-row">NFC VIP Access <span className="badge-dot" /></span>
          <span className="badge-row">Av. Pablo Neruda 2715</span>
        </div>

        {/* WELCOME TO */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: `translate(-50%, calc(-50% - ${showLogo ? 'clamp(110px, 16vw, 190px)' : '0px'}))`,
          zIndex: 20,
          textAlign: 'center',
          opacity: wordIndex >= 0 && !hidWelcome ? 1 : 0,
          transition: hidWelcome
            ? 'opacity 0.7s ease'
            : wordIndex >= 0
            ? 'opacity 0.7s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)'
            : 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}>
          <p className="welcome-line" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2.6rem, 8vw, 6.5rem)',
            letterSpacing: '0.06em',
            color: 'rgba(240,237,232,0.9)',
            lineHeight: 1,
            animation: wordIndex >= 0 ? 'welcomeIn 0.85s cubic-bezier(0.16,1,0.3,1) both' : 'none',
          }}>
            WELCOME TO
          </p>
        </div>

        {/* LOGO + scramble + CTA */}
        {showLogo && (
          <div style={{
            position: 'relative', zIndex: 10,
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            pointerEvents: logoOpacity < 0.1 ? 'none' : 'all',
            animation: 'logoIn 1s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            {/* Corner accents around logo */}
            <div style={{ position: 'relative', display: 'inline-flex' }}>
              {/* Top-left corner */}
              <span style={{
                position: 'absolute', top: -12, left: -12,
                width: 18, height: 18,
                borderTop: '1px solid rgba(200,255,0,0.5)',
                borderLeft: '1px solid rgba(200,255,0,0.5)',
              }} />
              {/* Top-right corner */}
              <span style={{
                position: 'absolute', top: -12, right: -12,
                width: 18, height: 18,
                borderTop: '1px solid rgba(200,255,0,0.5)',
                borderRight: '1px solid rgba(200,255,0,0.5)',
              }} />
              {/* Bottom-left corner */}
              <span style={{
                position: 'absolute', bottom: -12, left: -12,
                width: 18, height: 18,
                borderBottom: '1px solid rgba(200,255,0,0.5)',
                borderLeft: '1px solid rgba(200,255,0,0.5)',
              }} />
              {/* Bottom-right corner */}
              <span style={{
                position: 'absolute', bottom: -12, right: -12,
                width: 18, height: 18,
                borderBottom: '1px solid rgba(200,255,0,0.5)',
                borderRight: '1px solid rgba(200,255,0,0.5)',
              }} />

              <div className={phase === 'done' && progress < 0.1 ? 'logo-float' : ''}>
                <Image
                  src="/logo.png"
                  alt="STRANA"
                  width={400}
                  height={400}
                  style={{
                    width: 'clamp(140px, 18vw, 260px)',
                    height: 'auto',
                    filter: 'drop-shadow(0 0 50px rgba(200,255,0,0.18)) drop-shadow(0 0 100px rgba(200,255,0,0.08))',
                  }}
                  priority
                />
              </div>
            </div>

            {/* Scramble text */}
            <p style={{
              fontSize: 'clamp(0.5rem, 0.9vw, 0.62rem)',
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              color: 'rgba(240,237,232,0.45)',
              marginTop: '1.4rem',
              marginBottom: '2.6rem',
              opacity: Math.max(1 - progress * 3, 0),
              fontFamily: "'Space Mono', monospace",
            }}>
              <ScrambleText
                text="GUADALAJARA · MÉXICO · OPENING 2026"
                trigger={scrambleTrigger}
                delay={0}
              />
            </p>

            {/* CTA — solo Ver Eventos */}
            <div style={{ opacity: Math.max(1 - progress * 3, 0) }}>
              <button
                onClick={() => document.getElementById('eventos')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.68rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#06060a',
                  background: '#c8ff00',
                  border: 'none',
                  padding: '0.95rem 2.8rem',
                  cursor: 'pointer',
                  transition: 'background 0.3s, transform 0.2s, box-shadow 0.3s',
                  fontWeight: 700,
                  boxShadow: '0 0 0px rgba(200,255,0,0)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#d4ff33'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 0 36px rgba(200,255,0,0.35)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#c8ff00'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 0 0px rgba(200,255,0,0)'
                }}
              >
                Ver Eventos
              </button>
            </div>
          </div>
        )}

        {/* Bottom-right event info */}
        <div className="event-corner" style={{
          opacity: logoOpacity * Math.max(1 - progress * 3, 0),
        }}>
          <span className="event-corner-date">Próximo · 11 May 2026</span>
          <span className="event-corner-name">OPENING WEEK</span>
          <span className="event-corner-sub">DJ Alygor · 11 PM – 4 AM</span>
        </div>

        {/* Immersive text on scroll */}
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
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '1.6rem',
            letterSpacing: '0.2em',
            color: 'rgba(240,237,232,0.9)',
            marginBottom: '0.5rem',
          }}>
            Get ready for the ultimate immersive experience.
          </p>
          <p className="immersive-date" style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: '#c8ff00',
          }}>
            May 2026
          </p>
        </div>

        {/* Scroll hint */}
        {progress < 0.05 && phase === 'done' && (
          <div className="scroll-hint">
            <span className="scroll-hint-text">Scroll</span>
            <div className="scroll-hint-line" />
          </div>
        )}
      </div>

      {/* Ticker */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...Array(2)].map((_, outer) => (
            ['STRANA GDL', 'Club & Venue', 'NFC VIP Access', 'Techno', 'House', 'Electronic', 'Unique Experiences', 'Exclusive Zone', 'Guadalajara']
              .map((item, i) => (
                <div key={`${outer}-${i}`} className="ticker-item">
                  {item} <span className="ticker-accent">·</span>
                </div>
              ))
          ))}
        </div>
      </div>
    </section>
  )
}