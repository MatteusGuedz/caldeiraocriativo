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
  { to: '/', icon: IconHouseSolid, label: 'Dashboard' },
  { to: '/courses', icon: IconBookSolid, label: 'Cursos' },
  { to: '/admin/analytics', icon: IconChart, label: 'Analytics' },
  { to: '/support/faq', icon: IconCircleInfo, label: 'Ajuda' },
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
          <button className={`toggle-btn ${collapsed ? 'rotated' : ''}`} onClick={onToggleCollapse}>
            <img
              src={collapsed ? IconExpand : IconCollapse}
              alt="Toggle Sidebar"
              className="icon-toggle"
            />
          </button>
        </div>
      )}

      <ul className="menu">
        {navItems.map(({ to, icon, label }) => (
          <li key={to}>
            <NavLink to={to} className="link" data-label={label}>
              <img src={icon} alt={label} className="icon" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
