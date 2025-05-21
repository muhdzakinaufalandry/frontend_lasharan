'use client';
import '@/styles/subjectDetail.css';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const subjectDetails = {
  name: 'Accounting',
  teacher: 'Jane Cooper',
  year: '2024–2025',
  about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Ut enim ad minim veniam.',
  participants: 23,
  image: '/images/accounting.png',
  onlineUsers: ['👤 Tessa Brandon', '👤 Roberto Alonzo', '👤 George Harrison'],
};

export default function SubjectDetailPage() {
  const params = useParams();
  const { classId, subjectId } = params;

  return (
    <div className="subject-detail-page">
      <div className="subject-header">
        <div>
          <h3>{subjectDetails.name} – {subjectDetails.teacher}</h3>
        </div>
        <span>{subjectDetails.year}</span>
      </div>

      <div className="subject-content">
        <div className="subject-about">
          <div className="about-text">
            <h4>About The Subject</h4>
            <p>{subjectDetails.about}</p>
          </div>
          <img src={subjectDetails.image} alt={subjectDetails.name} />
        </div>

        <div className="side-panel">
          <div className="online-users">
            <h4>Online Users</h4>
            <ul>
              {subjectDetails.onlineUsers.map((user, i) => (
                <li key={i}>{user}</li>
              ))}
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

      <Link href={`/dashboard/Teacher/subjects/subjectdetails/subjectparticipants`}>
         <div className="participant-box" style={{ cursor: 'pointer' }}>
            <h3>{subjectDetails.participants}</h3>
            <p>Participants</p>
        </div>
    </Link>
    </div>
  );
}