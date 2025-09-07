'use client';
import React from 'react';
import { message } from 'antd';

interface Props {
  display: React.ReactNode;
  content: string;
}

const Copyable = ({ display, content }: Props) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    message.success('Copied to clipboard!');
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        color: 'inherit',
        font: 'inherit',
      }}
      aria-label="Copy to clipboard"
    >
      {display}
    </button>
  );
};

export default Copyable;
