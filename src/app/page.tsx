'use client';
import React, { ReactNode, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import TechTags from './trading/(components)/TechTags';
import styles from './BlinkingCursor.module.css';
import { sleep } from '@/utils/time';

const createTypingArray = (
  text: string,
  colorRanges: { start: number; end: number; color: string }[] = []
) => {
  return text.split('').map((char, index) => {
    const colorRange = colorRanges.find(
      (range) => index >= range.start && index <= range.end
    );
    if (colorRange) {
      return (
        <span key={`char-${index}`} style={{ color: colorRange.color }}>
          {char}
        </span>
      );
    }
    return char;
  });
};

const toDisplay: ReactNode[] = createTypingArray(
  "I'm Patrick and I'm a Software Engineer.",
  [{ start: 22, end: 38, color: 'var(--font-color-primary)' }]
);

export default function Home() {
  const [displayed, setDisplayed] = useState<ReactNode[]>([]);
  const isTyping = useRef(false);

  useEffect(() => {
    // Reset state on mount
    setDisplayed([]);

    // Prevent double execution in Strict Mode
    if (isTyping.current) return;
    isTyping.current = true;

    let isCancelled = false;

    async function type() {
      for (const cur of toDisplay) {
        if (isCancelled) break;
        setDisplayed((prev) => [...prev, cur]);
        await sleep(30);
      }
    }

    type();

    // Cleanup function
    return () => {
      isCancelled = true;
      isTyping.current = false; // Reset the ref on cleanup
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          whiteSpace: 'pre-line',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          padding: '1rem',
          maxWidth: '800px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '2rem' }}>Hello World!</span>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <Image
              src={'/images/me.jpg'}
              alt="Guy waving"
              width={150}
              height={150}
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #ccc',
                objectPosition: 'center',
              }}
            />
          </div>
        </div>
        <br />
        <span style={{ fontSize: '1.5rem', marginTop: '2rem' }}>
          <span>{displayed}</span>
          <span className={styles.blinkingCursor}>|</span>
        </span>
        <br />
        <p style={{ fontSize: '1.2rem' }}>
          {
            "I'm passionate about learning new tech and using them to build products that matter."
          }
        </p>
        <br />
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          I built this website using Next.js to showcase my frontend development
          skills. It simulates a trading dashboard with interactive features
          such as charts, news, investor sentiment, and portfolio positions. It
          also includes a weather map and a chat feature powered by OpenAI for
          investment advice.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <TechTags />
        </div>
      </div>
    </div>
  );
}
