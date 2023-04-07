import React from 'react';

function Loader({ color = '#000' }: { color?: string }) {
  return (
    <div className="loading">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          d="M4 24c0 11.046 8.954 20 20 20s20-8.954 20-20S35.046 4 24 4"
        />
      </svg>
    </div>
  );
}

export default Loader;
