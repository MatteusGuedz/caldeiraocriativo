import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import './MainLayout.scss';

const MainLayout = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-body">
        <Sidebar />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
