// src/Layout/Sidebar.tsx (com melhorias)
import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import IconHouseSolid from '../Assets/images/icons/house-solid.svg';
import IconBookSolid from '../Assets/images/icons/book-solid.svg';
import IconChart from '../Assets/images/icons/chart-simple-solid.svg';
import IconCircleInfo from '../Assets/images/icons/circle-info-solid.svg';
import IconCollapse from '../Assets/images/icons/sidebar-left-svgrepo.svg';
import IconExpand from '../Assets/images/icons/sidebar-left-svgrepo.svg';

import './Sidebar.scss';

interface SidebarProps {
  mobileOpen: boolean;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems = [
  { to: '/dashboard', icon: IconHouseSolid, label: 'Dashboard', color: '#3b82f6' }, // Azul
  { to: '/courses', icon: IconBookSolid, label: 'Cursos', color: '#10b981' },      // Verde
  { to: '/admin/analytics', icon: IconChart, label: 'Analytics', color: '#f59e0b' }, // Amarelo
  { to: '/support/faq', icon: IconCircleInfo, label: 'Ajuda', color: '#ef4444' },   // Vermelho
];

const Sidebar = ({ mobileOpen, collapsed, onToggleCollapse }: SidebarProps) => {
  const sidebarClass = clsx('sidebar', {
    'mobile-open': mobileOpen,
    'collapsed': collapsed && !mobileOpen,
  });

  return (
    <div className={sidebarClass}>
   {!mobileOpen && (
  <div className="collapse-toggle">
    <button 
      className={`toggle-btn ${collapsed ? 'rotated' : ''}`} 
      onClick={onToggleCollapse}
      aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
    >
      <div className="hamburger-container">
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </div>
    </button>
  </div>
)}

      <ul className="menu">
        {navItems.map(({ to, icon, label, color }) => (
          <li key={to}>
            <NavLink 
              to={to} 
              className={({ isActive }) => 
                clsx("link", { "active": isActive })} 
              data-label={label}
              style={{ "--menu-item-color": color } as React.CSSProperties}
            >
              <div className="icon-container">
                <img src={icon} alt={label} className="icon" />
              </div>
              {!collapsed && <span>{label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;