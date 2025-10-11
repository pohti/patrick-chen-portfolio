'use client';

import { useState } from 'react';
import CustomNavLink from '@/components/CustomNavLink';
import DownloadResumeButton from '@/components/DownloadResumeButton';
import {
  HomeOutlined,
  StockOutlined,
  MessageOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      {/* Desktop Navigation */}
      <div className="desktop-nav">
        <nav className="nav-link-container">
          <CustomNavLink href="/">
            <HomeOutlined /> Home
          </CustomNavLink>
          <CustomNavLink href="/trading">
            <StockOutlined /> Trading Demo
          </CustomNavLink>
          <CustomNavLink href="/weather-map">
            <StockOutlined /> Weather Map
          </CustomNavLink>
        </nav>

        <div className="flex" style={{ gap: '1rem' }}>
          <CustomNavLink href="/chat">
            <MessageOutlined /> Investor AI
          </CustomNavLink>
          <DownloadResumeButton />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-nav">
        <div className="mobile-nav-header">
          <span
            style={{
              color: 'var(--font-color-primary)',
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            Patrick Chen
          </span>
          <button
            className="mobile-menu-button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="mobile-menu-overlay" onClick={closeMenu}>
            <div
              className="mobile-menu-content"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="mobile-nav-links">
                <div onClick={closeMenu}>
                  <CustomNavLink href="/">
                    <HomeOutlined /> Home
                  </CustomNavLink>
                </div>
                <div onClick={closeMenu}>
                  <CustomNavLink href="/trading">
                    <StockOutlined /> Trading Demo
                  </CustomNavLink>
                </div>
                <div onClick={closeMenu}>
                  <CustomNavLink href="/weather-map">
                    <StockOutlined /> Weather Map
                  </CustomNavLink>
                </div>
                <div onClick={closeMenu}>
                  <CustomNavLink href="/chat">
                    <MessageOutlined /> Investor AI
                  </CustomNavLink>
                </div>
                <div className="mobile-download-button">
                  <DownloadResumeButton />
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
