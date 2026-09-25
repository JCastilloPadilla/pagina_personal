/**
 * Fuente única de contenido del sitio.
 *
 * Hoy son constantes en TypeScript. Cuando entre MySQL, estas mismas formas
 * se llenarán desde PHP (o desde un fetch en build) sin tocar los componentes:
 * los tipos de aquí abajo son el contrato.
 */

export interface Profile {
  name: string;
  place: string;
  tagline: string;
  lead: string;
  bio: string[];
}

/** Una fila de la ficha técnica: familia de herramientas y sus miembros. */
export interface StackGroup {
  label: string;
  items: string[];
}

export interface Award {
  medal: string;
  place: string;
  /** Metal de la medalla: decide el color de la palabra. */
  tone: 'silver' | 'bronze';
}

export interface ProjectVisual {
  label: string;
  alt: string;
  src?: string;
}

export interface FeaturedProject {
  title: string;
  statement: string;
  summary: string;
  tags: string[];
  visuals: ProjectVisual[];
  awards: Award[];
  links: { label: string; href: string; variant: 'solid' | 'line' }[];
}

export interface WorkItem {
  title: string;
  summary: string;
  meta: string;
  href?: string;
}

export interface ContactLink {
  kind: string;
  value: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export const profile: Profile = {
  name: 'Jose Carlos Castillo Padilla',
  place: 'Mazatlán, Sinaloa · Facultad de Informática UAS',
  tagline: 'Redes, sistemas y automatización en práctica.',
  lead: 'Me interesa cómo viaja la información y qué se rompe en el camino.',
  bio: [
    'Estoy en último año en la Facultad de Informática Mazatlán (UAS) y mis áreas de mayor interés son: redes, sistemas y seguridad.',
    'Aprendo construyendo. Casi todo lo que sé salió de proyectos propios: monitoreo de protocolos, agentes de escritorio, automatizaciones que me quitan trabajo repetitivo. Uso herramientas de IA como copiloto para avanzar más rápido y meterme en terreno nuevo sin miedo.',
    'Fuera del código: café, netflix y desarmar cosas para ver cómo funcionan.',
  ],
};

export const nav: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mí', href: '#sobre' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
];

/** Tecnologías resumidas desde el README público de GitHub. */
export const stackGroups: StackGroup[] = [
  { label: 'Lenguajes', items: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Dart'] },
  { label: 'Herramientas', items: ['Apache', 'Git', 'MySQL', 'Debian'] },
];

export const featured: FeaturedProject = {
    title: 'FlowTrix',
    statement: 'Ver lo que de verdad pasa en la red.',
    summary:
      'Plataforma de monitoreo de red ya desplegada y en funcionamiento. Su dashboard web concentra la actividad, mientras un agente instalado en cada equipo envía telemetría para generar alertas, conservar históricos y ofrecer visibilidad de punta a punta.',
    tags: ['Dashboard web', 'Agente'],
  visuals: [
      {
        label: 'Vista general',
        alt: 'Vista general del dashboard de FlowTrix',
        src: '/images/flowtrix/flowtrix-overview.png',
      },
      {
        label: 'Alertas',
        alt: 'Panel de alertas de FlowTrix',
        src: '/images/flowtrix/flowtrix-alerts.png',
      },
      {
        label: 'Agente Windows',
        alt: 'Instalador del agente de Windows de FlowTrix',
        src: '/images/flowtrix/flowtrix-windows-agent.png',
      },
  ],
  awards: [
    { medal: 'Plata', place: 'Infomatrix Regional Pacífico', tone: 'silver' },
    { medal: 'Bronce', place: 'Infomatrix Nacional México', tone: 'bronze' },
    ],
    links: [
      {
        label: 'Visitar FlowTrix',
        href: 'https://flowtrix.fimaz.uas.edu.mx/',
        variant: 'solid',
      },
    ],
};

export const work: WorkItem[] = [
  {
    title: 'Automatizaciones internas',
    summary:
      'Scripts que ordenan tareas repetitivas: respaldos, reportes y revisiones de equipos en lote.',
    meta: 'Python',
    href: '#',
  },
  {
    title: 'Generador de códigos QR',
    summary:
      'Aplicación web que transforma texto y enlaces en códigos QR listos para descargar directamente desde el navegador.',
    meta: 'TypeScript · Web',
  },
];

export const contactIntro = 'Abierto a prácticas, proyectos y charlas sobre redes.';

export const email = 'joosec29@gmail.com';

export const socials: ContactLink[] = [
  {
    kind: 'GitHub',
    value: '@JCastilloPadilla',
    href: 'https://github.com/JCastilloPadilla',
  },
  {
    kind: 'X',
    value: '@JoS3C4a',
    href: 'https://x.com/JoS3C4a',
  },
  {
    kind: 'LinkedIn',
    value: '/in/jose-carlos-castillo-padilla-9a46423bb',
    href: 'https://www.linkedin.com/in/jose-carlos-castillo-padilla-9a46423bb/',
  },
];

/** Esquinas del pie: procedencia a la izquierda, apunte personal a la derecha. */
export const origin = 'Hecho en Mazatlán, Sinaloa';
export const footerNote = 'Café, netflix y cosas por armar';

export const site = {
  domain: 'ccastillo.me',
  /** Firma corta del encabezado. */
  shortName: 'Jose Castillo',
  title: 'Jose Carlos Castillo Padilla — redes y automatización',
  description:
    'Portafolio de Jose Carlos Castillo Padilla: monitoreo de redes, sistemas y automatización desde Mazatlán, Sinaloa.',
  year: 2026,
};
