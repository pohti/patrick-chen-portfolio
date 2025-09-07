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

        <br />
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          I built this website to showcase my frontend development skills. It
          simulates a trading dashboard with interactive features such as
          charts, news, investor sentiment, and portfolio positions. It also
          includes a chat feature powered by OpenAI for investment advice.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <h3
            style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
            }}
          >
            Technologies Used
          </h3>
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              listStyle: 'none',
              padding: 0,
              margin: 0,
              fontSize: '1.1rem',
            }}
          >
            <li
              style={{
                background: '#23272a',
                color: '#d4d4d4',
                borderRadius: '6px',
                padding: '0.5rem 1rem',
              }}
            >
              Next.js
            </li>
            <li
              style={{
                background: '#23272a',
                color: '#d4d4d4',
                borderRadius: '6px',
                padding: '0.5rem 1rem',
              }}
            >
              React
            </li>
            <li
              style={{
                background: '#23272a',
                color: '#d4d4d4',
                borderRadius: '6px',
                padding: '0.5rem 1rem',
              }}
            >
              TypeScript
            </li>
            <li
              style={{
                background: '#23272a',
                color: '#d4d4d4',
                borderRadius: '6px',
                padding: '0.5rem 1rem',
              }}
            >
              Zustand
            </li>
            <li
              style={{
                background: '#23272a',
                color: '#d4d4d4',
                borderRadius: '6px',
                padding: '0.5rem 1rem',
              }}
            >
              Ant Design
            </li>
            <li
              style={{
                background: '#23272a',
                color: '#d4d4d4',
                borderRadius: '6px',
                padding: '0.5rem 1rem',
              }}
            >
              OpenAI API
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
