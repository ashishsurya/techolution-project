import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = ({}) => {
  return (
    <div className="flex items-center justify-center h-20 bg-gray-400 text-white space-x-7 font-mono">
      <Link to='/'>/home</Link>
      <Link to="/planograms">/planograms</Link>
    </div>
  );
};

export default Header;
