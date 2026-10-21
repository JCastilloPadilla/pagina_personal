import { useEffect, useState } from 'react';
import MetallicPaint from './react-bits/MetallicPaint';
import CursorGrid from './react-bits/CursorGrid';

const finderSource = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path d="M6 6h88v88H6zM22 22v56h56V22z" fill="#111111" fill-rule="evenodd"/><rect x="36" y="36" width="28" height="28" fill="#111111"/></svg>');

function useReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}

export function MetallicQRMark() {
  const reduced = useReducedMotion();
  return (
    <span className="qr-metal-mark" aria-hidden="true">
      <svg className="qr-metal-fallback" viewBox="0 0 100 100" fill="currentColor"><path d="M6 6h88v88H6zM22 22v56h56V22z" fillRule="evenodd"/><rect x="36" y="36" width="28" height="28"/></svg>
      <MetallicPaint imageSrc={finderSource} color="#a8b5cb" backgroundColor="transparent" speed={0.22} density={2.2} softness={0.2} dispersion={0.08} distortion={0.05} edgeBend={0.35} scale={1} mouseTilt={0.12} intro={false} paused={reduced} dpr={2} />
    </span>
  );
}

export function LabGridBackground() {
  const reduced = useReducedMotion();
  return (
    <div className="lab-grid-background" aria-hidden="true">
      {!reduced && <CursorGrid cellSize={42} color="#28364b" gridColor="#7f91ac" gridOpacity={0.1} maxOpacity={0.38} fillOpacity={0.13} radius={125} falloff="smooth" highlight="area" holdTime={100} fadeDuration={650} lineWidth={0.7} cellGap={2} cellRadius={1} spotlight={0} clickPulse={false} ambient={0} edgeFade={0.25} intro={false} lightMode dpr={1.5} />}
    </div>
  );
}
