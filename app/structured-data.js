export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "NightClub",
    "name": "STRANA GDL",
    "url": "https://stranagdl.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Pablo Neruda 2715",
      "addressLocality": "Guadalajara",
      "addressCountry": "MX"
    },
    "openingHours": "Fr-Sa 23:00-04:00",
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}