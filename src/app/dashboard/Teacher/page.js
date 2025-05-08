'use client';
import SidebarTeacher from '@/components/SidebarTeacher';
import '@/styles/teacherDashboard.css';

export default function TeacherDashboardPage() {
  return (
    <div className="teacher-dashboard">
      <main className="dashboard-content-wrapper">
        <div className="dashboard-header">
          <h2>Welcome, Admin Higher Secondary School Team!</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed nulla suscipit,
            ultricies nunc sed, pharetra ante. Quisque gravida facilisis dui.
          </p>
        </div>

        <div className="dashboard-body">
          <div className="dashboard-main">
            <div className="attendance-card">
              <h3>Attendance</h3>
              <div className="attendance-circle">
                <svg width="100" height="100">
                  <circle cx="50" cy="50" r="40" stroke="#eee" strokeWidth="8" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#2B3990"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="251"
                    strokeDashoffset="117"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="attendance-percentage">53%</div>
              </div>
              <p className="attendance-note">3,178 boys</p>
            </div>

            <div className="notice-board">
              <div className="notice-header">
                <h3>Notice Board</h3>
                <a href="#">View all</a>
              </div>
              <div className="notice-list">
                <div className="notice-item yellow">
                  <strong>Sports Day Announcement</strong>
                  <p>2nd week of this month. Entry fee due by May 12.</p>
                </div>
                <div className="notice-item purple">
                  <strong>Summer Break Start Date</strong>
                  <p>Expected to begin on May 25, 2024.</p>
                </div>
              </div>
              <button className="add-post-btn">+ Add Post</button>
            </div>
          </div>

          <div className="messages-section">
            <h3>Messages</h3>
            <div className="message-list">
              <div className="message-item">
                <div className="message-avatar" />
                <div className="message-content">
                  <span>Jane Cooper</span>
                  <span>Don't forget the class meet...</span>
                </div>
                <span className="message-time">12:34 pm</span>
              </div>
              <div className="message-item">
                <div className="message-avatar" />
                <div className="message-content">
                  <span>Kristin Watson</span>
                  <span>Do we have Math test?</span>
                </div>
                <span className="message-time">12:34 pm</span>
              </div>
              {/* Tambah lebih banyak pesan jika perlu */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
