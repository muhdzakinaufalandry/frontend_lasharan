'use client';

import Link from 'next/link';
import SidebarStudent from '@/components/SidebarStudent';
import '@/styles/historyStudent.css';

export default function HistoryPage() {
  const historyData = [
    { grade: "12 - A", year: "2024 – 2025", count: 1, status: "done", link: "/dashboard/Student/history/12-a-1" },
    { grade: "12 - A", year: "2024 – 2025", count: 2, status: "onprocess", link: "/dashboard/Student/history/12-a-2" },
    { grade: "11 - A", year: "2023 – 2024", count: 1, status: "done", link: "/dashboard/Student/history/11-a-1" },
    { grade: "11 - A", year: "2023 – 2024", count: 2, status: "done", link: "/dashboard/Student/history/11-a-2" },
    { grade: "10 - A", year: "2022 – 2023", count: 1, status: "done", link: "/dashboard/Student/history/10-a-1" },
    { grade: "10 - A", year: "2022 – 2023", count: 2, status: "done", link: "/dashboard/Student/history/10-a-2" },
  ];

  return (
    <div className="history-container">
      <main className="main-content">
        <div className="topbar">
          <input type="text" placeholder="Search" className="search-bar" />
          <div className="top-icons">
            <input type="text" placeholder="Search by Name or roll." className="class-filter" />
            <select className="class-dropdown">
              <option value="all">All Classes</option>
            </select>
          </div>
        </div>

        <h2 className="section-title">History</h2>

        <div className="status-labels">
          <span className="dot done-dot"></span> Done
          <span className="dot onprocess-dot" style={{ marginLeft: "20px" }}></span> On Process
        </div>

        <div className="history-layout">
          <div className="cards-grid">
            {historyData.map((item, i) => (
              <Link href={item.link} key={i}>
                <div className={`card ${item.status === "done" ? "done" : "onprocess"}`}>
                  <div className="card-header">
                    <span className="card-grade">{item.grade}</span>
                    <span className="card-year">{item.year} [{item.count}]</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="progress-container">
            <div className="progress-title">OVERALL TASK</div>
            <div className="progress-chart">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle"
                  strokeDasharray="83, 100"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="16" fontSize="7" textAnchor="middle" fill="#000">📁</text>
                <text x="18" y="22" className="percentage">83%</text>
              </svg>
              <div className="labels">
                <span className="done-label">Done 83%</span>
                <span className="unfinished-label">unfinished 17%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}