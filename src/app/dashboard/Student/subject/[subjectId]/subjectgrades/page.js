'use client';

import { useEffect, useState } from 'react';
import SidebarStudent from '@/components/SidebarStudent';
import '@/styles/grades.css';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function GradePage() {
  const params = useParams();
  const subjectId = params.subjectId;
  const [idSiswa, setIdSiswa] = useState(null);
  const [gradeData, setGradeData] = useState({
    subject: 'Subject',
    teacher: '',
    year: '2024/2025',
    student: 'Component',
    grades: [],
  });

  useEffect(() => {
    const idUser = localStorage.getItem('id_user');

    if (!idUser) {
      console.error('id_user tidak ditemukan di localStorage');
      return;
    }

    // Ambil id_siswa berdasarkan id_user
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/siswa/user/${idUser}`)
      .then((res) => res.json())
      .then((data) => {
        const fetchedIdSiswa = data.id_siswa;
        setIdSiswa(fetchedIdSiswa);
      })
      .catch((err) => {
        console.error('Gagal mengambil id_siswa:', err);
      });
  }, []);

  useEffect(() => {
    if (idSiswa && subjectId) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/nilai-detail?id_mapel=${subjectId}&id_siswa=${idSiswa}`)
        .then((res) => res.json())
        .then((data) => {
          const penilaian = data.penilaian || [];
          const total = data.total || '-';

          const grades = penilaian.map((item) => ({
            item: item.nama_nilai,
            weight: item.bobot,
            grade: `${item.nilai}`,
            range: item.range,
          }));

          grades.push({
            item: 'Course Total',
            weight: '-',
            grade: total,
            range: '0 - 100',
          });

          setGradeData((prev) => ({
            ...prev,
            grades,
          }));
        })
        .catch((err) => {
          console.error('Gagal mengambil data nilai:', err);
        });
    }
  }, [idSiswa, subjectId]);

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
            <h2>{`${gradeData.subject} ${gradeData.teacher}`}</h2>
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
