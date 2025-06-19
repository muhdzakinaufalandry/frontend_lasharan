'use client';
import '@/styles/teachersubjects.css';

const subjects = [
  { name: 'Accounting' },
  { name: 'English' },
  { name: 'Science' },
  { name: 'Mathematics' },
  { name: 'History' },
  { name: 'Biology' },
];

export default function SubjectsPage() {
  return (
    <div className="subjects-page">
      <h2>Mata Pelajaran</h2>
      <div className="subjects-grid">
        {subjects.map((subject, idx) => (
          <div key={idx} className="subject-card">
            <span>{subject.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
