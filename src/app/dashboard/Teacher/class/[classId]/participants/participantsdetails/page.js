'use client';

import { useEffect, useState } from 'react';
import '@/styles/grades.css';
import SidebarTeacher from '@/components/SidebarTeacher';

export default function ParticipantsDetailsPage() {
  const [gradeData, setGradeData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newGrade, setNewGrade] = useState({ item: '', weight: '', grade: '' });


  useEffect(() => {
    const data = {
      subject: 'Accounting',
      teacher: 'Jane Cooper',
      year: '2022–2023 [1]',
      student: 'Kevin Willian',
      grades: [
        { item: 'Attendance', weight: '100.00%', grade: '100.00 (A)', range: '0 - 100' },
        { item: 'Assignment 1', weight: '100.00%', grade: '100.00 (A)', range: '0 - 100' },
        { item: 'Assignment 2', weight: '100.00%', grade: '100.00 (A)', range: '0 - 100' },
        { item: 'Assignment 3', weight: '100.00%', grade: '100.00 (A)', range: '0 - 100' },
        { item: 'Course Total', weight: '-', grade: '100.00 (A)', range: '0 - 100' },
      ],
    };
    setGradeData(data);
  }, []);

  if (!gradeData) return <div>Loading...</div>;

  return (
    <div className="grade-page">
      <main className="grade-main">
        <div className="header-section">
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <button>Cari.</button>
            <button>Kelas Keseluruhan</button>
            <button onClick={() => setShowModal(true)}>＋</button>
          </div>

          {showModal && (
            <div className="modal-overlay">
                <div className="modal">
                <h3>Tambahkan Nilai</h3>
                <input
                    type='int'
                    placeholder="Grade Item"
                    value={newGrade.item}
                    onChange={(e) => setNewGrade({ ...newGrade, item: e.target.value })}
                />
                <input
                    type="int"
                    placeholder="Weight"
                    value={newGrade.weight}
                    onChange={(e) => setNewGrade({ ...newGrade, weight: parseFloat(e.target.value) })}
                />
                <input
                    type="int"
                    placeholder="Grade"
                    value={newGrade.grade}
                    onChange={(e) => setNewGrade({ ...newGrade, grade: parseFloat(e.target.value) })}
                />
                <div className="modal-actions">
                    <button
                    onClick={() => {
                        setGradeData((prev) => ({
                        ...prev,
                        grades: [
                            ...prev.grades.slice(0, -1),
                            {
                            item: newGrade.item,
                            weight: parseFloat(newGrade.weight) || 0,
                            grade: parseFloat(newGrade.grade) || 0,
                            range: '0 - 100',
                            },
                            prev.grades[prev.grades.length - 1],
                        ],
                        }));
                        setShowModal(false);
                        setNewGrade({ item: '', weight: '', grade: '' });
                        }}
                        >
                         Simpan
                         </button>
                         <button onClick={() => setShowModal(false)}>Batal</button>
                        </div>
                    </div>
                </div>
             )}

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
                  <th>Item Kelas</th>
                  <th>Bobot Nilai</th>
                  <th>Nilai</th>
                  <th>Rentang Nilai</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {gradeData.grades.map((grade, idx) => (
                  <tr key={idx}>
                    <td>{grade.item}</td>
                    <td>{grade.weight}</td>
                    <td style={{ color: '#10B981' }}>{grade.grade}</td>
                    <td>{grade.range}</td>
                    <td>
                      {grade.item !== 'Course Total' ? (
                        <>
                          <button className="action-btn" title="Edit">✏️</button>
                          <button className="action-btn" title="Delete">🗑️</button>
                        </>
                      ) : (
                        <button className="action-btn" title="View">👁️</button>
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
