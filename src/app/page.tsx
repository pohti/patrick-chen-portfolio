'use client';
import React, { useEffect, useState } from 'react';
import './styles.css';
// import MyPic from '@/assets/images/me-pixar.png';
import Image from 'next/image';

// TODO: flash out the content
const textLines = ["I'm Patrick and I'm a Software Engineer."];

export default function Home() {
  const [displayed, setDisplayed] = useState(['', '']);
  const typingSpeed = 30; // ms per character

  useEffect(() => {
    let line = 0,
      char = 0;
    function type() {
      if (line < textLines.length) {
        if (char < textLines[line].length) {
          setDisplayed((prev) => {
            const updated = [...prev];
            updated[line] = textLines[line].slice(0, char + 1);
            return updated;
          });
          char++;
          setTimeout(type, typingSpeed);
        } else {
          line++;
          char = 0;
          setTimeout(type, typingSpeed * 5); // pause between lines
        }
      }
    }
    type();
  }, []);

  return (
    <div>
      <div
        style={{
          whiteSpace: 'pre-line',
          display: 'flex',
          flexDirection: 'column',
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
          <span>{displayed[0]}</span>
          <span className="blinking-cursor">|</span>
        </span>

        <br />
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          I built this website to showcase my frontend development skills. It
          simulates a trading dashboard with interactive features such as
          charts, news, investor sentiment, and portfolio positions. It also
          includes a chat feature powered by OpenAI for investment advice. The
          application is developed using Next.js, React, TypeScript, Zustand and
          Ant Design.
        </p>
      </div>
    </div>
  );
}
