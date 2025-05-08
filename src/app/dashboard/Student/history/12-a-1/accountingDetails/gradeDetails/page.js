'use client';

import { useEffect, useState } from 'react';
import SidebarStudent from '@/components/SidebarStudent';
import '@/styles/gradeDetails.css';

export default function GradePage({ params }) {
  const { subjectId } = params;
  const [gradeData, setGradeData] = useState(null);

  useEffect(() => {
    const data = {
      subject: 'Accounting',
      teacher: 'Jane Cooper',
      year: '2022-2023 [1]',
      student: 'Kevin William',
      grades: [
        { item: 'Attendance', weight: '100.00%', grade: '100.00 (A)', range: '0 - 100' },
        { item: 'Assignment 1', weight: '100.00%', grade: '100.00 (A)', range: '0 - 100' },
        { item: 'Assignment 2', weight: '100.00%', grade: '100.00 (A)', range: '0 - 100' },
        { item: 'Assignment 3', weight: '100.00%', grade: '', range: '0 - 100' },
        { item: 'Course Total', weight: '-', grade: '', range: '0 - 100' },
      ],
    };
    setGradeData(data);
  }, [subjectId]);

  if (!gradeData) return <div>Loading...</div>;

  return (
    <div className="grade-page">
      <main className="grade-main">
        <div className="header-section">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button>Search by name or id</button>
            <button>All classes</button>
          </div>
          <div className="subject-header">
            <h2>{`${gradeData.subject} - ${gradeData.teacher}`}</h2>
            <span className="year">{gradeData.year}</span>
          </div>
        </div>
        <section className="grade-section">
          <h3>{`${gradeData.student} Grades`}</h3>
          <div className="grade-table-container">
            <table className="grade-table">
              <thead>
                <tr>
                  <th>Grade Item</th>
                  <th>Calculated Weight</th>
                  <th>Grade</th>
                  <th>Range</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {gradeData.grades.map((grade, idx) => (
                  <tr key={idx}>
                    <td>{grade.item}</td>
                    <td>{grade.weight}</td>
                    <td>{grade.grade}</td>
                    <td>{grade.range}</td>
                    <td>
                      {grade.item !== 'Course Total' && (
                        <>
                          <button className="action-btn">✏️</button>
                          <button className="action-btn">🗑️</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}