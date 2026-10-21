# Videos del portafolio

Los archivos **.mp4** viven aquí con estos nombres exactos y el sitio los reproduce:
el `src` del video viene del dato (`REELS` / `FILMS` / `CONTENT_VIDEO` en `src/app/data/portfolio.ts`).

| Archivo          | Contenido                                      | Origen (`Materiales/`) |
| ---------------- | ---------------------------------------------- | ---------------------- |
| `reel-1.mp4`     | Reels — Acuario I                              | *(sin archivo aún)*    |
| `reel-2.mp4`     | Reels — Acuario II                             | *(sin archivo aún)*    |
| `reel-3.mp4`     | Reels — Acuario III                            | *(sin archivo aún)*    |
| `reel-4.mp4`     | Cobertura del mercado cultural (1080×1920)     | `R1.mp4`               |
| `reel-5.mp4`     | Puesto de mascotas — accesorios (720×1280)     | `R2.mp4`               |
| `reel-6.mp4`     | Feria del libro — autor de terror (1080×1920)  | `R3.mp4`               |
| `cine-1.mp4`     | Presentaciones en cine — Intro                 | *(sin archivo aún)*    |
| `cine-2.mp4`     | Presentaciones en cine — Bosque nocturno       | *(sin archivo aún)*    |
| `cine-3.mp4`     | Presentaciones en cine — Comercial UTL         | *(sin archivo aún)*    |
| `contenido-1.mp4` | Creación de contenido — Cheese'C (cupcakes, detrás de cámaras) (478×850) | `R4.mp4` |

Las miniaturas (`assets/img/video/*.jpg`) se generan con un frame del propio video
(canvas 2D → JPEG). reel-1..3 y cine-1..3 siguen con miniatura del PDF anterior
mientras no se cuente con sus archivos.

Mientras un archivo no exista, el visor muestra la miniatura con el aviso "Video próximamente".

## Peso y flujo de compresión

Los 4 archivos publicados están **comprimidos para web** (H.264 + AAC, `+faststart`, CRF 24, preset medium)
con ffmpeg. Los originales sin comprimir quedan preservados en `Materiales/` con su nombre `R#`.

| Archivo            | Resolución | Original (`Materiales/`) | Publicado | Receta                                  |
| ------------------ | ---------- | ------------------------ | --------- | --------------------------------------- |
| `reel-4.mp4`       | 720×1280   | `R1.mp4` · 163 MB        | ~14.9 MB  | `scale 720 · crf 26 · maxrate 1.8M · aac 96k` |
| `reel-5.mp4`       | 720×1280   | `R2.mp4` · 39 MB         | ~12.5 MB  | `scale 720 · crf 26 · maxrate 1.6M · aac 96k` |
| `reel-6.mp4`       | 720×1280   | `R3.mp4` · 121 MB        | ~9.1 MB   | `scale 720 · crf 26 · maxrate 1.8M · aac 96k` |
| `contenido-1.mp4`  | 480×854    | `R4.mp4` · 20 MB         | ~8.8 MB   | `scale 480 · crf 26 · maxrate 800k · aac 96k` |

Regla de recambio: editar/exportar → comprimir con la receta de la tabla → reemplazar el archivo
con el **mismo nombre** (los nombres y las rutas en el data (`REELS` / `FILMS` / `CONTENT_VIDEO`)
no cambian). Fórmula completa de referencia:

```bash
ffmpeg -i origen.mp4 -vf scale=720:-2 -c:v libx264 -preset fast -crf 26 -maxrate 1800k -bufsize 3600k \
  -pix_fmt yuv420p -profile:v high -movflags +faststart -c:a aac -b:a 96k destino.mp4
```
