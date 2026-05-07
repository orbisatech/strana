# STRANA GDL — Setup Guide

## Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Google Fonts (Bebas Neue + DM Sans)
- Deploy: Vercel

---

## 1. Instalar y correr localmente

```bash
npm install
npm run dev
```

Abre http://localhost:3000

---

## 2. Deploy en Vercel

1. Sube el proyecto a GitHub
2. Ve a vercel.com → New Project → importa el repo
3. Vercel detecta Next.js automáticamente → Deploy

---

## 3. Conectar dominio de Hostinger a Vercel

En Vercel → Settings → Domains → agrega `stranagdl.com`

Vercel te da dos registros DNS. En Hostinger → DNS Zone:
- Tipo A → @ → 76.76.21.21
- CNAME → www → cname.vercel-dns.com

Listo en ~10 minutos.

---

## 4. Configurar los chips NFC

Cada chip debe redirigir a:
```
https://stranagdl.com/vip?card=NUMERO_DE_TARJETA
```

Ejemplo para tarjeta #001:
```
https://stranagdl.com/vip?card=001
```

Usa una app como **NFC Tools** (Android/iOS) para escribir la URL en cada chip.

---

## 5. Recibir datos del formulario VIP

### Opción A — Google Sheets (más fácil)
1. Crea un webhook en Make.com o Zapier
2. Conecta con Google Sheets
3. Agrega la URL en `.env.local`:
```
NEXT_PUBLIC_WEBHOOK_URL=https://hook.make.com/tu-webhook
```

### Opción B — Tu propia API
Modifica `app/vip/page.js` → función `handleSubmit` con tu endpoint.

---

## 6. Personalizar contenido

| Archivo | Qué editar |
|---------|-----------|
| `components/Events.js` | Array `EVENTS` con tus fechas reales |
| `components/Hero.js` | Foto de fondo (reemplaza URL de Unsplash) |
| `components/VIPTeaser.js` | Foto de fondo VIP |
| `components/Location.js` | Dirección y coordenadas reales |
| `components/Footer.js` | Links de redes sociales |
| `app/globals.css` | Colores (variables CSS al inicio) |

---

## 7. Imágenes propias

Reemplaza las URLs de Unsplash con tus fotos:
```
backgroundImage: 'url(/tu-foto.jpg)'
```

Pon las fotos en la carpeta `/public/` del proyecto.

---

## Variables de entorno

Crea `.env.local` en la raíz:
```
NEXT_PUBLIC_WEBHOOK_URL=https://tu-webhook-aqui
```
