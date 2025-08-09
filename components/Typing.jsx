'use client';
import { useEffect, useState } from 'react';

export default function Typing({
  words = ['Hello'],
  speed = 100,        // typing speed (ms per char)
  deleteSpeed = 90,   // deleting speed (ms per char)
  pause = 500        // hold full word before deleting (ms)
}) {
  const [i, setI] = useState(0);        // which word
  const [text, setText] = useState(''); // current substring
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[i % words.length];

    // Finished typing current word: wait, then start deleting
    if (!deleting && text === current) {
      const hold = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(hold);
    }

    // Finished deleting: move to next word and start typing
    if (deleting && text === '') {
      setDeleting(false);
      setI(prev => (prev + 1) % words.length);
      return;
    }

    // Continue typing/deleting one character
    const timer = setTimeout(() => {
      const next = deleting
        ? current.slice(0, Math.max(0, text.length - 1))
        : current.slice(0, text.length + 1);
      setText(next);
    }, deleting ? deleteSpeed : speed);

    return () => clearTimeout(timer);
  }, [text, deleting, i, words, speed, deleteSpeed, pause]);

  return <span>{text}</span>;
}
