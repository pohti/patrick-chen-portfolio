import React from 'react';
import styles from './TechTags.module.css';

const technologies = [
  'Next.js',
  'React',
  'TypeScript',
  'Redux',
  'Zustand',
  'Python',
  'Golang',
  'SQL',
  'Docker',
  'AWS',
  'Terraform',
];

const TechTags = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {technologies.map((cur) => {
        return (
          <div key={cur} className={styles.techTag}>
            {cur}
          </div>
        );
      })}
    </div>
  );
};

export default TechTags;
