import React from 'react';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="fixed bottom-0 w-full bg-gray-700 py-2 font-dm-sans">
      <p className="text-center text-gray-300">Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
