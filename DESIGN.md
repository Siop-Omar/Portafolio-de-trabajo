# DESIGN.md — Mundo visual "Steep"

*"Steep — serif editorial sobre papel cálido"* — la casa de Omar Martínez actúa como una revista de producto: el fotógrafo-editor es la editorial y las piezas (foto, video, capturas de métricas reales) son los artefactos flotantes de la página. Contrato de dirección firmado en `.impeccable/surfaces/src-app-app-html.md`; documentación de la implementación a partir del código (`src/styles.css`, `src/index.html` y los componentes).

## Esencia

- **Un solo acento**: papel blanco acromático + un único momento melocotón/sienna por página (la cita de Filosofía). Todo lo demás es tinta sobre papeles.
- **Se niega el default de la categoría**: sin hero oscuro con degradado, sin tarjetas con degradado, sin glows morados.
- **Editorial, no app**: jerarquía por escala y blanco, no por cajas de color; las fotos, métricas y capturas prueban, no realizan.

## Tokens (`@theme` en `src/styles.css`)

| Token | Valor | Uso |
| --- | --- | --- |
| `ink` | `#17191C` | texto/fondos tinta (footer, visor 96 %, botón principal) |
| `paper` | `#FFFFFF` | canvas principal |
| `mist` | `#F2F2F3` | tarjetas planas, radio 24 |
| `fog` | `#FAFAFB` | bandas alternas (about, video, contacto) |
| `line` | `#ECECEC` | hairlines: sobre imagen, en separadores y bordes |
| `slate` `ash` `smoke` | `#777B86` `#979799` `#A3A6AF` | solo enlaces y adornos decorativos; el texto informativo usa `ink/70…80` |
| `peach` `sienna` | `#FBE1D1` `#5D2A1A` | UNA tarjeta por página (cita, texto sienna) |

Sombras (solo capa de artefactos flotantes, offset + blur largo):
`--shadow-subtle`, `--shadow-subtle-2`, `--shadow-artifact` (rgba tinta).

## Tipografía

- **Display**: Source Serif 4 (variables, sustituto de Signifier) — SIEMPRE peso 400; la jerarquía la pone la escala (`.display-1`, `.display-2`, `.h-sm`), nunca el bold. Titulares con tracking apretado (−0.015/−0.025em) y `em` itálico de énfasis dentro del titular romano.
- Escalas de display: clamp hasta 44 / 64 / 90 px.
- **UI/cuerpo**: Inter (variables, sustituto de Sohne) — pesos de medio paso `font-430/450/480` antes de 500; 14/16/17/20 px; texto secundario informativo `ink/70…80` (jamás un gris decorativo).

## Formas y profundidad

- Tarjetas `mist` r24 **planas** (sombras prohibidas, incluido el hover).
- Artefactos flotantes: papel blanco r20 + `--shadow-artifact`, rotación ±1.5–2 °, con pie `.figure-cap`; solapan márgenes de propósito.
- Imágenes r12 + hairline `line`.
- Botones SIEMPRE píldora: relleno tinta (`.btn-ink`) o fantasma (`.btn-ghost`; sobre tinta, `.btn-fog`).
- Enlaces de texto: sufijo flecha `→` (`.link-arrow`), sin subrayado en reposo.

## Momento firma y movimiento

- Las líneas del titular se revelan desde máscara con retardo escalonado sobre la carga inicial (animación `rise` en `.h-line`, conjunto escalonado `.fu d3…d7`).
- Reveals al scroll (`.fadeUp`+IO) y contadores (CountUp) con `ease-out-quart`.
- `prefers-reduced-motion: reduce` desactiva las entradas: el contenido se ve al instante.
- Marquee de especialidades en banda fog, separador `·`.

## Superficies de navegador (parte del diseño)

`::selection` melocotón; focus-visible tinta (dentro del visor, melocotón); scrollbar claro; footer en banda tinta con cierre serif ("Gracias por *visitar*…") y píldora retorno `.btn-fog`.

## Dos y Don'ts

**Sí** hairlines en vez de sombra sobre tarjetas; icono línea (sprite `i-*`) en círculo papel; cromatismo de un solo acento; texto secundario discreto.

**No** (anti-patrones vetados): eyebrows/kickers numerados sobre headings, texto con degradado, sombras duras o de color sin offset (glow), sparklines decorativos, mono espaciado de adorno, `font-weight` ≥ 500 en display serif, gris `smoke/ash/slate` en texto informativo sobre blanco, más de una superficie melocotón por página.
