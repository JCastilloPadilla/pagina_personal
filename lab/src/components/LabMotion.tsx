import type { ReactNode } from 'react';
import SplitText from './react-bits/SplitText';
import Magnet from './react-bits/Magnet';
import DecryptedText from './react-bits/DecryptedText';

export function HeroTitle() {
  return (
    <h1 id="hero-title">
      <span className="line"><SplitText text="Laboratorio" tag="span" textAlign="left" trigger="load" delay={24} duration={0.65} from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }} /></span>
      <span className="line"><SplitText text="de desarrollo." tag="span" textAlign="left" trigger="load" delay={24} duration={0.65} from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }} /></span>
    </h1>
  );
}

export function MagneticLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  return (
    <Magnet padding={16} magnetStrength={5} maxOffset={5} wrapperClassName="magnetic-link">
      <a className={className} href={href}>{children}</a>
    </Magnet>
  );
}

export function LaboratoryLabel() {
  return <DecryptedText text="Laboratorio personal" animateOn="view" speed={30} maxIterations={7} characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" scrambleColor="#2f6bff" />;
}
