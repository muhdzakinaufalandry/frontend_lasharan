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
            <h2>Welcome, Student Higher Secondary School Team!</h2>
            <p className="welcome-ipsum">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Aliquam sed nulla sit amet urna pellentesque...
            </p>
          </div>
          <img src="/hero-illustration.png" alt="Hero" />
        </section>

        <section className="status-section">
          <div className="status-box subject-box">
            <div>
              <h3>{subjectCount}</h3>
              <p>Subject</p>
            </div>
            <BookOpen size={48} />
          </div>

          <div className="status-box grade-box">
            <div>
              <h3>Grades</h3>
            </div>
            <Award size={48} />
          </div>
        </section>

        {/* ...bagian lain kalau masih ingin dipertahankan */}
      </main>
    </div>
);
}
