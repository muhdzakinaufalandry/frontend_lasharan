'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/class.css';

export default function ClassPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const classData = [
    { id: 1, name: 'X IPA 1', homeroom: 'Mr. John', total: 32 },
    { id: 2, name: 'X IPA 2', homeroom: 'Ms. Lily', total: 30 },
    { id: 3, name: 'XI IPS 1', homeroom: 'Mr. Anton', total: 28 },
  ];

  return (
    <div className="class-container">
      <div className="class-header">
        <h2>All Class List</h2>
        <button className="btn-add" onClick={handleOpen}>＋</button>
      </div>

            <table className="class-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Class Name</th>
            <th>Homeroom Teacher</th>
            <th>Total Students</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {classData.map((kelas, index) => (
            <tr key={kelas.id}>
              <td>{index + 1}</td>
              <td>{kelas.name}</td>
              <td>{kelas.homeroom}</td>
              <td>{kelas.total}</td>
              <td className="action-icons">
                <span title="Edit">✏️</span>
                <span title="Delete">🗑️</span>
                <span title="More">⋯</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Add Class */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Class Information</h3>
            <hr />

            <div className="form-row">
              <div className="form-group">
                <label>Teacher Name</label>
                <input type="text" placeholder="Name" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Class</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>School Year</label>
                <input type="string" />
              </div>
            </div>

            <div className="button-group">
              <button onClick={handleClose} className="cancel-btn">cancel</button>
              <button type="reset" className="reset-btn">reset</button>
              <button className="save-btn">save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
