/**
 * Contenido y tipos del portafolio.
 * Todos los assets viven en `public/assets/` (Angular los copia a la raíz del bundle).
 */

export type IconName =
  | "wa" | "ig" | "mail" | "arrow" | "cal" | "zoom" | "play" | "info" | "up"
  | "left" | "right" | "close" | "gem" | "bolt" | "spark" | "target"
  | "camera" | "edit" | "ai" | "chart" | "db";

export type GalleryLayout = "duo" | "trio" | "local" | "sessions" | "masonry";

export interface GItem {
  src: string;
  alt: string;
  caption: string;
  /** La imagen se ajusta "contain" (típico de capturas de estadísticas). */
  contain?: boolean;
}

export interface Metric {
  /** Texto final mostrado (coincide con prefix + valor + suffix). */
  display: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  trend?: string;
}

export interface ProjectBlock {
  title: string;
  layout: GalleryLayout;
  count?: string;
  items: GItem[];
}

export interface Project {
  id: string;
  num: string;
  date: string;
  dateIcon: IconName;
  title: string;
  titleAccent?: string;
  desc: string;
  cover: GItem;
  metrics?: Metric[];
  blocks: ProjectBlock[];
  linkCard?: { text: string; sub: string; href: string; label: string };
}

export interface VItem {
  thumb: string;
  src: string;
  posterAlt: string;
  title: string;
  sub: string;
  /** Texto del lightbox. */
  caption: string;
}

export interface Cert {
  img: string;
  alt: string;
  issuer: string;
  title: string;
  meta: string;
  caption: string;
}

export interface Value {
  icon: IconName;
  title: string;
  desc: string;
}

export interface SkillGroup {
  icon: IconName;
  title: string;
  chips: string[];
}

/* ------------------------------------------------------------------ */

export const HERO_IMGS = {
  main: { src: "assets/img/conejo/sesion-2.jpg", alt: "Sesión fotográfica de temporada" },
  logo: { src: "assets/img/funkotown/logo.jpg", alt: "Logotipo de FunkoTown" },
} as const;

export const MARQUEE_ITEMS: readonly string[] = [
  "Marketing digital",
  "Redes sociales",
  "Creación de contenido",
  "Fotografía",
  "Video",
  "Atención a clientes",
  "Ventas",
  "Google My Business",
];

export const NAV_LINKS = [
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "filosofia", label: "Filosofía" },
  { id: "proyectos", label: "Proyectos" },
  { id: "video", label: "Video" },
  { id: "certificaciones", label: "Certificaciones" },
] as const;

/** Posicionamiento y disponibilidad: se usa en hero, sobre mí, habilidades y contacto. */
export const PROFILE = {
  semester: "10.º cuatrimestre",
  finishing: "a punto de terminar",
  level: "Perfil trainee/junior",
  lookingFor: "prácticas, estadías o una oportunidad laboral",
  seeking: "Abierto a prácticas, estadías o una oportunidad laboral",
  location: "León, Gto.",
} as const;

export const ABOUT_PILLS = ["Marketing", "Diseño", "Atención a clientes", "Ventas", "Fotografía & Video", "Análisis de datos"] as const;

/** Formación académica y objetivo profesional para la sección Sobre mí. */
export const ABOUT_EDUCATION: {
  school: string;
  career: string;
  when: string;
  detail: string;
} = {
  school: "Universidad Tecnológica de León",
  career: "Ingeniería en Entornos Virtuales y Negocios Digitales",
  when: "10.º cuatrimestre · a punto de terminar",
  detail:
    "La carrera me ha dado bases de marketing, datos y negocios. Los proyectos me han enseñado a aterrizarlas " +
    "y a trabajar con otras personas. Ahora quiero dar el salto a un equipo.",
};

