# Portafolio — Omar Rafael Martínez Ríos

Portafolio profesional construido con **Angular 22** (standalone, signals, zoneless) y **Tailwind CSS v4** con el mundo visual "Steep" — papel blanco, serif editorial y un solo acento melocotón (ver `DESIGN.md`). Marketing digital · Redes sociales · Creación de contenido · Fotografía · Video — León, Guanajuato.

## Comandos

```bash
npm install      # instalar dependencias
npm start        # servidor de desarrollo → http://localhost:4200
npm run build    # build de producción → dist/portafolio
```

> Para pruebas locales con videos: copia los archivos `.mp4` a `public/assets/video/` con los nombres de `public/assets/video/LEEME.md`. Si faltan, el visor muestra la miniatura con el aviso "Video próximamente".

## Stack

| Capa | Qué usa |
| --- | --- |
| Framework | Angular 22, componentes standalone, `signals` + `computed()`, zoneless |
| Estilos | Tailwind CSS v4 (`@theme` en `src/styles.css`, sin `tailwind.config.js`) |
| Fuentes | Source Serif 4 (display, peso 400) + Inter (texto) — variables de Google Fonts |
| Contenido | `src/app/data/portfolio.ts` — única fuente de verdad (proyectos, métricas, videos, certs) |
| Visor | `LightboxService` + `Lightbox` component: teclado, foco atrapado, swipe, fallback de video |

## Estructura

```
src/
  index.html              Metadatos, fuentes, favicon
  styles.css              Tema Tailwind + keyframes + componentes compartidos
  app/
    data/portfolio.ts     Contenido y tipos (IconName union, LbItem…)
    services/lightbox.ts  Estado global del visor
    directives/           Reveal (scroll-animado) · CountUp (contadores)
    components/           header · hero · marquee · about · philosophy ·
                          projects · video · skills · contact · footer ·
                          lightbox · icon
public/assets/            Imágenes y videos (Angular los copia al build)
legacy/                   Sitio estático v1 (referencia; no se sirve)
```

## Detalles de robustez

- Lightbox: foco atrapado con `Tab`, `Escape`/`←`/`→` globales (`document:keydown`), swipe en táctil, devolución de foco al elemento que abrió; el medio se reutiliza al navegar (cambio de `src`) y un video que falla se sustituye por la miniatura — sin listeners huérfanos ni warning NG0956.
- Video fallback: `src` directo en `<video>` — nunca en `<source>`, porque el evento `error` se emitiría en el `<source>` y el fallback no se activaría.
- Zona sin zone: todo el estado visual es `signal()`; los listeners manuales se limpian con `DestroyRef`.
- `prefers-reduced-motion` respetado en reveals, contadores y animaciones CSS.
- Seguridad: enlaces externos con `rel="noopener noreferrer"`; iconos referenciados por un union tipado (sin hrefs arbitrarios).

## Deploy

`npm run build` genera `dist/portafolio/browser` — carpeta estática lista para cualquier hosting (Netlify, Vercel, GitHub Pages…).
