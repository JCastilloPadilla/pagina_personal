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

export interface FeaturedProject {
  title: string;
  statement: string;
  summary: string;
  tags: string[];
  image?: string;
  imageAlt: string;
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
  tagline:
    'Estudiante de Ingeniería en Sistemas de la Información. Construyo herramientas de redes y automatización.',
  lead: 'Me interesa cómo viaja la información y qué se rompe en el camino.',
  bio: [
    'Estoy en último año en la Facultad de Informática Mazatlán (UAS) y me muevo casi siempre alrededor de lo mismo: redes, sistemas y seguridad.',
    'Aprendo construyendo. Casi todo lo que sé salió de proyectos propios: monitoreo de protocolos, agentes de escritorio, automatizaciones que me quitan trabajo repetitivo. Uso herramientas de IA como copiloto para avanzar más rápido y meterme en terreno nuevo sin miedo.',
    'Fuera del código: café, arcade retro y desarmar cosas para ver por dónde van los cables.',
  ],
};

export const nav: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mí', href: '#sobre' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
];

/** Las mismas herramientas de siempre, agrupadas por para qué sirven. */
export const stackGroups: StackGroup[] = [
  { label: 'Redes', items: ['SNMP', 'Wireshark'] },
  { label: 'Sistemas', items: ['Linux', 'Docker'] },
  { label: 'Código', items: ['C#', 'Python', 'PHP', 'JavaScript'] },
  { label: 'Datos', items: ['MySQL'] },
  { label: 'Flujo', items: ['Git'] },
];

export const featured: FeaturedProject = {
  title: 'FlowTrix',
  statement: 'Ver lo que de verdad pasa en la red.',
  summary:
    'Plataforma de monitoreo de protocolos de red. Un dashboard web concentra el tráfico y un agente de Windows en C# reporta desde cada equipo: alertas, histórico y visibilidad de punta a punta.',
  tags: ['Dashboard web', 'Agente C#', 'SNMP / Netflow'],
  imageAlt: 'Captura del dashboard de FlowTrix',
  awards: [
    { medal: 'Plata', place: 'Infomatrix Regional Pacífico', tone: 'silver' },
    { medal: 'Bronce', place: 'Infomatrix Nacional México', tone: 'bronze' },
  ],
  links: [
    { label: 'Repositorio', href: '#', variant: 'solid' },
    { label: 'Ver demo', href: '#', variant: 'line' },
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
    title: 'Laboratorio de redes',
    summary:
      'Entorno de práctica con máquinas virtuales para probar segmentación, VLANs y monitoreo antes de tocar producción.',
    meta: 'VLANs · Máquinas virtuales',
    href: '#',
  },
];

export const contactIntro = 'Abierto a prácticas, proyectos y charlas sobre redes.';

export const email = 'hola@ccastillo.me';

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
export const footerNote = 'Café, arcade retro y cables por desarmar';

export const site = {
  domain: 'ccastillo.me',
  /** Firma corta del encabezado. */
  shortName: 'Jose Castillo',
  title: 'Jose Carlos Castillo Padilla — redes y automatización',
  description:
    'Portafolio de Jose Carlos Castillo Padilla: monitoreo de redes, sistemas y automatización desde Mazatlán, Sinaloa.',
  year: 2026,
};
