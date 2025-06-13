'use client';
import React from 'react';
import "@/styles/studentDashboard.css";

export default function StudentDashboardPage() {
  return (
    <div className="dashboard-container">
      <main className="dashboard-content">

        <section className="welcome-card">
          <h2>Welcome, Student Higher Secondary School Team!</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed nulla sit amet urna pellentesque...</p>
          <img src="/hero-illustration.png" alt="Hero" />
        </section>

        <section className="status-section">
          <div className="status-box">
            <h3>Attendance</h3>
            <div className="circle">
              <span>""%</span>
            </div>
            <p>Present ""% | Absent ""%</p>
          </div>
          <div className="status-box">
            <h3>Overall Task</h3>
            <div className="circle blue">
              <span>""%</span>
            </div>
            <p>Done ""% | Unfinished ""%</p>
          </div>
        </section>

        <section className="info-grid">
          <div className="notice-board">
            <h4>Notice Board</h4>
            <div className="notice yellow">
              <strong>Sports Day Announcement</strong>
              <p>""</p>
            </div>
            <div className="notice purple">
              <strong>Summer Break Start Date</strong>
              <p>""</p>
            </div>
          </div>

          <div className="documents">
            <h4>Documents</h4>
            <ul>
              <li>""</li>
            </ul>
          </div>

          <div className="activities">
            <h4>Upcoming Activities</h4>
            <ul>
              <li><strong>31</strong> Meeting with the VC <span>10 AM - Zoom</span> <span className="tag done">Done</span></li>
              <li><strong>04</strong> Meeting with the J... <span>10 AM - Zoom</span> <span className="tag upcoming">Upcoming</span></li>
              <li><strong>12</strong> Class B middle sess... <span>Physical lab class</span> <span className="tag upcoming">Upcoming</span></li>
              <li><strong>16</strong> Send Mr Ayo class... <span>Email</span> <span className="tag pending">Pending</span></li>
            </ul>
          </div>
        </section>

        <section className="subject-result">
          <h4>Subject Result</h4>
          <table>
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Grade</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#969</td>
                <td>Accounting</td>
                <td>A+</td>
                <td>22/02/2025</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
