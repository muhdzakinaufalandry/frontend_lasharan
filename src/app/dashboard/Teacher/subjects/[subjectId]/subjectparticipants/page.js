'use client';

import '@/styles/participants.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function SubjectParticipantsPage() {
  const { subjectId } = useParams();
  const [students, setStudents] = useState([]);
  const baseImage = "/logo-smas.png";

  useEffect(() => {
    if (!subjectId) return;

    const fetchStudents = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/siswa/by-mapel/${subjectId}`);
        if (!response.ok) throw new Error('Failed to fetch students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [subjectId]);

  return (
    <div className="participants-page">
      <h2>Peserta Mata Pelajaran</h2>

      <div className="table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nama Siswa</th>
              <th>NISN</th>
            </tr>
          </thead>

          <tbody>
            {students.map((stu, index) => (
              <tr key={stu.id_siswa}>
                <td>{index + 1}</td>
                 <td>
                  <div className="photo-container2">
                    <Image
                      src={stu.foto || baseImage}
                      alt="student-photo"
                      className="photo-preview2"
                      width={50}
                      height={50}
                    />
                  </div>
                </td>
                <td>
                  <Link
                    href={`/dashboard/Teacher/subjects/${subjectId}/subjectparticipants/subjectgrades/${stu.id_siswa}`}
                    className="name-link"
                  >
                    {stu.nama_siswa}
                  </Link>
                </td>
                <td>{stu.nisn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
