import './globals.css'

export const metadata = {
  title: 'STRANA GDL — El Universo de la Noche',
  description: 'El venue más avanzado de Guadalajara. Experiencias que no se olvidan.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'STRANA GDL',
    description: 'El venue más avanzado de Guadalajara.',
    url: 'https://stranagdl.com',
    siteName: 'STRANA GDL',
    images: [{ url: 'https://stranagdl.com/logo.png', width: 800, height: 800 }],
  },
  twitter: {
    card: 'summary',
    title: 'STRANA GDL',
    description: 'El venue más avanzado de Guadalajara.',
    images: ['https://stranagdl.com/logo.png'],
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
