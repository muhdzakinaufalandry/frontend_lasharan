'use client';

import '@/styles/subjectDetail.css';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SubjectDetailPage() {
  const { subjectId } = useParams();
  const [subjectDetails, setSubjectDetails] = useState(null);

  useEffect(() => {
    if (!subjectId) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/mapel/simple-detail/${subjectId}`)
      .then(res => res.json())
      .then(data => {
        console.log('DATA:', data); // Tambahkan log ini
        setSubjectDetails(data);
      })
      .catch(err => console.error('Gagal ambil data:', err));
  }, [subjectId]);

  if (!subjectDetails) return <p>Loading...</p>;

  return (
    <div className="subject-detail-page">
      <div className="subject-header">
        <div>
          <h3>{subjectDetails.nama_mata_pelajaran} – {subjectDetails.nama_guru}</h3>
        </div>
        <span>{subjectDetails.tahun_ajaran}</span>
      </div>

      <div className="subject-content">
        <div className="subject-about">
          <div className="about-text">
            <h4>About The Subject</h4>
            <p>
              Informasi singkat tentang mata pelajaran {subjectDetails.nama_mata_pelajaran} 
              yang diajarkan oleh {subjectDetails.nama_guru}.
            </p>
          </div>
          <img src="/images/accounting.png" alt={subjectDetails.nama_mata_pelajaran} />
        </div>

        <div className="side-panel">
          <div className="online-users">
            <h4>Online Users</h4>
            <ul>
              <li>👤 Siswa 1</li>
              <li>👤 Siswa 2</li>
              <li>👤 Siswa 3</li>
            </ul>
          </div>
          <div className="discussion-box">
            <h4>Discussion Forum</h4>
            <ul>
              <li>Topic 1: Introduction</li>
              <li>Topic 2: Homework</li>
              <li>Topic 3: Evaluation</li>
            </ul>
          </div>
        </div>
      </div>

      {subjectDetails?.id_mapel && (
        <Link href={`/dashboard/Teacher/subjects/${subjectId}/subjectparticipants`}>
          <div className="participant-box" style={{ cursor: 'pointer' }}>
            <h3>{subjectDetails.jumlah_siswa}</h3>
            <p>Participants</p>
          </div>
        </Link>
      )}
    </div>
  );
}
