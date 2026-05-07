'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

function VIPForm() {
  const searchParams = useSearchParams()
  const cardId = searchParams.get('card') || '0000'

  const [form, setForm] = useState({ nombre: '', fecha: '', telefono: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // ✏️ REEMPLAZA esta URL con tu webhook de Make.com
      const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || ''

      if (!WEBHOOK_URL) {
        // Modo demo sin webhook
        await new Promise(r => setTimeout(r, 1200))
        setStatus('success')
        return
      }

      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tarjeta: cardId,
          nombre: form.nombre,
          fecha_nacimiento: form.fecha,
          telefono: form.telefono,
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem', textAlign: 'center', background: 'var(--black)' }}>
        <Image src="/logo.png" alt="STRANA" width={120} height={120} style={{ width: '90px', height: 'auto', marginBottom: '3rem' }} />
        <div style={{ width: '48px', height: '48px', border: '1.5px solid var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
          <span style={{ color: 'var(--gold)', fontSize: '1.2rem' }}>✓</span>
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', letterSpacing: '0.06em', marginBottom: '1rem' }}>
          Bienvenido al Universo
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--dim)', lineHeight: 1.9, maxWidth: '300px', marginBottom: '0.5rem' }}>
          Tu tarjeta <span style={{ color: 'var(--gold)' }}>#{cardId}</span> ha sido registrada exitosamente.
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--dim)', lineHeight: 1.9 }}>
          Preséntala en entrada para acceder a tus beneficios VIP.
        </p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <style>{`
        .vip-input {
          width: 100%;
          background: rgba(240,237,230,0.05);
          border: 1px solid var(--border);
          color: var(--white);
          padding: 1rem 1.2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.3s;
          box-sizing: border-box;
        }
        .vip-input:focus { border-color: var(--gold); }
        .vip-input::placeholder { color: var(--dim); }
        .vip-submit {
          width: 100%;
          background: var(--gold);
          color: var(--black);
          border: none;
          padding: 1.1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 600;
          transition: opacity 0.3s;
          cursor: pointer;
        }
        .vip-submit:hover { opacity: 0.85; }
        .vip-submit:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      {/* Logo */}
      <Image src="/logo.png" alt="STRANA" width={120} height={120}
        style={{ width: '80px', height: 'auto', marginBottom: '2.5rem' }} />

      {/* Card badge */}
      <div style={{ border: '1px solid var(--gold)', padding: '0.3rem 1.2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)' }}>
          Tarjeta VIP #{cardId}
        </span>
      </div>

      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 8vw, 3rem)', letterSpacing: '0.06em', textAlign: 'center', marginBottom: '0.5rem' }}>
        Activa tu Acceso
      </h1>
      <p style={{ fontSize: '0.75rem', color: 'var(--dim)', marginBottom: '2.5rem', textAlign: 'center', lineHeight: 1.8 }}>
        Completa tu registro para activar<br />los beneficios de tu tarjeta VIP.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
        <input className="vip-input" type="text" placeholder="Nombre completo" required
          value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} />
        <input className="vip-input" type="date" placeholder="Fecha de nacimiento" required
          value={form.fecha} onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))}
          style={{ colorScheme: 'dark' }} />
        <input className="vip-input" type="tel" placeholder="Teléfono (10 dígitos)" required
          pattern="[0-9]{10}" maxLength={10}
          value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} />
        <button className="vip-submit" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Registrando...' : 'Activar Tarjeta VIP'}
        </button>
      </form>

      {status === 'error' && (
        <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '1rem', textAlign: 'center' }}>
          Hubo un error. Intenta de nuevo o pide ayuda al staff.
        </p>
      )}

      <p style={{ fontSize: '0.58rem', color: 'var(--dim)', marginTop: '2rem', textAlign: 'center', maxWidth: '300px', lineHeight: 1.8 }}>
        Tu información es confidencial y solo será usada para gestionar tu acceso VIP en STRANA.
      </p>
    </div>
  )
}

export default function VIPPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#080808' }} />}>
      <VIPForm />
    </Suspense>
  )
}
