import { useEffect, useState } from 'react';

export function useTypingText(
  words: string[],
  { typeSpeed = 90, deleteSpeed = 45, pause = 1400 }: { typeSpeed?: number; deleteSpeed?: number; pause?: number } = {}
) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    if (!deleting && sub === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && sub === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(() => {
      setSub((s) => s + (deleting ? -1 : 1));
    }, deleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(t);
  }, [sub, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  const current = words[index % words.length];
  return current.slice(0, sub);
}