export const VALUES: Value[] = [
  {
    icon: "gem",
    title: "Cuidar el detalle",
    desc: "Una buena idea también se ve en el encuadre, el texto y el corte final.",
  },
  {
    icon: "bolt",
    title: "Probar sin miedo",
    desc: "Pregunto, pruebo y corrijo. Cada proyecto me deja algo que no sabía antes.",
  },
  {
    icon: "spark",
    title: "Pensar con curiosidad",
    desc: "Me interesa entender por qué funciona algo, no solo que se vea bonito.",
  },
  {
    icon: "target",
    title: "Mirar el resultado",
    desc: "Me gusta que el trabajo se note: más alcance, mejores respuestas, una marca más clara.",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "funkotown",
    num: "Proyecto 1",
    date: "06/05/2024",
    dateIcon: "cal",
    title: "FunkoTown",
    desc:
      "Un proyecto universitario en equipo para que FunkoTown no solo se viera en su local. Durante el tercer " +
      "cuatrimestre trabajamos su presencia digital: contenido, campañas y fotografía para Google My Business. " +
      "La comunidad respondió y la marca empezó a sonar más allá del mostrador.",
    cover: { src: "assets/img/funkotown/logo.jpg", alt: "Logotipo ilustrado de FunkoTown", caption: "FunkoTown — identidad visual" },
    metrics: [
      { display: "+25%", value: 25, prefix: "+", suffix: "%", label: "Seguidores en Instagram" },
      { display: "+15%", value: 15, prefix: "+", suffix: "%", label: "Tráfico web a la página principal" },
    ],
    blocks: [
      {
        title: "Manejo de redes sociales",
        layout: "duo",
        items: [
          { src: "assets/img/funkotown/redes-1.jpg", alt: "Capturas de los perfiles de FunkoTown en Facebook e Instagram", caption: "Perfiles de FunkoTown en Facebook e Instagram" },
          { src: "assets/img/funkotown/redes-2.jpg", alt: "Administrador de anuncios y planificador de publicaciones de Meta", caption: "Campañas en Meta Ads y planificador de contenido" },
        ],
      },
      {
        title: "Creación de contenido",
        layout: "duo",
        items: [
          { src: "assets/img/funkotown/contenido-1.jpg", alt: "Publicación de FunkoTown con cómics y Funko Pops", caption: "Publicación de cómics y Funko Pops de edición especial" },
          { src: "assets/img/funkotown/contenido-2.jpg", alt: "Video de recomendación publicado en la página de FunkoTown", caption: "Video de recomendación para la comunidad de FunkoTown" },
        ],
      },
      {
        title: "Fotografía de local para Google My Business",
        layout: "local",
        items: [
          { src: "assets/img/funkotown/local-5.jpg", alt: "Fachada del local de FunkoTown con la tienda abierta", caption: "Fachada del local — Google My Business" },
          { src: "assets/img/funkotown/local-1.jpg", alt: "Mesa de exhibición con Funko Pops y cómics", caption: "Exhibición de productos dentro del local" },
          { src: "assets/img/funkotown/local-2.jpg", alt: "Cómics de Halo y libros en exhibición", caption: "Catálogo de cómics y libros" },
          { src: "assets/img/funkotown/local-3.jpg", alt: "Vista exterior de la calle donde se ubica el local", caption: "Vista de la calle — ubicación del local" },
          { src: "assets/img/funkotown/local-4.jpg", alt: "Acceso al local visto desde la banqueta", caption: "Acceso al local desde la calle" },
        ],
      },
    ],
    linkCard: {
      text: "No todo lo que se hizo cabe en una presentación.",
      sub: "Si quieres ver más, aquí están las redes de FunkoTown para que puedas revisarlas :)",
      href: "https://linktr.ee/funkotown",
      label: "Ver redes de FunkoTown",
    },
  },
  {
    id: "conejo",
    num: "Proyecto 2",
    date: "28/04/2025",
    dateIcon: "cal",
    title: "Conejo Fotografía",
    titleAccent: "(Faty Conejo)",
    desc:
      "Fotografía de sesiones, contenido para redes y una comunidad que empezaba a crecer. Trabajé con el estudio " +
      "en su presencia digital y en la atención a clientes; la colaboración continuó después del periodo académico " +
      "y se notó en los resultados.",
    cover: { src: "assets/img/conejo/logo.jpg", alt: "Logotipo de Faty Conejo Fotografía", caption: "Conejo Fotografía (Faty Conejo) — logotipo" },
    metrics: [
      { display: "20.3 mil", value: 20.3, decimals: 1, suffix: " mil", label: "Visualizaciones" },
      { display: "2.9 mil", value: 2.9, decimals: 1, suffix: " mil", label: "Visitas en Facebook", trend: "↑ 79.7%" },
      { display: "550", value: 550, suffix: "", label: "Interacciones", trend: "↑ 1.3 mil%" },
    ],
    blocks: [
      {
        title: "Manejo de redes sociales",
        layout: "trio",
        items: [
          { src: "assets/img/conejo/stats-1.jpg", alt: "Gráfica de visualizaciones: 20.3 mil", caption: "Visualizaciones: 20.3 mil", contain: true },
          { src: "assets/img/conejo/stats-2.jpg", alt: "Gráfica de visitas de Facebook: 2.9 mil", caption: "Visitas de Facebook: 2.9 mil (↑ 79.7%)", contain: true },
          { src: "assets/img/conejo/stats-3.jpg", alt: "Gráfica de interacciones con el contenido: 550", caption: "Interacciones con el contenido: 550 (↑ 1.3 mil%)", contain: true },
        ],
      },
      {
        title: "Creación de contenido para redes sociales",
        layout: "duo",
        items: [
          { src: "assets/img/conejo/contenido-1.jpg", alt: "Publicación de Faty Conejo con retrato enmarcado", caption: "Publicación: “Inmortalizamos los recuerdos de quienes dejaron huella en tu vida”" },
          { src: "assets/img/conejo/contenido-2.jpg", alt: "Publicación de fotografía institucional para una clínica", caption: "Fotografía institucional para clínica" },
        ],
      },
      {
        title: "Sesiones fotográficas",
        layout: "sessions",
        items: [
          { src: "assets/img/conejo/sesion-2.jpg", alt: "Retrato de mujer con suéter navideño frente a puertas decorativas", caption: "Sesión fotográfica de temporada" },
          { src: "assets/img/conejo/sesion-1.jpg", alt: "Sesión infantil temática de granja con globo dorado", caption: "Sesión infantil temática" },
        ],
      },
    ],
  },
  {
    id: "independiente",
    num: "Proyecto 3",
    date: "Pasión & hobby",
    dateIcon: "camera",
    title: "Independiente",
    desc:
      "Esto no es un encargo: es lo que hago cuando la cámara y el tiempo son míos. Producciones propias y " +
      "colaboraciones que me han dejado probar, equivocarme y aprender. Es donde más se nota mi forma de mirar.",
    cover: { src: "assets/img/independiente/camara.jpg", alt: "Cámara Canon EOS sobre una mesa", caption: "Canon EOS Rebel T7" },
    blocks: [
      {
        title: "Fotografía",
        count: "17 FOTOS",
        layout: "masonry",
        items: [
          { src: "assets/img/independiente/foto-01.jpg", alt: "Fotografía independiente 1", caption: "Fotografía independiente 1" },
          { src: "assets/img/independiente/foto-02.jpg", alt: "Fotografía independiente 2", caption: "Fotografía independiente 2" },
          { src: "assets/img/independiente/foto-03.jpg", alt: "Fotografía independiente 3", caption: "Fotografía independiente 3" },
          { src: "assets/img/independiente/foto-07.jpg", alt: "Fotografía independiente 4", caption: "Fotografía independiente 4" },
          { src: "assets/img/independiente/foto-04.jpg", alt: "Fotografía independiente 5", caption: "Fotografía independiente 5" },
          { src: "assets/img/independiente/foto-05.jpg", alt: "Fotografía independiente 6", caption: "Fotografía independiente 6" },
          { src: "assets/img/independiente/foto-08.jpg", alt: "Fotografía independiente 7", caption: "Fotografía independiente 7" },
          { src: "assets/img/independiente/foto-06.jpg", alt: "Fotografía independiente 8", caption: "Fotografía independiente 8" },
          { src: "assets/img/independiente/foto-09.jpg", alt: "Fotografía independiente 9", caption: "Fotografía independiente 9" },
          { src: "assets/img/independiente/foto-12.jpg", alt: "Fotografía independiente 10", caption: "Fotografía independiente 10" },
          { src: "assets/img/independiente/foto-10.jpg", alt: "Fotografía independiente 11", caption: "Fotografía independiente 11" },
          { src: "assets/img/independiente/foto-11.jpg", alt: "Fotografía independiente 12", caption: "Fotografía independiente 12" },
          { src: "assets/img/independiente/foto-13.jpg", alt: "Fotografía independiente 13", caption: "Fotografía independiente 13" },
          { src: "assets/img/independiente/foto-16.jpg", alt: "Fotografía independiente 14", caption: "Fotografía independiente 14" },
          { src: "assets/img/independiente/foto-14.jpg", alt: "Fotografía independiente 15", caption: "Fotografía independiente 15" },
          { src: "assets/img/independiente/foto-17.jpg", alt: "Fotografía independiente 16", caption: "Fotografía independiente 16" },
          { src: "assets/img/independiente/foto-15.jpg", alt: "Fotografía independiente 17", caption: "Fotografía independiente 17" },
        ],
      },
    ],
  },
];

