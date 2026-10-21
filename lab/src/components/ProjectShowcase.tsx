import { useEffect, useState } from 'react';
import PixelTransition from './react-bits/PixelTransition';
import SpotlightCard from './react-bits/SpotlightCard';
import QRBlueprint from './QRBlueprint';

type Shot = { src: string; label: string; alt: string };

function useReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}

export function QRShowcase({ code }: { code: string }) {
  const [scanning, setScanning] = useState(false);
  const ready = useReady();
  return (
    <figure className="qr-showcase">
      <div className="qr-scan-frame" data-scanning={scanning}>
        <PixelTransition
          className="qr-pixel-stage"
          firstContent={<QRBlueprint code={code} />}
          secondContent={<div className="qr-scan-content"><p>Del laboratorio a tu teléfono.</p><img src={code} alt="Código QR para abrir https://qr.ccastillo.dev/" width={512} height={512} loading="lazy" /><span>qr.ccastillo.dev ↗</span></div>}
          gridSize={22} pixelColor="#111111" pattern="dither" pixelAnimation="grow" animationStepDuration={0.4}
          trigger="click" active={scanning} onActiveChange={setScanning} aspectRatio="1440 / 1000"
          ariaLabel={scanning ? 'Volver al esquema del generador QR' : 'Mostrar el código QR del proyecto'}
        />
      </div>
      <figcaption className="capture-caption">
        <span>{scanning ? 'Escanea para abrir el generador' : 'De tus datos a un QR. Así de directo.'}</span>
        <button className="scan-toggle" disabled={!ready} aria-label={scanning ? 'Volver al esquema' : 'Mostrar QR para escanear'} title={scanning ? 'Volver al esquema' : 'Mostrar QR para escanear'} aria-pressed={scanning} onClick={() => setScanning(!scanning)}>
          <svg className="scan-qr-icon" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="2.3"><rect x="3" y="3" width="10" height="10" rx="1" /><rect x="19" y="3" width="10" height="10" rx="1" /><rect x="3" y="19" width="10" height="10" rx="1" /></g>
            <rect x="6" y="6" width="4" height="4" rx=".5" /><rect x="22" y="6" width="4" height="4" rx=".5" /><rect x="6" y="22" width="4" height="4" rx=".5" />
            <g className="scan-qr-pixels"><path d="M18 18h5v5h-5zM25 18h4v4h-4zM18 25h4v4h-4zM25 25h4v4h-4z" /></g>
          </svg>
          <svg className="scan-back-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m13 7-8 8 8 8M5 15h13a8 8 0 0 1 8 8" /></svg>
          <span className="scan-sweep" aria-hidden="true" />
        </button>
      </figcaption>
      <noscript><p>Abre el generador para probar sus opciones.</p></noscript>
    </figure>
  );
}

export function RemiraPreview({ shot }: { shot: Shot }) {
  return (
    <figure className="remira-preview">
      <SpotlightCard className="remira-correspondence" theme="light" spotlightColor="#2f6bff" spotlightSize={380} intensity={0.9} borderGlow={1} shape="beam" flare>
        <div className="mail-preview-heading"><svg width="25" height="20" viewBox="0 0 25 20" fill="none" aria-hidden="true"><rect x="1" y="1" width="23" height="18" stroke="currentColor" /><path d="m1 2 11.5 9L24 2" stroke="currentColor" /></svg><span>Una segunda mirada.</span><span className="mail-postmark" aria-hidden="true">R</span></div>
        <div className="remira-screenshot"><img src={shot.src} alt={shot.alt} width={1440} height={1000} loading="lazy" decoding="async" /></div>
        <div className="correspondence-edge" aria-hidden="true" />
      </SpotlightCard>
      <figcaption>Captura del prototipo actual. El analizador muestra resultados simulados.</figcaption>
    </figure>
  );
}
