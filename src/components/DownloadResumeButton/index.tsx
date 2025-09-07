'use client';
import React from 'react';
import './styles.css';
import { DownloadOutlined } from '@ant-design/icons';

const GOOGLE_DRIVE_FILE_ID = '1FOHqgRoQtw8gsd22jA23x4uEzyqNUCEI';
const DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${GOOGLE_DRIVE_FILE_ID}`;

const DownloadResumeButton = () => {
  const handleDownload = () => {
    window.open(DOWNLOAD_URL, '_blank');
  };

  return (
    <button onClick={handleDownload} className="download-resume-button">
      <DownloadOutlined /> Download Resume
    </button>
  );
};

export default DownloadResumeButton;