export const REELS: VItem[] = [
  { thumb: "assets/img/video/reel-1.jpg", src: "assets/video/reel-1.mp4", posterAlt: "Miniatura de reel: arrecife de coral", title: "Acuario I", sub: "Reel vertical", caption: "Reel — Acuario I" },
  { thumb: "assets/img/video/reel-2.jpg", src: "assets/video/reel-2.mp4", posterAlt: "Miniatura de reel: peces payaso en blanco y negro", title: "Acuario II", sub: "Reel vertical", caption: "Reel — Acuario II" },
  { thumb: "assets/img/video/reel-3.jpg", src: "assets/video/reel-3.mp4", posterAlt: "Miniatura de reel: acuario con luz azul", title: "Acuario III", sub: "Reel vertical", caption: "Reel — Acuario III" },
  { thumb: "assets/img/video/reel-4.jpg", src: "assets/video/reel-4.mp4", posterAlt: "Miniatura de reel: puesto de cosmética natural en el mercado cultural", title: "Natura · Mercado cultural", sub: "Reel vertical · Cobertura", caption: "Reel — Stand Natura en el mercado cultural" },
  { thumb: "assets/img/video/reel-5.jpg", src: "assets/video/reel-5.mp4", posterAlt: "Miniatura de reel: puesto de accesorios para mascotas en el mercado cultural", title: "Pet Shop · Mercado cultural", sub: "Reel vertical · Cobertura", caption: "Reel — Puesto de accesorios para mascotas" },
  { thumb: "assets/img/video/reel-6.jpg", src: "assets/video/reel-6.mp4", posterAlt: "Miniatura de reel: entrevista al autor en la feria del libro", title: "Feria del libro", sub: "Reel vertical · Entrevista", caption: "Reel — Feria del libro: entrevista y stand editorial" },
];

