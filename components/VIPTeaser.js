'use client'
export default function VIPTeaser() {
  return (
    <section style={{ position: 'relative', minHeight: '80vh', overflow: 'hidden' }}>
      <style>{`
        .vip-content { position: relative; z-index: 2; height: 100%; min-height: 80vh; display: flex; flex-direction: column; justify-content: center; padding: 5rem 2.5rem; max-width: 680px; }
        .vip-nfc { position: absolute; right: 12%; top: 50%; transform: translateY(-50%); }
        @media (max-width: 768px) { .vip-content { padding: 4rem 1.5rem; max-width: 100%; } .vip-nfc { display: none; } .vip-title { font-size: 3.5rem !important; } }
      `}</style>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/venue-06.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 40%', filter: 'brightness(0.45)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.2) 100%)' }} />
      <div className="vip-nfc">
        {[0,1,2].map(i => (<div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: `${120+i*70}px`, height: `${120+i*70}px`, border: '1px solid rgba(200,169,110,0.3)', borderRadius: '50%', transform: 'translate(-50%,-50%)', animation: `ripple ${2+i*0.8}s ease-out infinite`, animationDelay: `${i*0.6}s` }} />))}
        <div style={{ width: '80px', height: '56px', border: '1px solid var(--gold)', borderRadius: '8px', background: 'rgba(200,169,110,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.9rem', letterSpacing: '0.2em', color: 'var(--gold)' }}>NFC</span>
        </div>
      </div>
      <div className="vip-content">
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Exclusive Access</p>
        <h2 className="vip-title" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 0.9, letterSpacing: '0.03em', marginBottom: '2rem', color: 'var(--white)' }}>
          ELEVATE<br />YOUR NIGHT<br /><span style={{ color: 'var(--gold)' }}>WITH NFC VIP</span>
        </h2>
        <p style={{ fontSize: '0.82rem', lineHeight: 1.9, color: 'var(--dim)', maxWidth: '440px', marginBottom: '2.5rem', fontWeight: 300 }}>VIP access is exclusive to authorized NFC cardholders. Tap your card to unlock your private profile, benefits, and reserved table.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <button style={{ background: 'var(--gold)', color: 'var(--black)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, padding: '1rem 2.5rem', border: 'none', transition: 'opacity 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >Reserve VIP Table</button>
          <span style={{ fontSize: '0.6rem', color: 'var(--dim)', letterSpacing: '0.1em' }}>Authorized NFC cardholders only</span>
        </div>
      </div>
    </section>
  )
}
