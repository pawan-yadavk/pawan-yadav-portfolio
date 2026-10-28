import { useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import { motion } from 'framer-motion';

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  revealDelay?: number;
};

export default function TiltCard({ children, className = '', revealDelay = 0 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -5;
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
    setStyle({ transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)` });
  };

  const reset = () => setStyle({});

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: revealDelay }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={style}
      className={`tilt-card ${className}`}
    >
      {children}
    </motion.div>
  );
}
