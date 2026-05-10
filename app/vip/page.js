'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

function VIPForm() {
  const searchParams = useSearchParams()
  const cardId = searchParams.get('card') || '001'

  const [form, setForm] = useState({ username: '', nombre: '', telefono: '', fecha: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || ''

      if (!WEBHOOK_URL) {
        await new Promise(r => setTimeout(r, 1200))
        setStatus('success')
        return
      }

      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tarjeta: cardId,
          username: form.username,
          nombre: form.nombre,
          telefono: form.telefono,
          fecha_nacimiento: form.fecha,
          timestamp: new Date().toISOString(),
        }),
      })

      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ minHeight: '100vh', background: '#050505', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
        <Image src="/logo.png" alt="STRANA" width={80} height={80} style={{ width: '70px', height: 'auto', marginBottom: '2.5rem' }} />
        <div style={{ width: '52px', height: '52px', border: '1px solid #C8A96E', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
          <span style={{ color: '#C8A96E', fontSize: '1.3rem' }}>✓</span>
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.8rem', letterSpacing: '0.08em', marginBottom: '1rem', color: '#fff' }}>
          Welcome to the Universe
        </h2>
        <p style={{ fontSize: '0.78rem', color: 'rgba(240,237,230,0.5)', lineHeight: 2, maxWidth: '300px', marginBottom: '0.5rem' }}>
          Your VIP Card <span style={{ color: '#C8A96E' }}>#{cardId}</span> has been successfully registered.
        </p>
        <p style={{ fontSize: '0.72rem', color: 'rgba(240,237,230,0.4)', lineHeight: 2 }}>
          Present it at the entrance to access your VIP benefits.
        </p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050505', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <style>{`
        .vip-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: none;
          border-bottom: 1px solid rgba(200,169,110,0.25);
          color: #fff;
          padding: 1rem 0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          outline: none;
          transition: border-color 0.3s;
          box-sizing: border-box;
          letter-spacing: 0.05em;
        }
        .vip-input:focus { border-bottom-color: #C8A96E; }
        .vip-input::placeholder { color: rgba(240,237,230,0.3); font-size: 0.78rem; letter-spacing: 0.1em; }
        .vip-submit {
          width: 100%;
          background: linear-gradient(135deg, #C8A96E 0%, #a8864e 100%);
          color: #050505;
          border: none;
          padding: 1.1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 700;
          transition: opacity 0.3s;
          cursor: pointer;
          margin-top: 0.5rem;
        }
        .vip-submit:hover { opacity: 0.88; }
        .vip-submit:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      {/* Logo */}
      <Image src="/logo.png" alt="STRANA" width={100} height={100} style={{ width: '75px', height: 'auto', marginBottom: '2.5rem' }} />

      {/* Black Card */}
      <div style={{
        width: '100%',
        maxWidth: '380px',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #1a1410 100%)',
        border: '1px solid rgba(200,169,110,0.2)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2.5rem',
        boxShadow: '0 30px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(200,169,110,0.15)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Shine effect */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,169,110,0.4), transparent)' }} />
        
        {/* Card header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <div>
            <p style={{ fontSize: '0.5rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.6)', marginBottom: '0.3rem' }}>VIP Access</p>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem', letterSpacing: '0.1em', color: '#fff' }}>STRANA GDL</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.48rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.5)', marginBottom: '0.3rem' }}>Card</p>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.1rem', letterSpacing: '0.15em', color: '#C8A96E' }}>#{cardId}</p>
          </div>
        </div>

        {/* NFC chip visual */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '38px', height: '28px', border: '1px solid rgba(200,169,110,0.4)', borderRadius: '4px', background: 'rgba(200,169,110,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.45rem', letterSpacing: '0.1em', color: 'rgba(200,169,110,0.7)' }}>NFC</span>
          </div>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(200,169,110,0.2), transparent)' }} />
        </div>

        <p style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,237,230,0.25)' }}>Guadalajara · México · 2026</p>
      </div>

      {/* Form */}
      <div style={{ width: '100%', maxWidth: '380px' }}>
        <p style={{ fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '2rem', textAlign: 'center' }}>
          Activate Your Access
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <input className="vip-input" type="text" placeholder="Username" required
            value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
          <input className="vip-input" type="text" placeholder="Full Name" required
            value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} />
          <input className="vip-input" type="tel" placeholder="Phone Number (10 digits)" required
            pattern="[0-9]{10}" maxLength={10}
            value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} />
          <input className="vip-input" type="date" required
            value={form.fecha} onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))}
            style={{ colorScheme: 'dark' }} />
          <button className="vip-submit" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Registering...' : 'Activate VIP Card'}
          </button>
        </form>

        {status === 'error' && (
          <p style={{ color: '#ff6b6b', fontSize: '0.72rem', marginTop: '1rem', textAlign: 'center' }}>
            Something went wrong. Please try again or ask staff for help.
          </p>
        )}

        <p style={{ fontSize: '0.55rem', color: 'rgba(240,237,230,0.25)', marginTop: '2rem', textAlign: 'center', lineHeight: 1.9, letterSpacing: '0.05em' }}>
          Your information is confidential and will only be used to manage your VIP access at STRANA.
        </p>
      </div>
    </div>
  )
}

export default function VIPPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#050505' }} />}>
      <VIPForm />
    </Suspense>
  )
}
