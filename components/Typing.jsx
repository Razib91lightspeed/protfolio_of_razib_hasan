'use client';
import { useEffect, useState } from 'react';

export default function Typing({ words = ["Hello"], speed = 120, pause = 1200 }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[i % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setDeleting(true);
          setTimeout(() => {}, pause);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setI(i + 1);
        }
      }
    }, deleting ? 60 : speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, i, pause, speed, words]);

  useEffect(() => {
    const wait = setTimeout(() => setDeleting(true), pause);
    return () => clearTimeout(wait);
  }, [i, pause]);

  return <span>{text}</span>;
}