import React from 'react';
import { Tag } from 'antd';

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
        return <Tag key={cur}>{cur}</Tag>;
      })}
    </div>
  );
};

export default TechTags;