export const FILMS: VItem[] = [
  { thumb: "assets/img/video/cine-2.jpg", src: "assets/video/cine-2.mp4", posterAlt: "Fotograma en blanco y negro de un bosque nocturno con niebla", title: "Bosque nocturno", sub: "Cortometraje · Proyecto universitario", caption: "Cortometraje — Bosque nocturno" },
  { thumb: "assets/img/video/cine-3.jpg", src: "assets/video/cine-3.mp4", posterAlt: "Fotograma de comercial con productos promocionales UTL", title: "Comercial UTL", sub: "Edición de comercial", caption: "Comercial — Productos UTL" },
  { thumb: "assets/img/video/cine-1.jpg", src: "assets/video/cine-1.mp4", posterAlt: "Fotograma oscuro de la introducción de un video", title: "Intro", sub: "Presentación en cine", caption: "Presentación — Intro" },
];

/** Ejemplo de trabajo creando contenido para redes (pieza vertical). */
export const CONTENT_VIDEO: VItem = {
  thumb: "assets/img/video/contenido-1.jpg",
  src: "assets/video/contenido-1.mp4",
  posterAlt: "Miniatura de video: cupcakes decorados con temática de BTS de Cheese'C",
  title: "Cupcakes de Cheese'C",
  sub: "Creación de contenido · Vertical",
  caption: "Creación de contenido — Cupcakes de Cheese'C (detrás de cámaras)",
};

