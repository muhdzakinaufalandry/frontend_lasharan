'use client';

import { useEffect, useState } from 'react';
import SidebarStudent from '@/components/SidebarStudent';
import "@/styles/accountingDetails.css";
import Link from 'next/link';

export default function AccountingDetailsPage() {
  return (
    <div className="subject-detail-container">
      <main className="main-content">
        <div className="topbar">
          <input type="text" placeholder="Search" className="search-bar" />
          <div className="top-icons">
            <input type="text" placeholder="Search by name or roll" className="class-filter" />
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
            <h2>Accounting - Jane Cooper</h2>
            <span>2022-2023 [1]</span>
          </div>

          <div className="content-section">
            <div className="about-section">
              <h3>About The Subject</h3>
              <div className="about-content">
                <div className="about-text">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec euismod sagittis, ultrices nunc sed, pharetra risus. Orcique gravida facilisis dui.
                  </p>
                </div>
                <div className="about-image" />
              </div>
            </div>

            <div className="progress-container">
              <div className="progress-item">
                <div className="progress-title">overall Task</div>
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
                      strokeDasharray="100, 100"
                      d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
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
                      d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle"
                      strokeDasharray="100, 100"
                      d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="labels">
                    <span>Present 100%</span>
                    <span>Absent 0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-section">
            <div className="grade-card">
              <h3>Grade</h3>
              <div className="grade-value">A+</div>
            </div>
            <div className="course-card">
              <Link href="/dashboard/Student/history/12-a-1/accountingDetails/gradeDetails">
                <h3 className="course-title">SubValue</h3>
              </Link>
              <div className="course-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec euismod sagittis, ultrices nunc sed, pharetra risus. Orcique gravida facilisis dui.
                </p>
                <div className="course-image" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}