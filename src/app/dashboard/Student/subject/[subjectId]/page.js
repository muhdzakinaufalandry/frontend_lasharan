'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Users, FileText } from 'lucide-react';
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/mapel/simple-detail/${subjectId}`);
        if (!res.ok) throw new Error('Gagal fetch data');
        const data = await res.json();

        const formattedData = {
          name: data.nama_mata_pelajaran,

          teacher: data.nama_guru,
          year: data.tahun_ajaran,
          description: `Informasi singkat tentang mata pelajaran ${data.nama_mata_pelajaran} yang diajarkan oleh ${data.nama_guru}.`,
          participants: data.jumlah_siswa || 0,

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
        <div className="subject-header">
          <h2>{`${subjectData.name} - ${subjectData.teacher}`}</h2>
          <span className="year">{subjectData.year}</span>
        </div>

        <section className="subject-overview">
          <div className="overview-left">
            <div className="about">
              <h4>Tentang Mata Pelajaran</h4>
              <p>{subjectData.description}</p>
            </div>

            <div className="overview-box">
              {/* Participants Box */}
              <div className="participants-box">
                <h4>Peserta</h4>
                <div className="icon-box">
                  <Users className="icon" />
                  <span className="participants-count">{subjectData.participants}</span>
                </div>
              </div>

              {/* Grades Box */}
              <div
                className="grades-box"

                onClick={() =>
                  window.location.href = `/dashboard/Student/subject/${subjectId}/subjectgrades`
                }
              >
                <h4>Nilai</h4>
                <div className="icon-box">
                  <FileText className="icon" />
                  <span className="grades-value">{subjectData.grades}</span>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
