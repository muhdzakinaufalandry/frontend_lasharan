'use client';
import React, { useEffect, useState } from 'react';
import { BookOpen, Award, X } from 'lucide-react';
import "@/styles/studentDashboard.css";

export default function StudentDashboardPage() {
  const [subjectCount, setSubjectCount] = useState(0);
  const [gradeCount, setGradeCount] = useState(0);
  const [grades, setGrades] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const id_user = localStorage.getItem("id_user");
    if (!id_user) return;

    // Step 1: Get id_siswa dari id_user
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/siswa/user/${id_user}`)
      .then((res) => res.json())
      .then((data) => {
        const id_siswa = data.id_siswa;

        // Step 2: Fetch jumlah mata pelajaran
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/matapelajaran/siswa/${id_siswa}`)
          .then((res) => res.json())
          .then((mapelData) => {
            setSubjectCount(mapelData.length);
          })
          .catch((err) => console.error("Gagal fetch mata pelajaran:", err));

        // Step 3: Fetch daftar nilai
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/nilai/user/${id_user}`)
          .then((res) => res.json())
          .then((nilaiData) => {
            setGrades(nilaiData);
            setGradeCount(nilaiData.length);
          })
          .catch((err) => console.error("Gagal fetch nilai:", err));
      })
      .catch((err) => console.error("Gagal fetch id_siswa:", err));
  }, []);

  return (
    <div className="dashboard-layout">
      <main className="dashboard-content">
        <section className="welcome-card">
          <div className="welcome-text">
            <h2>Selamat Datang, Siswa SMAS Lasharan Jaya Gowa!</h2>
            <p className="welcome-ipsum">
              Saya menyampaikan ucapan terima kasih kepada semua pihak yang telah membantu tersedianya website sekolah ini. Kritik dan saran yang konstruktif sangat kami harapkan demi perbaikan dan peningkatan kualitas serta kemanfaatan yang lebih luas.
            </p>
          </div>
        </section>

        <section className="status-section">
          <div className="status-box subject-box">
            <div>
              <h3>{subjectCount}</h3>
              <p>Mata Pelajaran</p>
            </div>
            <BookOpen size={48} />
          </div>

          <div className="status-box grade-box" onClick={() => setShowModal(true)} style={{ cursor: "pointer" }}>
            <div>
              <h3>{gradeCount}</h3>
              <p>Nilai</p>
            </div>
            <Award size={48} />
          </div>
        </section>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Daftar Nilai</h3>
                <X onClick={() => setShowModal(false)} style={{ cursor: "pointer" }} />
              </div>
              <div className="modal-body">
                {grades.length > 0 ? (
                  <ul>
                    {grades.map((g, idx) => (
                      <li key={idx} style={{ marginBottom: '0.5rem' }}>
                        <strong>{g.mapel}</strong>: {g.nilai}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Belum ada nilai.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
