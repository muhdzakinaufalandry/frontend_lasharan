'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import SidebarStudent from '@/components/SidebarStudent';
import '@/styles/subjectList.css'; // pastikan path ini sesuai

export default function SubjectsPage() {
  const [subjects] = useState([
    { code: '#969', name: 'Accounting', grade: 'A+', date: '22/02/2025' },
    { code: '#970', name: 'English', grade: 'B', date: '23/02/2025' },
    { code: '#971', name: 'Science', grade: 'A', date: '24/02/2025' },
    // Tambahkan data lain sesuai kebutuhan
  ]);

  return (
    <div className="subject-page">

      <main className="subject-main">
        {/* Header: search + ikon */}
        <div className="subject-header">
          <input
            type="text"
            className="search-input"
            placeholder="Search by Name or roll..."
          />
          <div className="header-icons">
            <button className="icon-btn">🔔</button>
            <button className="icon-btn">📧</button>
            <button className="icon-btn">⚙️</button>
            <div className="avatar-circle" />
          </div>
        </div>

        <h1 className="subject-list-title">Subject</h1>

        {/* Tabel Daftar Subject */}
        <div className="subject-table-container">
          <table className="subject-table">
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subj) => (
                <tr key={subj.code}>
                  <td>
                    <Link href={`/dashboard/Student/subject/accounting`}>
                      {subj.code}
                    </Link>
                  </td>
                  <td>{subj.name}</td>
                  <td>
                    <button>✏️</button>
                    <button>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
