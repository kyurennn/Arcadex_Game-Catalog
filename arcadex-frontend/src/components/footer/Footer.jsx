import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        width: '100%',
        borderTop: '1px solid #161F30',
        backgroundColor: '#080B10',
        padding: '1.75rem 1.5rem',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          flexWrap: 'wrap',
          fontSize: '0.82rem',
          color: '#64748B',
        }}
      >
        {/* Left: Branding & Copyright */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <strong style={{ color: '#F1F5F9', fontWeight: '700', fontSize: '0.92rem' }}>
            Arcadex
          </strong>
          <span>
            © 2025 Arcadex. All video game assets belong to their respective publishers.
          </span>
        </div>

        {/* Right: Quick Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a
            href="#docs"
            style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
          >
            Documentation
          </a>
          <a
            href="#shortcuts"
            style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
          >
            Keyboard Shortcuts
          </a>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#94A3B8' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                boxShadow: '0 0 6px #10B981',
              }}
            />
            <span>API Status</span>
          </div>
          <a
            href="#privacy"
            style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
