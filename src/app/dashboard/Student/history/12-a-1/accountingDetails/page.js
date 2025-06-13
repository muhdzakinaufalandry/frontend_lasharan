'use client';

import { Bookmark } from 'lucide-react';
import { useState } from 'react';
import "@/styles/accountingDetails.css";
import Link from 'next/link';

export default function AccountingDetailsPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="subject-detail-container">
      <main className="main-content">

        <div className="detail-header">
          <h2>Accounting - Jane Cooper</h2>
          <span>2022-2023 [1]</span>
        </div>

        <div className="stats-section">
          <div className="grade-card">
            <h3>Grade</h3>
            <div className="grade-value">A+</div>
          </div>

          <div className="course-card">
            <Link href="/dashboard/Student/history/12-a-1/accountingDetails/gradeDetails">
            <h3 className="course-title">SubValue</h3>
              <div className="course-icon">
                <Bookmark size={32} />
              </div>
          </Link>      
          </div>
        </div>
      </main>
    </div>
  );
}
