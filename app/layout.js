import './globals.css'

export const metadata = {
  title: 'STRANA GDL — El Universo de la Noche',
  description: 'El venue más avanzado de Guadalajara. Experiencias que no se olvidan.',
  openGraph: {
    title: 'STRANA GDL',
    description: 'El venue más avanzado de Guadalajara.',
    url: 'https://stranagdl.com',
    siteName: 'STRANA GDL',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div id="cursor" />
        {children}
      </body>
    </html>
  )
}
