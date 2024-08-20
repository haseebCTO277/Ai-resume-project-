import React from 'react';

const buttonStyle = {
  base: {
    backgroundColor: 'white',
    border: '2px solid',
    borderRadius: '8px',
    padding: '16px 24px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    margin: '12px 0',
    width: '100%',
    maxWidth: '300px',
    height: '60px',
    display: 'block',
  },
  active: {
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
};

const themeStyles = {
  BlackAndWhite: {
    color: 'black',
    borderColor: 'black',
    hover: { backgroundColor: 'black', color: 'white' },
  },
  BlueAndWhite: {
    color: '#1E90FF',
    borderColor: '#1E90FF',
    hover: { backgroundColor: '#1E90FF', color: 'white' },
  },
  OceanTheme: {
    color: '#40E0D0',
    borderColor: '#40E0D0',
    hover: { backgroundColor: '#40E0D0', color: 'white' },
  },
  WhiteAndBlue: {
    color: '#0000FF',
    borderColor: '#0000FF',
    hover: { backgroundColor: '#0000FF', color: 'white' },
  },
};

export default function ThemeButton({ theme, setTheme }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
      {Object.keys(themeStyles).map((themeName) => (
        <button
          key={themeName}
          style={{
            ...buttonStyle.base,
            ...themeStyles[themeName],
            ...(theme === themeName ? buttonStyle.active : {}),
          }}
          onClick={() => setTheme(themeName)}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = themeStyles[themeName].hover.backgroundColor;
            e.target.style.color = themeStyles[themeName].hover.color;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = buttonStyle.base.backgroundColor;
            e.target.style.color = themeStyles[themeName].color;
          }}
        >
          {themeName.replace(/([A-Z])/g, ' $1').trim()}
        </button>
      ))}
    </div>
  );
}