'use client';
import React from 'react';
import './styles.css';

const DownloadResumeButton = () => {
  return (
    <button
      onClick={() => console.log('download resume')}
      className="download-resume-button"
    >
      Download Resume
    </button>
  );
};

export default DownloadResumeButton;
