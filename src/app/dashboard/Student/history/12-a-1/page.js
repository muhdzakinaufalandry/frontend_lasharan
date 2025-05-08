'use client';

import { useEffect, useState } from 'react';
import SidebarStudent from '@/components/SidebarStudent';
import "@/styles/12-a-1.css";
import Link from 'next/link';

export default function HistoryDetailPage() {
  const subjects = [
    { subject: "Accounting", code: "00001", status: "100% Complete" },
    { subject: "English", code: "00002", status: "100% Complete" },
    { subject: "Science", code: "00003", status: "100% Complete" },
    { subject: "Math", code: "00004", status: "100% Complete" },
    { subject: "Art", code: "00005", status: "100% Complete" },
    { subject: "IT (Information Technology)", code: "00006", status: "100% Complete" },
  ];

  return (
    <div className="history-detail-container">
      <main className="main-content">
        <div className="topbar">
          <input type="text" placeholder="Search" className="search-bar" />
          <div className="top-icons">
            <input type="text" placeholder="Search by Name or R" className="class-filter" />
            <select className="class-dropdown">
              <option value="all">All Classes</option>
            </select>
            <div className="icon-group">
              <div className="icon" />
              <div className="icon" />
              <div className="icon blue" />
            </div>
          </div>
        </div>

        <div className="detail-layout">
          <div className="detail-header">
            <h2>12 A</h2>
            <span>2022-2023 [1]</span>
          </div>

          <div className="subjects-section">
            <h3>Subjects</h3>
            <div className="cards-grid">
              {subjects.map((item, i) => {
                const isAccounting = item.subject === "Accounting";
                const content = (
                  <div className="subject-card">
                    <div className="card-image" />
                    <div className="card-content">
                      <div>{item.subject}</div>
                      <div>{item.code}</div>
                      <div className="status">{item.status}</div>
                    </div>
                  </div>
                );

                return isAccounting ? (
                  <Link
                    href="/dashboard/Student/history/12-a-1/accountingDetails"
                    key={i}
                    className="subject-card-link"
                  >
                    {content}
                  </Link>
                ) : (
                  <div key={i} className="subject-card">
                    <div className="card-image" />
                    <div className="card-content">
                      <div>{item.subject}</div>
                      <div>{item.code}</div>
                      <div className="status">{item.status}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="progress-container">
            <div className="progress-item">
              <div className="progress-title">overall Task</div>
              <div className="progress-chart">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path
                    className="circle-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="circle"
                    strokeDasharray="100, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage">100%</text>
                </svg>
                <div className="labels">
                  <span>Done 100%</span>
                  <span>unfinished 0%</span>
                </div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-title">overall absence</div>
              <div className="progress-chart">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path
                    className="circle-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="circle"
                    strokeDasharray="90, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage">90%</text>
                </svg>
                <div className="labels">
                  <span>Present 90%</span>
                  <span>Absent 10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
