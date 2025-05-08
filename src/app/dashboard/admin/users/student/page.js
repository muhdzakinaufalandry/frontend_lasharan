'use client';
import React from 'react';
import '@/styles/student.css';
import Link from 'next/link'; 

export default function StudentPage() {
  return (
    <div className="student-page">
      <div className="student-header">
        <div className="header-text">
          <h1>Student</h1>
          <p>All Student List</p>
        </div>
        <div className="header-actions">
          <input type="text" placeholder="🔍 Search by Name or roll." className="search-input" />
          <select className="filter-dropdown">
            <option>All Classes</option>
          </select>
          <Link href="/dashboard/admin/users/student/add" className="add-new-btn">
            + Add New
          </Link>
        </div>
      </div>

      <div className="student-empty-state">
        <h2>No teachers at this time</h2>
        <p>Teachers will appear here after they enroll in your school.</p>
      </div>
    </div>
  );
}
