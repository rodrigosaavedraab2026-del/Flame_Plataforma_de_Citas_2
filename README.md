# 🔥 Flama - Premium Dating Platform

Plataforma de citas premium construida con React, TypeScript, Vite, Tailwind CSS, Supabase, Stripe y Firebase.

![Flama](https://img.shields.io/badge/Flama-Premium%20Dating-orange)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Características

### Core
- ✅ Autenticación completa (Email, Google, Apple, Facebook)
- ✅ Swipe con gestos y animaciones
- ✅ Sistema de matches en tiempo real
- ✅ Chat con notas de voz
- ✅ 4 niveles de membresía (Plus, Gold, Platinum, SELECT™)

### Fase 2 - Engagement
- ✅ Historias/Aspectos destacados
- ✅ Eventos en persona
- ✅ Juegos rompehielos
- ✅ Perfiles de vídeo
- ✅ Notas de voz en chat

### Fase 3 - Inteligencia
- ✅ Match con IA
- ✅ Análisis de compatibilidad
- ✅ Modo BFF/Negocio
- ✅ Verificación LinkedIn
- ✅ Analytics para usuarios

### Fase 4 - Seguridad
- ✅ Profile Setup Wizard
- ✅ Likes Recibidos (Gold+)
- ✅ Top Picks Diarios (Gold+)
- ✅ Sistema de reportes/bloqueo
- ✅ Sistema de Toasts

### Fase 5 - Avanzado
- ✅ Video llamadas
- ✅ Notificaciones push
- ✅ Marketplace de regalos virtuales
- ✅ Modo grupo
- ✅ Integración Spotify
- ✅ Filtros AR
- ✅ Citas programadas
- ✅ Verificación con IA
- ✅ Moderación con IA

### Fase 6 - Backend
- ✅ Integración con Supabase
- ✅ Autenticación real
- ✅ Base de datos PostgreSQL
- ✅ Storage para imágenes/videos
- ✅ Realtime para chat
- ✅ Row Level Security (RLS)

### Fase 7 - Integraciones
- ✅ Stripe para pagos
- ✅ Firebase para push notifications
- ✅ Preparado para Agora.io (video calls)
- ✅ Preparado para AWS Rekognition (IA)

### Fase 8 - Testing & CI/CD
- ✅ Tests unitarios con Vitest
- ✅ Tests de integración
- ✅ GitHub Actions CI/CD
- ✅ Deploy automático a Vercel

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/yourusername/flama.git
cd flama

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Ejecutar en desarrollo
npm run dev
```

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Tests con UI
npm run test:ui

# Tests con coverage
npm run test:coverage
```

## 🏗️ Build

```bash
# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🗄️ Base de Datos

### Supabase Setup

1. Crear proyecto en [Supabase](https://supabase.com)
2. Ejecutar el schema SQL:
```bash
# Copiar contenido de supabase/schema.sql
# Pegar en SQL Editor de Supabase
```

3. Configurar Storage buckets:
- `profile-photos` (público)
- `chat-images` (privado)
- `voice-messages` (privado)
- `stories` (público)

4. Obtener credenciales:
- URL del proyecto
- Anon key
- Service role key (solo backend)

### Estructura de Tablas

```sql
profiles          -- Perfiles de usuario
matches           -- Likes y matches
messages          -- Mensajes de chat
subscriptions     -- Suscripciones Stripe
notifications     -- Notificaciones
events            -- Eventos en persona
event_registrations -- Registros a eventos
stories           -- Historias
```

## 💳 Pagos con Stripe

1. Crear cuenta en [Stripe](https://stripe.com)
2. Configurar productos y precios:
   - Plus: $14.99/mes
   - Gold: $29.99/mes
   - Platinum: $49.99/mes
   - SELECT™: $99.99/mes

3. Configurar webhooks:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

4. Agregar clave pública a `.env`:
```env
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

## 🔔 Notificaciones Push

1. Crear proyecto en [Firebase](https://firebase.google.com)
2. Habilitar Cloud Messaging
3. Generar VAPID key
4. Agregar credenciales a `.env`:
```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_VAPID_KEY=...
```

## 📹 Video Llamadas (Agora.io)

1. Crear cuenta en [Agora.io](https://www.agora.io)
2. Crear proyecto
3. Obtener App ID
4. Agregar a `.env`:
```env
VITE_AGORA_APP_ID=your-app-id
```

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Variables de Entorno en Vercel

Agregar todas las variables de `.env` en:
- Vercel Dashboard → Project → Settings → Environment Variables

### GitHub Actions

El pipeline CI/CD incluye:
- ✅ Tests automáticos
- ✅ Build
- ✅ Deploy a staging (develop)
- ✅ Deploy a production (main)
- ✅ Lighthouse audit
- ✅ Notificaciones Slack

## 📊 Estructura del Proyecto

```
flama/
├── src/
│   ├── components/       # Componentes React
│   ├── services/         # Servicios (auth, stripe, etc.)
│   ├── store/            # Zustand store
│   ├── data/             # Datos estáticos
│   ├── lib/              # Librerías y utilidades
│   ├── test/             # Tests
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Entry point
├── supabase/
│   └── schema.sql        # Schema de base de datos
├── public/               # Assets estáticos
├── .github/
│   └── workflows/        # GitHub Actions
├── .env.example          # Variables de entorno ejemplo
├── vitest.config.ts      # Configuración de tests
└── package.json
```

## 🔐 Seguridad

- ✅ Row Level Security (RLS) en Supabase
- ✅ Validación de inputs
- ✅ HTTPS everywhere
- ✅ Content Security Policy
- ✅ Rate limiting
- ✅ Verificación de email
- ✅ Verificación con IA

## 📱 Responsive Design

- ✅ Mobile-first
- ✅ Tablet optimized
- ✅ Desktop ready
- ✅ PWA support (próximamente)

## 🎨 Diseño

- ✅ Dark mode
- ✅ Animaciones con Framer Motion
- ✅ Iconos con Lucide React
- ✅ Gradientes modernos
- ✅ Glassmorphism effects

## 📈 Métricas

### Objetivo de Conversión
- Free → Paid: 5-8%
- Retención mensual: 70%+
- ARPU: $8-12/mes
- LTV: $96-144
- CAC: < $20

## 🛠️ Tecnologías

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Animaciones:** Framer Motion
- **Estado:** Zustand
- **Iconos:** Lucide React
- **Backend:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Pagos:** Stripe
- **Notificaciones:** Firebase Cloud Messaging
- **Video:** Agora.io (preparado)
- **IA:** AWS Rekognition (preparado)
- **Testing:** Vitest, React Testing Library
- **CI/CD:** GitHub Actions
- **Deploy:** Vercel

## 📝 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run test         # Ejecutar tests
npm run test:ui      # Tests con UI
npm run test:coverage # Tests con coverage
npm run typecheck    # Verificación de tipos
npm run lint         # Linter
```

## 🤝 Contribuir

1. Fork el repositorio
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

## 👥 Equipo

- **Rodrigo Saavedra Ábalos** - Desarrollo Full Stack

## 📞 Soporte

Para soporte técnico o preguntas:
- Email: support@flama.app
- Documentación: https://docs.flama.app

## 🙏 Agradecimientos

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Supabase](https://supabase.com/)
- [Stripe](https://stripe.com/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

**Hecho con ❤️ por Rodrigo Saavedra Ábalos**

🔥 **Flama - Enciende la chispa**
