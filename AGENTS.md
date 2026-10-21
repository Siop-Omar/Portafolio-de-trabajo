# Portafolio — Omar Rafael Martínez Ríos

Aplicación **Angular 22** (standalone, signals, zoneless) + **Tailwind CSS v4**. Un solo `/` sin rutas, en español. Reference del sitio estático anterior en `legacy/`.

## Comandos

```bash
npm start        # dev server (http://localhost:4200)
npm run build    # build de producción → dist/portafolio
```

No hay tests ni lint. La verificación es manual: abrir en navegador y probar lightbox, menú móvil y galerías.

## Estructura

- `src/index.html` — metadatos, fuentes (Source Serif 4 display + Inter, ambas variables de Google Fonts) y favicon inline (OM blanco sobre tinta)
- `src/styles.css` — **todo el diseño**: tema Tailwind (`@theme` con tokens Steep: `ink/paper/mist/fog/line/slate/ash/smoke/peach/sienna` + `--font-display`/`--font-sans` + sombras), keyframes y componentes compartidos (`.display-1/2`, `.h-sm`, `.btn`, `.card`, `.artifact`, `.g-item`, `.v-card`, `.local-grid`, `.lightbox`…)
- `src/app/data/portfolio.ts` — **única fuente del contenido** (proyectos, métricas, videos, certificaciones, contacto). Los templates no tienen copy duro
- `src/app/services/lightbox.ts` — estado global del visor (signals: open/index/items); devuelve el foco al opener
- `src/app/components/` — una carpeta plana: header (scroll/menú/sección activa), hero, marquee, about, philosophy, projects, video, skills, contact, footer, lightbox, icon
- `src/app/directives/` — `Reveal` (aparece al scroll, respeta `prefers-reduced-motion`) y `CountUp` (contadores animados)
- `public/assets/` — imágenes y videos que sirven Angular (los carga desde `assets/…`)

## Videos (fácil de equivocarse)

`public/assets/video/LEEME.md` define los nombres exactos esperados: `reel-1.mp4`…`reel-3.mp4`, `cine-1.mp4`…`cine-3.mp4`. El lightbox lee `data-video` desde el dato `VItem.src`. Si falta un archivo, el visor muestra la miniatura con el aviso "Video próximamente" — **no hay ningún error de build ni de consola que lo avise**.

## Convenciones

- **Mundo visual ("Steep", DESIGN.md)**: papel blanco acromático + un solo acento `peach`/`sienna`. Usar solo los tokens de `@theme` (`ink/paper/mist/fog/line/slate/ash/smoke/peach/sienna`); nada de hex sueltos en templates. La tarjeta `peach` aparece una sola vez por página (cita de Filosofía).
- **Tipografía**: headings en serif display ("Source Serif 4") SIEMPRE en peso 400 con itálicas de énfasis — nunca bold; cuerpo/UI en Inter con pesos de medio paso (`font-430/450/480` antes de 500). Titulares por clases `.display-1`, `.display-2`, `.h-sm`.
- **Profundidad**: sombras solo en artefactos flotantes (`.artifact`); las tarjetas `.card` van planas, sin sombra. Botones siempre píldora (`.btn` + `btn-ink`/`btn-ghost`/`btn-fog`). Enlaces de texto con sufijo flecha (`.link-arrow`), sin subrayado en reposo.
- **Anti-patrones prohibidos**: eyebrows numerados sobre headings, texto con degradado, sombras duras/da color sin offset, sparklines decorativos, mono-espaciado de adorno.
- **Tailwind v4**: sin `tailwind.config.js`; el tema vive en `src/styles.css` vía `@theme`. El modificador important es sufijo (`border-t-0!`), no prefijo.
- **Inputs numéricos** de directivas requieren binding de corchetes: `[appRevealDelay]="100"`, no `appRevealDelay="100"`.
- **Iconos**: `<app-icon name="…"/>` contra el sprite `<symbol id="i-*">` en `app.html`. `IconName` es un union tipado — agregar nuevos íconos ahí.
- **Contenido**: agregar un proyecto = registrar objeto en `PROJECTS` (data), no tocar `projects.html`. El grupo del lightbox se arma solo (portada + bloques).
- **Seguridad**: enlaces externos con `target="_blank"` deben llevar `rel="noopener noreferrer"`.
- **`@` y llaves** en texto de template deben escaparse (`&#64;alchemist.mar`); el registro de Instagram vive en el data por eso.
- Idioma: español en todo el copy.

## Robustez embebida (no romper)

- Lightbox: foco atrapado (Tab), Escape/←/→, swipe táctil, bloqueo de scroll con restauración garantizada en destroy. El medio se reutiliza al navegar (cambia el `src`) y `videoFailed` se reinicia en el effect; si un video falla, la plantilla lo sustituye por la miniatura y el nodo viejo se destruye con su listener. No recrear el medio con `@for … track item` sobre una colección de 1 (dispara el warning NG0956).
- Error de video: el `src` va **directo en `<video>`**, no en `<source>` (con `<source>`, el evento `error` se emite en el `<source>` y el fallback nunca se activaría).
- Zona sin zone (zoneless): todo estado visual pasa por `signal()`/`computed()`; los listeners manuales se limpian con `DestroyRef`.
- Fuera de línea de red: fuentes vienen de Google Fonts (CDN) — Source Serif 4 e Inter variables, sin fallback local — no romper el `<link rel="preconnect">`.
