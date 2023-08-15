
import React from 'react';

const CustomLoader = () => {
  const loaderStyle = {
    width: '50px',
    height: '50px',
    display: 'grid',
    border: '4px solid transparent',
    borderRadius: '50%',
    borderColor: '#e4e4ed #0000',
    animation: 's6 1s infinite linear',
  };

  const loaderInnerStyle = {
    content: '',
    gridArea: '1/1',
    margin: '2px',
    border: 'inherit',
    borderRadius: '50%',
  };

  const loaderInnerBeforeStyle = {
    borderColor: '#2e4057 #0000',
    animation: 'inherit',
    animationDuration: '0.5s',
    animationDirection: 'reverse',
  };

  const loaderInnerAfterStyle = {
    margin: '8px',
  };

  const keyframesStyle = `
    @keyframes s6 {
      100% {
        transform: rotate(1turn);
      }
    }
  `;

  return (
    <div style={loaderStyle} className="animate-spin">
      <div style={{ ...loaderInnerStyle, ...loaderInnerBeforeStyle }}></div>
      <div style={{ ...loaderInnerStyle, ...loaderInnerAfterStyle }}></div>
      <style>{keyframesStyle}</style>
    </div>
  );
};

export default CustomLoader;
