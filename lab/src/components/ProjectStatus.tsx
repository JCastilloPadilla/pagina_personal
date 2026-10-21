import { useEffect, useRef, useState } from 'react';
import SplitFlapText from './react-bits/SplitFlapText';

const phrases = ['EN DESARROLLO', 'EN PRUEBAS', 'EN LÍNEA'];

export default function ProjectStatus() {
  const root = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    const observer = new IntersectionObserver(entries => setVisible(entries.some(entry => entry.isIntersecting)), {threshold:0.2});
    if (root.current) observer.observe(root.current);
    return () => { media.removeEventListener('change', update); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (reduced || !visible) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex(current => (current + 1) % phrases.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [reduced, visible]);

  return (
    <div className="project-status" ref={root}>
      <p className="project-status-intro">Siempre hay algo</p>
      <SplitFlapText className="project-status-board" text={phrases[index]} padTo={14} intro={false} loop={false} charset="ABCDEFGHIJKLMNOPQRSTUVWXYZÍ" tileColor="#111111" textColor="#f8fafc" fontSize="clamp(22px, 3vw, 44px)" gap="clamp(2px, .22vw, 4px)" tileRadius={3} flipDuration={0.09} stagger={0.026} flipsPerChar={5} align="center" depth={0.28} />
    </div>
  );
}
