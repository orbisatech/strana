'use client'
import { useState } from 'react'
import Image from 'next/image'

const ADMIN_PASSWORD = 'strana2025'

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/vip')
      const json = await res.json()
      setData(json.data || [])
    } catch {
      setData([])
    }
    setLoading(false)
  }

  const login = async (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      setAuth(true)
      fetchData()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  const filtered = data.filter(r =>
    r.nombre.toLowerCase().includes(search.toLowerCase()) ||
    r.tarjeta.includes(search) ||
    r.telefono.includes(search)
  )

  const formatDate = (iso) => new Date(iso).toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' })
  const formatBirth = (d) => {
  if (!d) return '—'
  // Maneja formato DD/MM/YYYY
  const parts = d.split('/')
  if (parts.length === 3) {
    const [day, month, year] = parts
    return new Date(`${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}T12:00:00`).toLocaleDateString('es-MX')
  }
  return new Date(d + 'T12:00:00').toLocaleDateString('es-MX')
}

  if (!auth) return (
    <div style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <style>{`
        .adm-input { width:100%; background:rgba(240,237,230,0.05); border:1px solid var(--border); color:var(--white); padding:1rem 1.2rem; font-family:'DM Sans',sans-serif; font-size:0.85rem; outline:none; transition:border-color 0.3s; box-sizing:border-box; }
        .adm-input:focus { border-color:var(--gold); }
      `}</style>
      <Image src="/logo.png" alt="STRANA" width={100} height={100} style={{ width: '70px', height: 'auto', marginBottom: '2.5rem' }} />
      <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.8rem' }}>Panel de Gestión</p>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', letterSpacing: '0.06em', marginBottom: '2rem' }}>Acceso Admin</h1>

      <form onSubmit={login} style={{ width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
        <input className="adm-input" type="password" placeholder="Contraseña" value={pw}
          onChange={e => setPw(e.target.value)} required />
        <button type="submit" style={{ background: error ? '#ff6b6b' : 'var(--gold)', color: 'var(--black)', border: 'none', padding: '1rem', fontFamily: "'DM Sans',sans-serif", fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, transition: 'background 0.3s', cursor: 'pointer' }}>
          {error ? 'Contraseña incorrecta' : 'Ingresar'}
        </button>
      </form>
      <a href="/" style={{ marginTop: '1.5rem', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--dim)', textDecoration: 'none', borderBottom: '1px solid var(--border)', paddingBottom: '2px' }}
        onMouseEnter={e => e.target.style.color = 'var(--white)'}
        onMouseLeave={e => e.target.style.color = 'var(--dim)'}
      >← Volver al inicio</a>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)', padding: '2rem 1.5rem' }}>
      <style>{`
        .admin-table { width:100%; border-collapse:collapse; }
        .admin-table th { font-size:0.58rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); padding:1rem 1.2rem; text-align:left; border-bottom:1px solid var(--border); white-space:nowrap; }
        .admin-table td { font-size:0.8rem; color:var(--dim); padding:1rem 1.2rem; border-bottom:1px solid var(--border); }
        .admin-table tr:hover td { background:rgba(240,237,230,0.03); }
        .search-input { background:rgba(240,237,230,0.05); border:1px solid var(--border); color:var(--white); padding:0.7rem 1rem; font-family:'DM Sans',sans-serif; font-size:0.8rem; outline:none; width:280px; transition:border-color 0.3s; }
        .search-input:focus { border-color:var(--gold); }
        .search-input::placeholder { color:var(--dim); }
        @media(max-width:600px) {
          .search-input { width:100%; }
          .admin-table th:nth-child(3), .admin-table td:nth-child(3) { display:none; }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Image src="/logo.png" alt="STRANA" width={60} height={60} style={{ width: '44px', height: 'auto' }} />
          <div>
            <p style={{ fontSize: '0.55rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)' }}>Panel Admin</p>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '0.05em' }}>Tarjetas VIP</h1>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={fetchData} disabled={loading} style={{ background: 'none', border: '1px solid var(--gold)', color: 'var(--gold)', padding: '0.6rem 1.2rem', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}>
            {loading ? 'Cargando...' : 'Actualizar'}
          </button>
          <button onClick={() => setAuth(false)} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--dim)', padding: '0.6rem 1.2rem', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--dim)'}
          >Cerrar sesión</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)', marginBottom: '2rem' }}>
        {[
          ['Registradas', data.length],
          ['Disponibles', 200 - data.length],
          ['Total', 200],
        ].map(([label, val]) => (
          <div key={label} style={{ background: 'var(--black)', padding: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--gold)', lineHeight: 1 }}>{val}</p>
            <p style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--dim)', marginTop: '0.3rem' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <input className="search-input" type="text" placeholder="Buscar por nombre, tarjeta o teléfono..."
          value={search} onChange={e => setSearch(e.target.value)} />
        <p style={{ fontSize: '0.65rem', color: 'var(--dim)', letterSpacing: '0.1em' }}>
          {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', border: '1px solid var(--border)' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tarjeta</th>
              <th>Nombre</th>
              <th>Fecha Nac.</th>
              <th>Teléfono</th>
              <th>Registro</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--dim)' }}>Sin registros</td></tr>
            ) : filtered.map((r, i) => (
              <tr key={i}>
                <td><span style={{ color: 'var(--gold)', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}>#{r.tarjeta}</span></td>
                <td style={{ color: 'var(--white)' }}>{r.nombre}</td>
                <td>{formatBirth(r.fecha_nacimiento)}</td>
                <td>{r.telefono}</td>
                <td style={{ fontSize: '0.7rem' }}>{formatDate(r.timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: '0.6rem', color: 'var(--dim)', marginTop: '2rem', textAlign: 'center', letterSpacing: '0.1em' }}>
        STRANA GDL · Panel de gestión interno
      </p>
    </div>
  )
}
