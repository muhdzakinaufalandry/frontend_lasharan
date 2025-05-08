'use client';
import Link from 'next/link';
import '@/styles/teacherclass.css'; // atau gunakan Tailwind jika tersedia

const classData = [
  { id: '12A', name: '12 - A', year: '2023-2024', participants: 70 },
  { id: '12B', name: '12 - B', year: '2023-2024', participants: 30 },
  { id: '12C', name: '12 - C', year: '2023-2024', participants: 120 },
  { id: '11A', name: '11 - A', year: '2024-2025', participants: 37 },
  { id: '11B', name: '11 - B', year: '2024-2025', participants: 77 },
  { id: '11C', name: '11 - C', year: '2024-2025', participants: 27 },
  { id: '10A', name: '10 - A', year: '2024-2025', participants: 120 },
  { id: '10B', name: '10 - B', year: '2024-2025', participants: 33 },
  { id: '10C', name: '10 - C', year: '2024-2025', participants: 67 },
];

export default function ClassPage() {
  return (
    <div className="class-page">
      <h2>Class</h2>
      <div className="legend">
        <span className="dot green" /> Less
        <span className="dot orange" /> Much
        <span className="dot red" /> Full
      </div>
      <div className="class-grid">
        {classData.map((cls) => (
          <Link href={`/dashboard/Teacher/class/${cls.id}`} key={cls.id}>
            <div className={`class-box ${getColor(cls.participants)}`}>
              <div className="box-header">
                <span>{cls.name}</span>
                <span>{cls.year}</span>
              </div>
              <div className="participants">{cls.participants} Participants</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function getColor(count) {
  if (count >= 100) return 'red';
  if (count >= 50) return 'orange';
  return 'green';
}
