'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [['#eventos', 'Eventos'], ['#galeria', 'Galería'], ['#ubicacion', 'Ubicación'], ['#redes', 'Redes']]

  return (
    <>
      <style>{`
        .nav-desktop { display: flex; }
        .nav-hamburger { display: none; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 1.5rem',
        background: scrolled || menuOpen ? 'rgba(8,8,8,0.96)' : 'transparent',
        borderBottom: scrolled || menuOpen ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        <a href="/"><Image src="/logo.png" alt="STRANA" width={80} height={80} style={{ width: '48px', height: 'auto' }} /></a>

        {/* Desktop */}
        <ul className="nav-desktop" style={{ gap: '2.5rem', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}>
          {links.map(([h, l]) => (
            <li key={h}>
              <a href={h} style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--dim)', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={e => e.target.style.color = 'var(--white)'}
                onMouseLeave={e => e.target.style.color = 'var(--dim)'}
              >{l}</a>
            </li>
          ))}
          <li>
            <button style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', border: '1px solid var(--gold)', color: 'var(--gold)', padding: '0.55rem 1.4rem', background: 'transparent', transition: 'background 0.3s, color 0.3s', fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--black)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)' }}
            >Entradas</button>
          </li>
        </ul>

        {/* Hamburger */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', flexDirection: 'column', gap: '5px', padding: '4px', cursor: 'pointer' }}>
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: '22px', height: '1.5px', background: 'var(--white)',
              transition: 'all 0.3s',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)'
                : i === 2 ? 'rotate(-45deg) translate(4.5px, -4.5px)'
                : 'scaleX(0)'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99,
        background: 'rgba(8,8,8,0.98)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '2.5rem',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 0.35s ease',
      }}>
        {links.map(([h, l]) => (
          <a key={h} href={h} onClick={() => setMenuOpen(false)} style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '2.8rem', letterSpacing: '0.1em',
            color: 'var(--white)', textDecoration: 'none',
            transition: 'color 0.3s',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--gold)'}
            onMouseLeave={e => e.target.style.color = 'var(--white)'}
          >{l}</a>
        ))}
        <button style={{
          marginTop: '1rem', fontSize: '0.75rem', letterSpacing: '0.22em', textTransform: 'uppercase',
          border: '1px solid var(--gold)', color: 'var(--gold)', padding: '1rem 3rem',
          background: 'transparent', fontFamily: "'DM Sans', sans-serif",
        }}>Entradas</button>
      </div>
    </>
  )
}
