'use client'
import { useState } from 'react'

export default function Newsletter() {
  const [form, setForm] = useState({ nombre: '', email: '' })
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!form.nombre || !form.email) return
    setSent(true)
  }

  return (
    <section style={{ padding: '6rem 1.5rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <style>{`
        .nl-form {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 1px;
          background: var(--border);
          max-width: 620px;
          width: 100%;
        }
        .nl-input {
          background: rgba(240,237,230,0.05);
          border: none;
          color: var(--white);
          padding: 1rem 1.4rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          outline: none;
          width: 100%;
        }
        .nl-input::placeholder { color: var(--dim); }
        .nl-btn {
          background: var(--gold);
          color: var(--black);
          border: none;
          padding: 1rem 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
          transition: opacity 0.3s;
        }
        .nl-btn:hover { opacity: 0.85; }
        @media (max-width: 600px) {
          .nl-form { grid-template-columns: 1fr; }
          .nl-btn { padding: 1rem; }
        }
      `}</style>

      <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Mantente en el loop</p>
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 5vw, 5rem)', letterSpacing: '0.06em', marginBottom: '0.8rem' }}>INICIA LA TRANSMISIÓN</h2>
      <p style={{ fontSize: '0.8rem', color: 'var(--dim)', maxWidth: '400px', lineHeight: 1.9, fontWeight: 300, marginBottom: '3rem' }}>
        Sé el primero en conocer lineups, preventas y accesos VIP exclusivos.
      </p>

      {sent ? (
        <p style={{ color: 'var(--gold)', fontSize: '0.85rem', letterSpacing: '0.1em' }}>✓ Ya eres parte del universo STRANA, {form.nombre}</p>
      ) : (
        <form onSubmit={submit} className="nl-form">
          <input className="nl-input" type="text" placeholder="Tu nombre" value={form.nombre}
            onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} required />
          <input className="nl-input" type="email" placeholder="tu@correo.com" value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
          <button type="submit" className="nl-btn">Transmitir</button>
        </form>
      )}
    </section>
  )
}
