# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dos audiencias confirmadas, ambas en español, revisando el portafolio en escritorio o móvil:

1. **Empleadores y reclutadores** que evalúan a Omar para prácticas profesionales, estadías o puestos junior/trainee de marketing digital, redes sociales o creación de contenido. Vienen a verificar: qué hizo, con qué resultados, y si sabe producir (foto, video, copy).
2. **Dueños de negocios pequeños/locales** (tiendas, estudios, comercios de León, Guanajuato y alrededores) que buscan quién les maneje redes sociales, les produzca contenido, foto y video, o les atienda clientes.

## Product Purpose

Portafolio de trabajo de una sola página (`/`, sin rutas) que presenta el trabajo real de Omar Rafael Martínez Ríos: marketing digital, manejo de redes sociales, creación de contenido, fotografía y video. Su función es convertir la visita en un contacto real — por cualquiera de las secciones. No domina un único CTA: proyectos prueba con métricas, video demuestra producción, certificaciones respaldan formación y contacto cierra. El éxito es que el visitante actúe: WhatsApp, Instagram, o explorar y compartir el sitio.

## Positioning

Perfil que combina **gestión de redes sociales con capacidad de producción propia** (fotografía y video con equipo propio — Canon EOS Rebel T7) y **resultados medibles verificados**: no promete, muestra capturas de estadísticas reales de plataforma en el lightbox (FunkoTown: +25% seguidores IG, +15% tráfico web; Conejo Fotografía: 20.3 mil visualizaciones, 2.9 mil visitas en Facebook ↑79.7%, 550 interacciones). Vecino de plantillas genéricas de marketing: este portafolio documenta proyectos nombrados, con fechas, entregables y datos que un competidor no puede copiar.

## Operating Context

- Proyecto de un solo usuario: Omar es dueño y editor del contenido. Actualizar el portafolio = editar `src/app/data/portfolio.ts` (única fuente de verdad, sin copy duro en templates) y soltar imágenes/videos en `public/assets/`.
- Los videos viven según los nombres exactos de `public/assets/video/LEEME.md` (`reel-1…3.mp4`, `cine-1…3.mp4`); si falta un archivo, el visor muestra la miniatura con "Video próximamente" sin romper nada.
- Despliegue: `npm run build` → `dist/portafolio/browser`, carpeta estática servible en cualquier hosting (Netlify/Vercel/GitHub Pages). Estado de hosting actual: sin confirmar.
- `legacy/` contiene el sitio estático v1 como referencia histórica; no se sirve.
- Canal real de trabajo con clientes: contacto directo personal (WhatsApp), no formularios ni intermediarios.

## Capabilities and Constraints

- Angular 22 (standalone, signals, zoneless) + Tailwind CSS v4; página única sin enrutamiento; todo el copy en español.
- El sistema visual está documentado en DESIGN.md (incumbente, no parte de este archivo).
- Accesibilidad y motion ya implementadas: lightbox con foco atrapado, `prefers-reduced-motion` respetado en reveals/contadores.
- **Decisión del dueño (18/10/2026, copy afinado 20/10/2026):** el copy se mantiene en primera persona, con tono natural y sin repetir el nombre en cada sección; la formación se expresa como "10.º cuatrimestre · a punto de terminar" y la búsqueda como "prácticas, estadías o una oportunidad laboral". No reintroducir el reclamo "TSU… obtenido" ni ningún título; si concluye la carrera, se actualiza con la palabra exacta del dueño.
- Cinematográficos universitarios (Bosque nocturno, Comercial UTL, Intro) son proyectos escolares; Conejo Fotografía fue colaboración profesional más allá de lo académico; FunkoTown fue proyecto grupal universitario — no representarlos como contratos comerciales.
- Fecha de graduación y disponibilidad de horarios: sin confirmar; no inventar.

## Brand Commitments

- Nombre y marca personal: **Omar Rafael Martínez Ríos**; favicon "OM" blanco sobre tinta (rectángulo `#17191C`, radio 16).
- Canales oficiales reales: WhatsApp 477-591-0992 (`wa.me/524775910992`), Instagram **@alchemist.mar** (registro vive en el data por el `@` escapado) y correo **omarmtzr675@gmail.com** (`mailto` con asunto de prácticas, estadías o una oportunidad laboral).
- Idioma: **español** en todo el copy. Tono cercano y humano (ej.: ":)" en la copia de FunkoTown, "Pasión & hobby" como fecha del proyecto independiente) — mantener, no formalizar.
- Veracidad: solo trabajo real y métricas con captura de respaldo. Sin testimonios, prensa ni clientes inventados — el repositorio no los tiene y no deben fabricarse.

## Evidence on Hand

- **FunkoTown** (negocio local de cómics/Funko pops; proyecto universitario 3er cuatrimestre, 06/2024): logo, capturas de perfiles en Meta (Facebook/Instagram), Ads Manager y planificador, publicaciones, y 5 fotos de local para Google My Business — en `public/assets/img/funkotown/`. Enlace real: https://linktr.ee/funkotown
- **Conejo Fotografía (Faty Conejo)**, estudio de fotografía en León, Guanajuato: logo, 3 capturas de estadísticas de plataforma (visualizaciones/visitas/interacciones), 2 publicaciones, 2 sesiones fotográficas (temporada e infantil temática) — en `public/assets/img/conejo/`.
- **Trabajo independiente** (pasión/hobby): 17 fotografías + foto del equipo (Canon EOS Rebel T7) en `public/assets/img/independiente/`.
- **Video**: 3 reels verticales "Acuario" y 3 piezas de cine (Bosque nocturno — cortometraje universitario; Comercial UTL; Intro de presentación) — miniaturas en `public/assets/img/video/`; los `.mp4` correspondientes pueden no existir aún (fallback contemplado).
- **Formación**: 3 certificados reales con imagen: Fundamentals of Digital Marketing (Google, 8/05/2024); Google: IA Práctica para Marketing (Santander Open Academy, 01/2026); Storytelling en el Marketing Digital (Santander · UChicago, 12/01/2026) — en `public/assets/img/certs/`.
- **Foto personal** para about/OG: `public/assets/img/about/omar.jpg`.
- Ausencias que ningún trabajo futuro debe fabricar: testimonios de clientes, prensa, logros laborales formales, cifra de clientes atendidos.

## Product Principles

1. **El trabajo real es la prueba.** Todo lo mostrado corresponde a un proyecto y activo verificable; las métricas llevan captura al alcance de un clic.
2. **Dos puertas de contacto sin fricción.** WhatsApp para quien decide hoy; Instagram para quien quiere conocer el trabajo en curso.
3. **Cercanía antes que grandilocuencia.** Presentarse como estudiante que produce y aprende: honestidad que gana confianza, no títulos inflados.
4. **Fácil de mantener vivo.** El propio Omar actualiza proyectos/métricas sin tocar código de templates; el portafolio crece con su carrera.
5. **La pieza manda.** La experiencia se apoya en el contenido (foto/video/proyectos); la interfaz cede el protagonismo.

## Accessibility & Inclusion

- Español como único idioma de contenido (`lang="es"`).
- Interacción por teclado completa en el visor (foco atrapado, Escape/←/→); swipe en táctil; foco devuelto al abridor.
- Movimiento reducido respetado (`prefers-reduced-motion`) en reveals, contadores y animaciones.
- Nivel WCAG específico requerido: sin confirmar; no introducir degradaciones a lo ya implementado.
