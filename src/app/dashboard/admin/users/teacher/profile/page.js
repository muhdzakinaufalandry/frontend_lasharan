'use client'
import React from 'react'
import '@/styles/teacher.css';

export default function TeacherProfile() {
  return (
    <div className="teacher-profile-container">
      <h2 className="profile-title">About Teacher</h2>

      <div className="profile-content">
        <div className="profile-left">
          <div className="profile-avatar"></div>
          <h3 className="teacher-name">User</h3>
          <p className="teacher-role">Geology Teacher</p>

          <div className="classmates-section">
            <p className="section-title">Teachers from the same class</p>
            <div className="avatar-group">
              <img src="/avatar1.png" alt="Teacher" />
              <img src="/avatar2.png" alt="Teacher" />
              <img src="/avatar3.png" alt="Teacher" />
              <span className="more-link">+7 more</span>
            </div>
          </div>
        </div>

        <div className="profile-right">
          <div className="about-section">
            <h4>About</h4>
            <p>
              Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
              ullamco cillum dolor. Voluptate exercitation incididunt aliquip
              deserunt reprehenderit elit laborum.
            </p>
          </div>

          <div className="info-section">
            <p><strong>Age:</strong> 34</p>
            <p><strong>Gender:</strong> Male</p>
            <p><strong>Phone:</strong> +214412543</p>
            <p><strong>Email:</strong> user@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
