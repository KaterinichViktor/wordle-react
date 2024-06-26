import React from 'react';
import { Link } from 'react-router-dom';

export const TopWordle = () => {
  return (
    <div className='top-panel'>
      <Link to="/" className='logo-link'>
        <svg className="icon-home" viewBox="0 0 32 32">
          <path d="M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z"></path>
        </svg>
      </Link>
      <h2 className='game-title'>Wordle</h2>
    </div>
  );
};

// export default Top;

export const TopCode = () => {
  return (
    <div className='top-panel'>
      <Link to="/" className='logo-link'>
        <svg className="icon-home" viewBox="0 0 32 32">
          <path d="M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z"></path>
        </svg>
      </Link>
      <h2 className='game-title'>Crack the Code</h2>
    </div>
  );
};

// export default Top;
