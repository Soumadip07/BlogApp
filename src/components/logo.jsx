import React from 'react';
import logo from '../assets/logo.svg';
import logo1 from '../assets/logo1.svg';
import logo2 from '../assets/logo2.svg';

function Logo({ width = '140px' }) {
  return (
    <div>
      <img src={logo2} alt="wren" style={{ width }} />
      {/* Jot & Trot */}
    </div>
  );
}

export default Logo;