export const SKILL_GROUPS: SkillGroup[] = [
  { icon: "camera", title: "Cámara", chips: ["Canon EOS Rebel T7", "Fotografía de producto", "Fotografía de retrato"] },
  { icon: "edit", title: "Edición", chips: ["Affinity", "CapCut", "Premiere Pro"] },
  { icon: "ai", title: "Inteligencia artificial", chips: ["ChatGPT", "Gemini", "DeepSeek", "y más…"] },
  { icon: "chart", title: "Marketing", chips: ["Meta Business Suite", "Meta Ads", "Google My Business", "Storytelling"] },
  { icon: "db", title: "Datos", chips: ["SQL", "Python", "Power BI", "Google Analytics"] },
  { icon: "bolt", title: "Ofimática", chips: ["MS Office", "Excel", "Redes informáticas"] },
];

export const CERTS: Cert[] = [
  {
    img: "assets/img/certs/cert-1.jpg",
    alt: "Certificado Fundamentals of Digital Marketing de Google",
    issuer: "Google",
    title: "Fundamentals of Digital Marketing",
    meta: "Completado el 8 de mayo de 2024",
    caption: "Fundamentals of Digital Marketing — Google · 8 de mayo de 2024",
  },
  {
    img: "assets/img/certs/cert-2.jpg",
    alt: "Certificado Google: IA Práctica para Marketing",
    issuer: "Santander Open Academy · Google",
    title: "Google: IA Práctica para Marketing",
    meta: "2 horas · 2 módulos · Enero 2026",
    caption: "Google: IA Práctica para Marketing — Santander Open Academy · 1 de enero de 2026",
  },
  {
    img: "assets/img/certs/cert-3.jpg",
    alt: "Certificado Storytelling en el Marketing Digital",
    issuer: "Santander Open Academy · UChicago",
    title: "Storytelling en el Marketing Digital",
    meta: "8 horas · 2 módulos · Enero 2026",
    caption: "Storytelling en el Marketing Digital — Santander Open Academy · The University of Chicago · 12 de enero de 2026",
  },
];

export interface Contact {
  href: string;
  label: string;
  value: string;
}

export const CONTACT: { whatsapp: Contact; instagram: Contact; email: Contact } = {
  whatsapp: { href: "https://wa.me/524775910992", label: "WhatsApp", value: "477-591-0992" },
  instagram: { href: "https://www.instagram.com/alchemist.mar/", label: "Instagram", value: "@alchemist.mar" },
  email: { href: "mailto:omarmtzr675@gmail.com?subject=Pr%C3%A1cticas%2C%20estad%C3%ADas%20o%20una%20oportunidad%20laboral", label: "Email", value: "omarmtzr675@gmail.com" },
};

export type LbKind = "image" | "video";

export interface LbItem {
  kind: LbKind;
  src: string;
  alt: string;
  caption: string;
  contain?: boolean;
  /** Solo video: miniatura usada como póster si el archivo no existe. */
  poster?: string;
}

/** Convierte un item de galería en item de lightbox. */
export const toLb = (g: GItem): LbItem => ({ kind: "image", src: g.src, alt: g.alt, caption: g.caption, contain: g.contain });

/** Convierte un item de video en item de lightbox. */
export const toLbVideo = (v: VItem): LbItem => ({ kind: "video", src: v.src, alt: v.posterAlt, caption: v.caption, poster: v.thumb });
