import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="menu">
        <li>
          <NavLink to="/" className="link">
          <img src="/icons/house-solid.svg" alt="Dashboard" className="icon" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/courses" className="link">
          <img src="/icons/book-solid.svg" alt="Cursos" className="icon" /> Cursos
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/analytics" className="link">
          <img src="/icons/chart-simple-solid.svg" alt="Analytics" className="icon" />  Analytics
          </NavLink>
        </li>
        <li>
          <NavLink to="/support/faq" className="link">
          <img src="/icons/circle-info-solid.svg" alt=" Ajuda" className="icon" />   Ajuda
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
