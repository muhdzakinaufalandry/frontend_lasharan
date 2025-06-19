// src/app/page.tsx atau di komponen StudentDashboardPage-mu
'use client';
import React from 'react';
import { BookOpen, Award } from 'lucide-react';
import "@/styles/studentDashboard.css";

export default function StudentDashboardPage() {
  const subjectCount = 6;   // ganti sesuai data nyata
  const gradeCount   = 0;  // ganti sesuai data nyata

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

          <div className="status-box grade-box">
            <div>

              <h3>{gradeCount}</h3>
              <p>Nilai</p>

            </div>
            <Award size={48} />
          </div>
        </section>

        {/* ...bagian lain kalau masih ingin dipertahankan */}
      </main>
    </div>
);
}
