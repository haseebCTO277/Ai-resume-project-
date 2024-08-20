import React from 'react';

const colors = [
  '#FF6633', '#FF6633', '#FFB399', '#FF33FF', '#FFFF99',
  '#00B3E6', '#E6B333', '#3366E6', '#999966',
  '#99FF99', '#B34D4D', '#80B300', '#809900',
  '#FFD700', '#B8860B', '#C0C0C0', '#A9A9A9',
  '#708238', '#007A74', '#000000' // Added black color
];

const ColorPicker = ({ onSelectColor }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '10px',
      padding: '10px',
      backgroundColor: '#1b1b1b',
      borderRadius: '10px',
      zIndex: 1000
    }}>
      {colors.map(color => (
        <div
          key={color}
          onClick={() => onSelectColor(color)}
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: color,
            borderRadius: '50%',
            cursor: 'pointer'
          }}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
