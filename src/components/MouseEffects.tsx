import { useEffect, useRef } from 'react';

export default function MouseEffects() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!media.matches || reduced.matches) return;

    let frame = 0;
    const handleMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = `${event.clientX}px`;
        const y = `${event.clientY}px`;
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${x}, ${y}, 0)`;
        }
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${x}, ${y}, 0)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });

    const buttons = Array.from(document.querySelectorAll<HTMLElement>('.magnetic-button'));
    const handleButtonMove = (event: PointerEvent) => {
      const button = event.currentTarget as HTMLElement;
      const rect = button.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) * 0.08;
      const y = (event.clientY - (rect.top + rect.height / 2)) * 0.08;
      button.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const resetButton = (event: PointerEvent) => {
      (event.currentTarget as HTMLElement).style.transform = '';
    };
    buttons.forEach((button) => {
      button.addEventListener('pointermove', handleButtonMove);
      button.addEventListener('pointerleave', resetButton);
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', handleMove);
      buttons.forEach((button) => {
        button.removeEventListener('pointermove', handleButtonMove);
        button.removeEventListener('pointerleave', resetButton);
      });
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="pointer-events-none fixed left-0 top-0 z-0 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-500/[0.07] blur-3xl lg:block" aria-hidden="true" />
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/70 shadow-[0_0_18px_rgba(34,211,238,0.8)] lg:block" aria-hidden="true" />
    </>
  );
}
