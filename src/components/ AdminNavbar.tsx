import React from 'react';
import { FiMenu } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div>
        <FiMenu size={24} />
      </div>
      <div>Logo</div>
      <div>Profile</div>
    </nav>
  );
};

export default Navbar;