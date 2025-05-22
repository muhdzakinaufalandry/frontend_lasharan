'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import SidebarStudent from '@/components/SidebarStudent';
import '@/styles/accounting.css';
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

        // Ubah ke struktur yang cocok untuk ditampilkan
        const formattedData = {
          name: data.nama_mata_pelajaran,
          teacher: '', // bisa diisi dari backend kalau ada
          year: '2024-2025 [2]',
          description: 'Deskripsi belum tersedia',
          participants: 120,
          courses: ['Course 1 - Introducing', 'Course 2 - First Move'],
          forum: ['Topik 1', 'Topik 2', 'Topik 3'],
          onlineUsers: [
            { id: '0000001', name: 'Siswa Contoh' },
            { id: '0000002', name: 'Siswa Lain' },
          ],
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
          <div className="about">
            <h4>About The Subject</h4>
            <div className="about-content">
              <p>{subjectData.description}</p>
              <div className="about-image">
                <img src="https://via.placeholder.com/150" alt="Subject Illustration" />
              </div>
            </div>
          </div>
          <div className="participants-box">
            <div className="participants-header">
              <h4>Participants</h4>
              <div className="dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
            <span className="participants-count">{subjectData.participants}</span>
          </div>
          <div className="courses-box">
            <Link href={`/dashboard/Student/subject/${subjectId}/subjectgrades`}className="courses-header link-hover">
              <h4 className="clickable-title">Subvalue</h4>
              <div className="dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </Link>
            <ul>
              {subjectData.courses.map((c, idx) => (
                <li key={idx} className="course-item">
                  <img src="https://via.placeholder.com/40" alt="Course Icon" />
                  <p>{c}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="extra-info">
          <div className="online-users">
            <h4>Online Users</h4>
            <ul>
              {subjectData.onlineUsers.map((u, idx) => (
                <li key={idx} className="user-item">
                  <img src="https://via.placeholder.com/30" alt={`Avatar of ${u.name}`} />
                  <p>{u.name}</p>
                  <span className="eye-icon">👁️</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="forum">
            <h4>Discussion Forum</h4>
            <ul>
              {subjectData.forum.map((f, idx) => (
                <li key={idx} className="forum-item">
                  <span className="message-icon">💬</span>
                  <p>{f}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
