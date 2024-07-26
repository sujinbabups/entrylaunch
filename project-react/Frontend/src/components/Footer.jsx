import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {/* Your main content here */}
          <div className="p-4">
            {/* Other components or content */}
          </div>
        </main>
        <footer className="bg-gray-800 text-white py-2 sticky bottom-0 w-full">
          <div className="container mx-auto px-6">
            {/* Social Media Links */}
            <div className="text-center mt-8">
              <Link to="https://facebook.com" className="text-gray-400 hover:text-blue-600 mx-2">
                <i className="fab fa-facebook-f"></i> Facebook
              </Link>
              <Link to="https://twitter.com" className="text-gray-400 hover:text-blue-400 mx-2">
                <i className="fab fa-twitter"></i> X
              </Link>
              <Link to="https://linkedin.com" className="text-gray-400 hover:text-blue-700 mx-2">
                <i className="fab fa-linkedin-in"></i> LinkedIn
              </Link>
              <Link to="https://instagram.com" className="text-gray-400 hover:text-pink-500 mx-2">
                <i className="fab fa-instagram"></i> Instagram
              </Link>
            </div>
            {/* Copyright Section */}
            <div className="text-center mt-6 text-gray-400">
              <p>&copy; {new Date().getFullYear()} EntryLaunch. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
