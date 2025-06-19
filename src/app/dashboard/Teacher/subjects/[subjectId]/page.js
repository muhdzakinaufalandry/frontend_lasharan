'use client';

import '@/styles/subjectDetail.css';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users } from 'lucide-react'; // Import LucideReact Users icon

export default function SubjectDetailPage() {
  const { subjectId } = useParams();
  const [subjectDetails, setSubjectDetails] = useState(null);

  useEffect(() => {
    if (!subjectId) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/mapel/simple-detail/${subjectId}`)
      .then(res => res.json())
      .then(data => {
        console.log('DATA:', data); // Log the data for debugging
        setSubjectDetails(data);
      })
      .catch(err => console.error('Failed to fetch data:', err));
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
            <h4>Tentang Mata Pelajaran</h4>
            <p>
              Informasi singkat tentang mata pelajaran {subjectDetails.nama_mata_pelajaran} 
              yang diajarkan oleh {subjectDetails.nama_guru}.
            </p>
          </div>
        </div>
      </div>

      {subjectDetails?.id_mapel && (
        <Link href={`/dashboard/Teacher/subjects/${subjectId}/subjectparticipants`}>
          <div className="stat-card orange" style={{ cursor: 'pointer' }}>
            <div className="stat-content">
              <div className="stat-text">
                <h3>{subjectDetails.jumlah_siswa || 0}</h3>
                <p>Peserta</p>
              </div>
              <Users size={36} className="stat-icon" /> {/* Using LucideReact's Users icon */}
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
