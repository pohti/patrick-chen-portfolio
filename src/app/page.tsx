'use client';
import React, { useEffect, useState } from 'react';
import './styles.css';

// TODO: flash out the content
const textLines = ["I'm Patrick and I'm a software engineer."];

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
        <span style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Hello World!
        </span>
        <br />
        <span style={{ fontSize: '1.5rem' }}>
          <span>{displayed[0]}</span>
          <span className="blinking-cursor">|</span>
        </span>

        <br />
        <p>
          I built this website to showcase my work and share my thoughts on
          software development. Feel free to explore the different sections to
          learn more about me and my projects.
        </p>
      </div>
    </div>
  );
}
