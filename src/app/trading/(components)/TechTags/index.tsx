import React from 'react';
import { Tag } from 'antd';

const technologies = [
  'Next.js',
  'React',
  'TypeScript',
  'Zustand',
  'Ant Design',
  'Python',
  'Golang',
  'SQL',
  'Docker',
  'AWS',
  'Terraform',
];

const TechTags = () => {
  return (
    <div>
      {technologies.map((cur) => {
        return <Tag key={cur}>{cur}</Tag>;
      })}
    </div>
  );
};

export default TechTags;
