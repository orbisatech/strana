'use client'
import Image from 'next/image'

const IconInstagram = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>)
const IconTikTok = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>)
const IconFacebook = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>)

const SOCIALS = [
  { name: 'Instagram', url: 'https://www.instagram.com/stranagdl_oficial', Icon: IconInstagram },
  { name: 'TikTok', url: 'https://tiktok.com/@stranagdl', Icon: IconTikTok },
  { name: 'Facebook', url: 'https://www.facebook.com/stranagdl/', Icon: IconFacebook },
]

export default function Footer() {
  return (
    <footer id="redes" style={{ borderTop: '1px solid var(--border)', padding: '3rem 1.5rem' }}>
      <style>{`
        .footer-top { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 2rem; margin-bottom: 3rem; }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-top: 1px solid var(--border); padding-top: 2rem; }
        @media (max-width: 600px) { .footer-top { justify-content: center; text-align: center; } .footer-bottom { flex-direction: column; align-items: center; text-align: center; } }
      `}</style>
      <div className="footer-top">
        <a href="/"><Image src="/logo.png" alt="STRANA" width={100} height={100} style={{ width: '70px', height: 'auto', opacity: 0.85 }} /></a>
        <div style={{ display: 'flex', gap: '1.8rem', alignItems: 'center' }}>
          {SOCIALS.map(({ name, url, Icon }) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer" title={name} style={{ color: 'var(--dim)', textDecoration: 'none', transition: 'color 0.3s, transform 0.3s', display: 'flex', alignItems: 'center' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--dim)'; e.currentTarget.style.transform = 'translateY(0)' }}
            ><Icon /></a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <p style={{ fontSize: '0.6rem', color: 'var(--dim)', letterSpacing: '0.1em' }}>© STRANA GDL 2025. All rights reserved.</p>
          <a href="/admin" style={{ fontSize: '0.55rem', color: 'rgba(240,237,230,0.12)', letterSpacing: '0.12em', textDecoration: 'none', transition: 'color 0.4s' }}
            onMouseEnter={e => e.target.style.color = 'var(--dim)'}
            onMouseLeave={e => e.target.style.color = 'rgba(240,237,230,0.12)'}
          >· Staff</a>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Privacy Policy', 'Terms & Conditions'].map(l => (
            <a key={l} href="#" style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--dim)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => e.target.style.color = 'var(--white)'}
              onMouseLeave={e => e.target.style.color = 'var(--dim)'}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
