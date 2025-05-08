'use client';
import React from 'react';
import '@/styles/dashboard.css';

export default function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <main className="dashboard-content">
        <div className="dashboard-top">
          <div className="dashboard-header">
            <h1>Welcome, Admin Higher Secondary School Team!</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices nunc sed,
              pharetra ante. Quisque gravida facilisis dui.
            </p>
          </div>

          <div className="info-cards">
            <div className="info-card yellow">
              <h2>Students</h2>
              <p>5,909</p>
            </div>
            <div className="info-card purple">
              <h2>Teachers</h2>
              <p>60</p>
            </div>
            <div className="info-card yellow">
              <h2>Employee</h2>
              <p>100</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
