import { useEffect, useState } from 'react';
import { Warp } from '@paper-design/shaders-react';

/**
 * Fondo del hero con Paper Shaders.
 *
 * El componente se dimensiona solo a partir de su contenedor, así que basta con
 * darle 100 % y colocarlo en un padre con posición. La librería ya pausa el
 * bucle cuando la pestaña deja de verse y limita la cantidad de píxeles que
 * dibuja, así que aquí no hace falta repetir esa gestión.
 */

/** Configuración exportada desde el editor de Paper. */
const WARP_CONFIG = {
  colors: ['#5a82c4', '#abc8ed', '#f5f9ff'],
  proportion: 0.41,
  softness: 1,
  distortion: 0.12,
  swirl: 0.85,
  swirlIterations: 6,
  shape: 'checks',
  shapeScale: 0.25,
  scale: 2.2,
  speed: 3,
} as const;

/** `true` cuando el sistema pide menos movimiento. Reacciona a cambios en vivo. */
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);

    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

export default function HeroWarp() {
  const reducedMotion = useReducedMotion();

  return (
    <Warp
      width="100%"
      height="100%"
      colors={[...WARP_CONFIG.colors]}
      proportion={WARP_CONFIG.proportion}
      softness={WARP_CONFIG.softness}
      distortion={WARP_CONFIG.distortion}
      swirl={WARP_CONFIG.swirl}
      swirlIterations={WARP_CONFIG.swirlIterations}
      shape={WARP_CONFIG.shape}
      shapeScale={WARP_CONFIG.shapeScale}
      scale={WARP_CONFIG.scale}
      // speed 0 detiene el requestAnimationFrame por completo: queda un cuadro
      // fijo, sin coste recurrente.
      speed={reducedMotion ? 0 : WARP_CONFIG.speed}
      style={{ display: 'block' }}
    />
  );
}
