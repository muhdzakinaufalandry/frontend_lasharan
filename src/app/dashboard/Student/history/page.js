'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import '@/styles/historyStudent.css';

export default function HistoryPage() {
  const data = [
    { grade: '12 - A', year: '2024 – 2025', count: 1, status: 'done', link: '/dashboard/Student/history/12-a-1' },
    { grade: '12 - A', year: '2024 – 2025', count: 2, status: 'onprocess', link: '/dashboard/Student/history/12-a-2' },
    { grade: '11 - A', year: '2023 – 2024', count: 1, status: 'done', link: '/dashboard/Student/history/11-a-1' },
    { grade: '11 - A', year: '2023 – 2024', count: 2, status: 'done', link: '/dashboard/Student/history/11-a-2' },
    { grade: '10 - A', year: '2022 – 2023', count: 1, status: 'done', link: '/dashboard/Student/history/10-a-1' },
    { grade: '10 - A', year: '2022 – 2023', count: 2, status: 'done', link: '/dashboard/Student/history/10-a-2' },
  ];

  const [search, setSearch] = useState('');

  const filteredData = data.filter(
    item =>
      item.grade.toLowerCase().includes(search.toLowerCase()) ||
      item.year.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="history-container">
      <main className="main-content">
        <input
          type="text"
          className="search-bar"
          placeholder="Search grade or year..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <h2 className="section-title">Riwayat</h2>

        <div className="status-labels">
          <span className="dot done-dot" /> Selesai
          <span className="dot onprocess-dot" style={{ marginLeft: '20px' }} /> Sedang Berjalan
        </div>

        <div className="history-layout">
          <div className="cards-grid">
            {filteredData.map((item, i) => (
              <Link href={item.link} key={i} className="card-link">
                <div className={`card ${item.status}`}>
                  <div className="card-header">
                    <span className="card-grade">{item.grade}</span>
                    <span className="card-year">{item.year} [{item.count}]</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="progress-container">
            <div className="progress-title">Tugas Keseluruhan</div>
            <div className="progress-chart">
            <div className="circular-wrapper">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle"
                  strokeDasharray="83, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>

              <div className="center-overlay">
                <FileText className="lucide-icon" />
                <div className="percentage">83%</div>
              </div>
            </div>

            <div className="labels">
              <span className="done-label">Selesai 83%</span>
              <span className="unfinished-label">Belum Selesai 17%</span>
            </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
