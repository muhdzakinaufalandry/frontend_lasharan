'use client';
import React, { useEffect, useState } from 'react';
import '@/styles/teacher.css';
import Link from 'next/link';

export default function TeacherPage() {
  const [gurus, setGurus] = useState([]);
  const [editGuru, setEditGuru] = useState(null); // Untuk menyimpan guru yang sedang diedit

  // Fetch data guru
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/guru`)
      .then((response) => response.json())
      .then((data) => setGurus(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Hapus guru
  const handleDeleteGuru = async (id) => {
    if (!window.confirm("Yakin ingin menghapus guru ini?")) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/guru/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setGurus(gurus.filter(g => g.id_guru !== id));
        alert("Guru berhasil dihapus.");
      } else {
        alert("Gagal menghapus guru.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menghapus guru.');
    }
  };

  // Edit guru
  const handleEditGuru = (guru) => {
    setEditGuru(guru);
  };

  // Update guru
  const handleUpdateGuru = async () => {
    if (!editGuru) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/guru/${editGuru.id_guru}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editGuru),
      });

      if (response.ok) {
        setGurus(gurus.map(g => g.id_guru === editGuru.id_guru ? editGuru : g));
        alert("Guru berhasil diperbarui.");
        setEditGuru(null); // Reset after update
      } else {
        alert("Gagal memperbarui guru.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Terjadi kesalahan saat memperbarui guru.");
    }
  };

  return (
    <div className="teacher-page">
      <div className="teacher-header">
        <div className="header-text">
          <h1>Teachers</h1>
          <p>All Teacher List</p>
        </div>

        <div className="header-actions">
          <input
            type="text"
            placeholder="🔍 Search by Name or roll."
            className="search-input"
          />
          <select className="filter-dropdown">
            <option>All Classes</option>
          </select>
          <Link href="/dashboard/admin/users/teacher/add" className="add-new-btn">
            + Add New
          </Link>
        </div>
      </div>

      <table className="teacher-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Teacher Name</th>
            <th>Subject</th>
            <th>NIP</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {gurus.map((teacher, index) => (
            <tr key={teacher.id_guru}>
              <td>{index + 1}</td>
              <td>{teacher.nama_guru}</td>
              <td>{teacher.mata_pelajaran}</td>
              <td>{teacher.nip}</td>
              <td>{teacher.alamat}</td>
              <td>{teacher.email}</td>
              <td>{teacher.no_telp}</td>
              <td className="action-icons">
                <span title="Edit" onClick={() => handleEditGuru(teacher)}>✏️</span>
                <span title="Delete" onClick={() => handleDeleteGuru(teacher.id_guru)}>🗑️</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Guru Modal */}
      {editGuru && (
        <div className="edit-modal">
          <div className="modal-content">
            <h3>Edit Teacher</h3>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={editGuru.nama_guru}
                onChange={(e) => setEditGuru({ ...editGuru, nama_guru: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                value={editGuru.mata_pelajaran}
                onChange={(e) => setEditGuru({ ...editGuru, mata_pelajaran: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>NIP</label>
              <input
                type="text"
                value={editGuru.nip}
                onChange={(e) => setEditGuru({ ...editGuru, nip: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={editGuru.alamat}
                onChange={(e) => setEditGuru({ ...editGuru, alamat: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={editGuru.email}
                onChange={(e) => setEditGuru({ ...editGuru, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                value={editGuru.no_telp}
                onChange={(e) => setEditGuru({ ...editGuru, no_telp: e.target.value })}
              />
            </div>
            <div className="form-actions">
              <button className="btn-rounded save-btn" onClick={handleUpdateGuru}>Save</button>
              <button className="btn-rounded cancel-btn" onClick={() => setEditGuru(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
