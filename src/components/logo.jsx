import React from 'react';
import logo from '../assets/logo.svg'; 

function Logo({ width = '140px' }) {
  return (
    <div>
        <img src={logo} alt="wren" style={{ width }} />
        {/* Jot & Trot */}
    </div>
  );
}

export default Logo;
