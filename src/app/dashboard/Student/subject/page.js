'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import '@/styles/subjectList.css';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Ambil dari localStorage (anggap user login)
  const id_user = typeof window !== 'undefined' ? localStorage.getItem('id_user') : null;

  useEffect(() => {
    if (!id_user) return;

    // 1. Ambil id_siswa dari id_user
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/siswa/user/${id_user}`)
      .then((res) => res.json())
      .then((data) => {
        const id_siswa = data.id_siswa; // sesuai handler-mu
        // 2. Ambil daftar mata pelajaran berdasarkan id_siswa
        return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/matapelajaran/siswa/${id_siswa}`);
      })
      .then((res) => res.json())
      .then((data) => {
        setSubjects(data);
      })
      .catch((err) => {
        console.error('Gagal fetch data mata pelajaran:', err);
      });
  }, [id_user]);

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.nama_mata_pelajaran.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.id_mapel.toString().includes(searchTerm)
  );

  return (
    <div className="subject-page">
      <main className="subject-main">
        <div className="subject-header">
          <input
            type="text"
            className="search-input"
            placeholder="Search by Name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="header-icons">
            <button className="icon-btn">🔔</button>
            <button className="icon-btn">📧</button>
            <button className="icon-btn">⚙️</button>
            <div className="avatar-circle" />
          </div>
        </div>

        <h1 className="subject-list-title">Subject</h1>

        <div className="subject-table-container">
          <table className="subject-table">
            <thead>
              <tr>
                <th>Subject ID</th>
                <th>Subject Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.map((subj) => (
                <tr key={subj.id_mapel}>
                  <td>
                    <Link href={`/dashboard/Student/subject/${subj.id_mapel}`}>
                      {subj.id_mapel}
                    </Link>
                  </td>
                  <td>{subj.nama_mata_pelajaran}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
