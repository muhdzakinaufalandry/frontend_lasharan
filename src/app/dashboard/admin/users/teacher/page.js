'use client';
import React from 'react';
import '@/styles/teacher.css'; 
import Link from 'next/link';

export default function TeacherPage() {
  return (
    <div className="teacher-page">
      <div className="teacher-header">
        <div className="header-text">
          <h1>Teachers</h1>
          <p>All Teacher List</p>
        </div>

        <div className="header-actions">
          <input
            type="text"
            placeholder="🔍 Search by Name or roll."
            className="search-input"
          />
          <select className="filter-dropdown">
            <option>All Classes</option>
          </select>
          <Link href="/dashboard/admin/users/teacher/add" className="add-new-btn">
            + Add New
          </Link>
        </div>
      </div>

      <div className="teacher-empty-state">
        <h2>No teachers at this time</h2>
        <p>Teachers will appear here after they enroll in your school.</p>
      </div>
    </div>
  );
}
