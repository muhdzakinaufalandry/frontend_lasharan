'use client';
import '@/styles/participants.css';
import { useParams } from 'next/navigation';
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
  
];

export default function ParticipantsPage() {
  const { classId } = useParams(); // e.g. "12-A"
  const [students] = useState(dummyStudents);

  return (
    <div className="participants-page">
      <h2>Participants</h2>

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
            {students.map((stu, idx) => (
              <tr key={stu.id}>
                <td>{String(idx + 1).padStart(2, '0')}</td>
                <td className="avatar-cell">
                  <span className="avatar">👤</span>
                  {stu.name}
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
        <span>Page 1 / 2</span>
        <button>Next</button>
      </div>
    </div>
  );
}
