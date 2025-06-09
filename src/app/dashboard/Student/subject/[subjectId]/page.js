'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import '@/styles/accounting.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faFileAlt } from '@fortawesome/free-solid-svg-icons'; // Importing FA icons
import Link from 'next/link';

export default function SubjectDetailPage() {
  const params = useParams();
  const subjectId = params.subjectId;
  const [subjectData, setSubjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubject() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/matapelajaran/${subjectId}`);
        if (!res.ok) throw new Error('Gagal fetch data');
        const data = await res.json();

        const formattedData = {
          name: data.nama_mata_pelajaran,
          teacher: '',
          year: '2024-2025 [2]',
          description: 'Deskripsi belum tersedia',
          participants: 120,
          grades: 87, // Single grade value
        };

        setSubjectData(formattedData);
      } catch (error) {
        console.error('Error loading subject:', error);
      } finally {
        setLoading(false);
      }
    }

    if (subjectId) {
      fetchSubject();
    }
  }, [subjectId]);

  if (loading) return <div>Loading...</div>;
  if (!subjectData) return <div>Data tidak ditemukan</div>;

  return (
    <div className="subject-page">
      <main className="subject-detail-main">
        <div className="header-section">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button>Search by name or id</button>
            <button>All classes</button>
          </div>
          <div className="subject-header">
            <h2>{`${subjectData.name} - ${subjectData.teacher}`}</h2>
            <span className="year">{subjectData.year}</span>
          </div>
        </div>

        <section className="subject-overview">
          <div className="overview-left">
            <div className="about">
              <h4>About The Subject</h4>
              <p>{subjectData.description}</p>
              <div className="about-image">
                <img src="https://via.placeholder.com/150" alt="Subject Illustration" />
              </div>
            </div>

            <div className="overview-box">
              <div className="participants-box">
                <h4>Participants</h4>
                <div className="icon-box">
                  <FontAwesomeIcon icon={faUsers} className="icon" />
                  <span className="participants-count">{subjectData.participants}</span>
                </div>
              </div>

              {/* Grades Box */}
              <div className="grades-box" onClick={() => window.location.href = `/dashboard/Student/subject/${subjectId}/subjectgrades`}>
                <span className="grades-title">Grades</span>
                <FontAwesomeIcon icon={faFileAlt} className="icon" />
                <span className="grades-value">{subjectData.grades}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
