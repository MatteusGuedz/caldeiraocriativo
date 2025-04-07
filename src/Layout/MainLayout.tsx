import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import './MainLayout.scss';

const MainLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(prev => !prev);
  };

  const toggleCollapse = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <div className="main-layout">
      <Navbar onToggleSidebar={toggleMobileSidebar} />
      <div className="main-body">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          collapsed={collapsed}
          onToggleCollapse={toggleCollapse}
        />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
