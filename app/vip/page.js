'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

function VIPForm() {
  const searchParams = useSearchParams()

  const [screen, setScreen] = useState('loading') // loading | login | register | profile | success
  const [profile, setProfile] = useState(null)
  const [loginForm, setLoginForm] = useState({ cardNumber: '', telefono: '' })
  const [loginError, setLoginError] = useState('')
  const [form, setForm] = useState({ cardNumber: '', nombre: '', telefono: '', fecha: '' })
  const [submitStatus, setSubmitStatus] = useState('idle')

  // Al cargar solo verificamos si hay registros — no auto-login
  useEffect(() => {
    setScreen('login')
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    try {
      const res = await fetch('/api/vip')
      const json = await res.json()
      const found = (json.data || []).find(r =>
        String(r.tarjeta) === String(parseInt(loginForm.cardNumber, 10)) &&
        String(r.telefono) === String(loginForm.telefono)
      )
      if (found) {
        setProfile(found)
        setScreen('profile')
      } else {
        // Verificar si el card number existe pero con otro teléfono
        const cardExists = (json.data || []).find(r =>
          String(r.tarjeta) === String(parseInt(loginForm.cardNumber, 10))
        )
        if (cardExists) {
          setLoginError('Phone number does not match. Try again or contact staff.')
        } else {
          // No existe — ir a registro
          setForm(f => ({ ...f, cardNumber: loginForm.cardNumber, telefono: loginForm.telefono }))
          setScreen('register')
        }
      }
    } catch {
      setLoginError('Connection error. Please try again.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus('loading')
    try {
      const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || ''
      if (!WEBHOOK_URL) {
        await new Promise(r => setTimeout(r, 1200))
        setSubmitStatus('success')
        setScreen('success')
        return
      }
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tarjeta: form.cardNumber,
          nombre: form.nombre,
          telefono: form.telefono,
          fecha_nacimiento: form.fecha,
          timestamp: new Date().toISOString(),
        }),
      })
      if (res.ok) { setSubmitStatus('success'); setScreen('success') }
      else setSubmitStatus('error')
    } catch {
      setSubmitStatus('error')
    }
  }

  const formatDate = (d) => d ? new Date(d + 'T12:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'

  const cardStyle = {
    width: '100%', maxWidth: '380px',
    background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #1a1410 100%)',
    border: '1px solid rgba(200,169,110,0.2)',
    borderRadius: '16px', padding: '2rem', marginBottom: '2rem',
    boxShadow: '0 30px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(200,169,110,0.15)',
    position: 'relative', overflow: 'hidden',
  }

  const BlackCard = ({ cardNumber }) => (
    <div style={cardStyle}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,169,110,0.4), transparent)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <p style={{ fontSize: '0.5rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.6)', marginBottom: '0.3rem' }}>VIP Access</p>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem', letterSpacing: '0.1em', color: '#fff' }}>STRANA GDL</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.48rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.5)', marginBottom: '0.3rem' }}>Card</p>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.1rem', letterSpacing: '0.15em', color: '#C8A96E' }}>#{cardNumber}</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
        <div style={{ width: '38px', height: '28px', border: '1px solid rgba(200,169,110,0.4)', borderRadius: '4px', background: 'rgba(200,169,110,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.45rem', letterSpacing: '0.1em', color: 'rgba(200,169,110,0.7)' }}>NFC</span>
        </div>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(200,169,110,0.2), transparent)' }} />
      </div>
      <p style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,237,230,0.25)' }}>Guadalajara · México · 2026</p>
    </div>
  )

  const baseStyle = { minHeight: '100vh', background: '#050505', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }

  const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.04)', border: 'none', borderBottom: '1px solid rgba(200,169,110,0.25)', color: '#fff', padding: '1rem 0', fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', outline: 'none', transition: 'border-color 0.3s', boxSizing: 'border-box', letterSpacing: '0.05em' }

  const btnStyle = { width: '100%', background: 'linear-gradient(135deg, #C8A96E 0%, #a8864e 100%)', color: '#050505', border: 'none', padding: '1.1rem', fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem' }

  // LOGIN
  if (screen === 'login') return (
    <div style={baseStyle}>
      <style>{`.vi:focus{border-bottom-color:#C8A96E!important}.vi::placeholder{color:rgba(240,237,230,0.3);font-size:0.78rem;letter-spacing:0.1em}`}</style>
      <Image src="/logo.png" alt="STRANA" width={100} height={100} style={{ width: '75px', height: 'auto', marginBottom: '2.5rem' }} />
      <BlackCard cardNumber="···" />
      <div style={{ width: '100%', maxWidth: '380px' }}>
        <p style={{ fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '2rem', textAlign: 'center' }}>Access Your Profile</p>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <input className="vi" style={inputStyle} type="text" placeholder="Card Number" required
              value={loginForm.cardNumber} onChange={e => setLoginForm(f => ({ ...f, cardNumber: e.target.value }))} />
            <p style={{ fontSize: '0.6rem', color: 'rgba(200,169,110,0.5)', marginTop: '0.4rem' }}>Enter the number printed on your VIP card</p>
          </div>
          <input className="vi" style={inputStyle} type="tel" placeholder="Phone Number (10 digits)" required
            pattern="[0-9]{10}" maxLength={10}
            value={loginForm.telefono} onChange={e => setLoginForm(f => ({ ...f, telefono: e.target.value }))} />
          {loginError && <p style={{ color: '#ff6b6b', fontSize: '0.72rem', textAlign: 'center' }}>{loginError}</p>}
          <button style={btnStyle} type="submit">Access</button>
        </form>
        <p style={{ fontSize: '0.55rem', color: 'rgba(240,237,230,0.25)', marginTop: '2rem', textAlign: 'center', lineHeight: 1.9 }}>
          First time? Enter your card number and phone to register.
        </p>
      </div>
    </div>
  )

  // REGISTER
  if (screen === 'register') return (
    <div style={baseStyle}>
      <style>{`.vi:focus{border-bottom-color:#C8A96E!important}.vi::placeholder{color:rgba(240,237,230,0.3);font-size:0.78rem;letter-spacing:0.1em}`}</style>
      <Image src="/logo.png" alt="STRANA" width={100} height={100} style={{ width: '75px', height: 'auto', marginBottom: '2.5rem' }} />
      <BlackCard cardNumber={form.cardNumber} />
      <div style={{ width: '100%', maxWidth: '380px' }}>
        <p style={{ fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '2rem', textAlign: 'center' }}>Activate Your Access</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <input className="vi" style={inputStyle} type="text" placeholder="Full Name" required
            value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} />
          <div>
            <input className="vi" style={inputStyle} type="date" required
              value={form.fecha} onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))}
              style={{ ...inputStyle, colorScheme: 'dark' }} />
            <p style={{ fontSize: '0.6rem', color: 'rgba(200,169,110,0.5)', marginTop: '0.4rem' }}>Date of birth — used to celebrate you on your special day 🎂</p>
          </div>
          <button style={btnStyle} type="submit" disabled={submitStatus === 'loading'}>
            {submitStatus === 'loading' ? 'Registering...' : 'Activate VIP Card'}
          </button>
        </form>
        {submitStatus === 'error' && <p style={{ color: '#ff6b6b', fontSize: '0.72rem', marginTop: '1rem', textAlign: 'center' }}>Something went wrong. Please try again.</p>}
        <button onClick={() => setScreen('login')} style={{ background: 'none', border: 'none', color: 'rgba(240,237,230,0.3)', fontSize: '0.6rem', letterSpacing: '0.15em', cursor: 'pointer', marginTop: '1.5rem', width: '100%', textAlign: 'center' }}>
          ← Back
        </button>
      </div>
    </div>
  )

  // PROFILE
  if (screen === 'profile' && profile) return (
    <div style={baseStyle}>
      <Image src="/logo.png" alt="STRANA" width={80} height={80} style={{ width: '70px', height: 'auto', marginBottom: '2.5rem' }} />
      <div style={{ ...cardStyle, marginBottom: '2rem' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,169,110,0.4), transparent)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <div>
            <p style={{ fontSize: '0.5rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.6)', marginBottom: '0.3rem' }}>VIP Access</p>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem', letterSpacing: '0.1em', color: '#fff' }}>STRANA GDL</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.48rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.5)', marginBottom: '0.3rem' }}>Card</p>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.1rem', letterSpacing: '0.15em', color: '#C8A96E' }}>#{profile.tarjeta}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
          <div style={{ width: '38px', height: '28px', border: '1px solid rgba(200,169,110,0.4)', borderRadius: '4px', background: 'rgba(200,169,110,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.45rem', letterSpacing: '0.1em', color: 'rgba(200,169,110,0.7)' }}>NFC</span>
          </div>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(200,169,110,0.2), transparent)' }} />
        </div>
        <div style={{ borderTop: '1px solid rgba(200,169,110,0.1)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <p style={{ fontSize: '0.45rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.5)', marginBottom: '0.3rem' }}>Name</p>
            <p style={{ fontSize: '0.95rem', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{profile.nombre}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.45rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.5)', marginBottom: '0.3rem' }}>Phone</p>
              <p style={{ fontSize: '0.8rem', color: 'rgba(240,237,230,0.7)', fontFamily: "'DM Sans', sans-serif" }}>{profile.telefono}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.45rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.5)', marginBottom: '0.3rem' }}>Birthday</p>
              <p style={{ fontSize: '0.8rem', color: 'rgba(240,237,230,0.7)', fontFamily: "'DM Sans', sans-serif" }}>{formatDate(profile.fecha_nacimiento)}</p>
            </div>
          </div>
        </div>
        <p style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,237,230,0.2)', marginTop: '1.5rem' }}>Guadalajara · México · 2026</p>
      </div>
      <p style={{ fontSize: '0.62rem', color: 'rgba(200,169,110,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center' }}>✓ Active VIP Member</p>
      <p style={{ fontSize: '0.58rem', color: 'rgba(240,237,230,0.3)', marginTop: '0.5rem', textAlign: 'center', lineHeight: 1.8 }}>Present this card at the entrance to access your VIP benefits.</p>
      <button onClick={() => { setScreen('login'); setLoginForm({ cardNumber: '', telefono: '' }) }} style={{ background: 'none', border: 'none', color: 'rgba(240,237,230,0.2)', fontSize: '0.6rem', letterSpacing: '0.15em', cursor: 'pointer', marginTop: '2rem' }}>
        Sign out
      </button>
    </div>
  )

  // SUCCESS
  if (screen === 'success') return (
    <div style={{ ...baseStyle, textAlign: 'center' }}>
      <Image src="/logo.png" alt="STRANA" width={80} height={80} style={{ width: '70px', height: 'auto', marginBottom: '2.5rem' }} />
      <div style={{ width: '52px', height: '52px', border: '1px solid #C8A96E', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
        <span style={{ color: '#C8A96E', fontSize: '1.3rem' }}>✓</span>
      </div>
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.8rem', letterSpacing: '0.08em', marginBottom: '1rem', color: '#fff' }}>
        Welcome to the Universe
      </h2>
      <p style={{ fontSize: '0.78rem', color: 'rgba(240,237,230,0.5)', lineHeight: 2, maxWidth: '300px', marginBottom: '0.5rem' }}>
        Your VIP Card has been successfully registered.
      </p>
      <p style={{ fontSize: '0.72rem', color: 'rgba(240,237,230,0.4)', lineHeight: 2 }}>
        Present it at the entrance to access your VIP benefits.
      </p>
    </div>
  )

  return <div style={{ minHeight: '100vh', background: '#050505' }} />
}

export default function VIPPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#050505' }} />}>
      <VIPForm />
    </Suspense>
  )
}