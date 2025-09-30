import React from 'react';
import NavBar from './NavBar';

interface NavBarContainerProps {
  onSearch?: (results: any[]) => void;
}

const NavBarContainer = ({ onSearch }: NavBarContainerProps) => {
  return (
    <nav className="bg-[whitesmoke] sticky top-0 z-20 w-full py-4">
      <NavBar onSearch={onSearch} />
    </nav>
  );
};

export default NavBarContainer;