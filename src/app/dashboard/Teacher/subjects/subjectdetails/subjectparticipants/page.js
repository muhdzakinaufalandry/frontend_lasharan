'use client';
import '@/styles/participants.css';
import Link from 'next/link';
import { useState } from 'react';

const dummyStudents = [
  {
    id: 1,
    name: 'Kevin William',
    nisn: '532670049',
    class: '12 - A',
    email: 'kwil@gmail.com',
    dob: '24‑04‑2006',
    address: 'Jakarta',
    contact: '08480 000000',
    points: 27800,
  },
  {
    id: 2,
    name: 'Amanda Lee',
    nisn: '532670050',
    class: '12 - A',
    email: 'amlee@gmail.com',
    dob: '02‑07‑2006',
    address: 'Bandung',
    contact: '08481 000001',
    points: 27500,
  },
];

export default function SubjectParticipantsPage() {
  const [students] = useState(dummyStudents);

  return (
    <div className="participants-page">
      <h2>Subject Participants</h2>

      <div className="table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>NISN</th>
              <th>Class</th>
              <th>User Email</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Points</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((stu) => (
              <tr key={stu.id}>
                <td className="avatar-cell clickable-cell">
                  <Link href={`/dashboard/Teacher/subjects/subjectdetails/subjectparticipants/subjectgrades`} className="name-link">
                    <span className="avatar">👤</span>
                    {stu.name}
                  </Link>
                </td>
                <td>{stu.nisn}</td>
                <td>{stu.class}</td>
                <td>{stu.email}</td>
                <td>{stu.dob}</td>
                <td>{stu.address}</td>
                <td>{stu.contact}</td>
                <td>{stu.points}</td>
                <td className="action-cell">
                  <button title="Edit">✏️</button>
                  <button title="Delete">🗑️</button>
                  <button title="More">⋯</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Navigasi halaman (dummy) */}
      <div className="pagination">
        <button disabled>Prev</button>
        <span>Page 1 / 1</span>
        <button disabled>Next</button>
      </div>
    </div>
  );
}
