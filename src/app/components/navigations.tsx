import React from 'react';
import Link from 'next/link';

const Navigation: React.FC = () => {
  return (
    <nav className="navContainer">
      <Link href="/" className="navLink">Home</Link>
      <Link href="/products" className="navLink">Products</Link>
      <Link href="/cart" className="navLink">Cart</Link>
    </nav>
  );
};

export default Navigation;
