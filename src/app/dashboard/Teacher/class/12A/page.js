'use client';
import '@/styles/classDetail.css';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const classData = {
  participants: 70,
  subjectsCount: 3,
  subjects: ['Accounting', 'English', 'Science'],
  onlineUsers: ['👤 Tessa Brandon', '👤 Roberto Alonzo', '👤 George Harrison'],
};

export default function ClassDetailPage() {
  const params = useParams();
  const classId = params.classId;

  return (
    <div className="class-detail-page">
      <div className="class-header">
        <h2>{classId}</h2>
        <span>{classData.year}</span>
      </div>

      <div className="class-stats">
  <Link href={`/dashboard/Teacher/class/12A/participants`} className="stat-card orange">
    <h3>{classData.participants}</h3>
    <p>Participants</p>
  </Link>

  <Link href={`/dashboard/Teacher/subjects/subjectdetails`} className="stat-card blue">
    <h3>{classData.subjectsCount}</h3>
    <p>Subjects</p>
  </Link>
          <div className="online-users">
            <h4>Online Users</h4>
            <ul>
              {classData.onlineUsers.map((user, i) => (
                <li key={i}>{user}</li>
              ))}
            </ul>
          </div>
        </div>

      <div className="class-main-grid">
        <div className="subjects-box">
          <h3>Subjects</h3>
          <div className="subject-list">
            {classData.subjects.map((subj, i) => (
              <div className="subject-card" key={i}>
                {subj}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
