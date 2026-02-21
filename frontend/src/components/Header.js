import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      {/* Embedded CSS */}
      <style>{`
        .header-nav {
          position: fixed;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 50;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .header-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          transition: transform 0.3s ease;
        }

        .header-logo:hover {
          transform: scale(1.05);
        }

        .logo-img {
          height: 2rem;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          letter-spacing: 0.5px;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }

        .header-menu {
          display: block;
        }

        .nav-list {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          position: relative;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          padding: 0.5rem 0;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            #ff0000,
            #ff7300,
            #fffb00,
            #48ff00,
            #00ffd5,
            #002bff,
            #7a00ff,
            #ff00c8
          );
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: white;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link.active {
          color: white;
        }

        .nav-link.active::after {
          width: 100%;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }

          .header-menu {
            display: none;
          }

          .nav-list {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>

      {/* Header JSX */}
      <nav className="header-nav">
        <div className="header-container">
          <a href="/" className="header-logo">
            <img src="/logo.png" className="logo-img" alt="ExoSynergy Logo" />
            <span className="logo-text">ExoSynergy</span>
          </a>

          <button className="mobile-menu-btn" type="button">
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>

          <div className="header-menu">
            <ul className="nav-list">
              <li>
                <a href="/home" className="nav-link">Home</a>
              </li>
              <li>
                <Link to="/about" className="nav-link">About Us</Link>
              </li>
              {/* <li>
                <a href="/simulation" className="nav-link">Simulation</a>
              </li> */}
              <li>
                <a href="/contact" className="nav-link">Contact Us</a>
              </li>
              {/* <li>
                <a href="/login" className="nav-link">Log in</a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
