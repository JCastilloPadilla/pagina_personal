import { useEffect, useState, type ComponentPropsWithoutRef } from 'react';
import Magnet from '../../lab/src/components/react-bits/Magnet';

export default function MagneticLink({ children, ...props }: ComponentPropsWithoutRef<'a'>) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(pointer.matches && !reducedMotion.matches);
    update();
    pointer.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    return () => {
      pointer.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  return (
    <Magnet padding={16} magnetStrength={5} maxOffset={5} disabled={!enabled}>
      <a {...props}>{children}</a>
    </Magnet>
  );
}
