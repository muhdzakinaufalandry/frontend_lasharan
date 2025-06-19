'use client';
import React, { useEffect, useState } from 'react';
import '@/styles/student.css';
import Link from 'next/link';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image'; // Pastikan import Image dari Next.js
import baseImage from '../../../../../../public/logo-smas.png';

export default function StudentPage() {
  const [siswas, setSiswas] = useState([]);
  const [filteredSiswas, setFilteredSiswas] = useState([]);
  const [editSiswa, setEditSiswa] = useState(null);
  const [kelasList, setKelasList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [siswaRes, kelasRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/siswa`),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kelas`)
        ]);

        const [siswaData, kelasData] = await Promise.all([siswaRes.json(), kelasRes.json()]);

        setSiswas(siswaData);
        setFilteredSiswas(siswaData);
        setKelasList(kelasData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = siswas.filter((s) =>
      s.nama_siswa.toLowerCase().includes(term) ||
      s.alamat.toLowerCase().includes(term)
    );
    setFilteredSiswas(filtered);
  };

  const handleDeleteSiswa = async (id) => {
    if (!window.confirm("Yakin ingin menghapus siswa ini?")) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/siswa/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updated = siswas.filter(s => s.id_siswa !== id);
        setSiswas(updated);
        setFilteredSiswas(updated);
        alert("Siswa berhasil dihapus.");
      } else {
        alert("Gagal menghapus siswa.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menghapus siswa.');
    }
  };

  const handleEditSiswa = (siswa) => {
    setEditSiswa(siswa);
    setPhoto(siswa.photo); // Set the photo on edit
    setPhotoPreview(siswa.photo); // Set the photo preview
  };

  const handleUpdateSiswa = async () => {
    if (!editSiswa) return;

    try {
      const formData = new FormData();
      formData.append("photo", photo);  // Append the photo if it exists
      formData.append("nama_siswa", editSiswa.nama_siswa);
      formData.append("id_kelas", editSiswa.id_kelas);
      formData.append("alamat", editSiswa.alamat);
      formData.append("tanggal_lahir", editSiswa.tanggal_lahir);
      formData.append("nisn", editSiswa.nisn);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/siswa/${editSiswa.id_siswa}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const updated = siswas.map(s =>
          s.id_siswa === editSiswa.id_siswa ? editSiswa : s
        );
        setSiswas(updated);
        setFilteredSiswas(updated);
        alert("Siswa berhasil diperbarui.");
        setEditSiswa(null);
      } else {
        alert("Gagal memperbarui siswa.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Terjadi kesalahan saat memperbarui siswa.");
    }
  };

  const getNamaKelas = (id_kelas) => {
    const kelas = kelasList.find(k => k.id_kelas === id_kelas);
    return kelas ? kelas.nama_kelas : 'Kelas tidak ditemukan';
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file)); // Update the photo preview
    }
  };

  return (
    <div className="student-page">
      <div className="student-header">
        <div className="header-text">
          <h1>Student</h1>
          <p>All Student List</p>
        </div>
        <div className="header-actions">
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#888'
            }} />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by name or address"
              className="search-input"
              style={{ paddingLeft: '2rem' }}
            />
          </div>
          <Link
            href="/dashboard/admin/users/student/add"
            className="add-new-btn"
            style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <Plus size={16} /> Add New
          </Link>
        </div>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Siswa</th>
            <th>Kelas</th>
            <th>Alamat</th>
            <th>Tanggal Lahir</th>
            <th>NISN</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {!loading && filteredSiswas.length > 0 ? (
            filteredSiswas.map((student, index) => (
              <tr key={student.id_siswa}>
                <td>
                  <div className="student-id-container">
                    <span>{index + 1}</span>
                    <div className="photo-container">
                      <Image
                        src={student.photo || baseImage} 
                        alt="student-photo"
                        className="photo-preview"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                </td>
                <td>{student.nama_siswa}</td>
                <td>{getNamaKelas(student.id_kelas)}</td>
                <td>{student.alamat}</td>
                <td>{student.tanggal_lahir}</td>
                <td>{student.nisn}</td>
                <td className="action-icons">
                  <Pencil
                    size={16}
                    title="Edit"
                    onClick={() => handleEditSiswa(student)}
                    style={{ cursor: 'pointer', marginRight: '8px' }}
                  />
                  <Trash2
                    size={16}
                    title="Delete"
                    onClick={() => handleDeleteSiswa(student.id_siswa)}
                    style={{ cursor: 'pointer', color: '#c0392b' }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">{loading ? 'Loading...' : 'No students found.'}</td>
            </tr>
          )}
        </tbody>
      </table>

      {editSiswa && (
        <div className="modal-overlay" onClick={() => setEditSiswa(null)}>
          <div className="edit-siswa-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Siswa</h3>
            <input
              type="text"
              placeholder="Student Name"
              value={editSiswa.nama_siswa}
              onChange={(e) => setEditSiswa({ ...editSiswa, nama_siswa: e.target.value })}
            />
            <select
              value={editSiswa.id_kelas}
              onChange={(e) =>
                setEditSiswa({ ...editSiswa, id_kelas: parseInt(e.target.value) })
              }
            >
              <option value="">Select Class</option>
              {kelasList.map((kelas) => (
                <option key={kelas.id_kelas} value={kelas.id_kelas}>
                  {kelas.nama_kelas}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Address"
              value={editSiswa.alamat}
              onChange={(e) => setEditSiswa({ ...editSiswa, alamat: e.target.value })}
            />
            <input
              type="date"
              value={editSiswa.tanggal_lahir}
              onChange={(e) => setEditSiswa({ ...editSiswa, tanggal_lahir: e.target.value })}
            />
            <input
              type="text"
              placeholder="NISN"
              value={editSiswa.nisn}
              onChange={(e) => setEditSiswa({ ...editSiswa, nisn: e.target.value })}
            />

            {/* Foto Edit */}
            <div className="photo-upload-container">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
                id="file-upload"
              />
              {photoPreview ? (
                <img src={photoPreview} className="photo-preview" alt="preview" />
              ) : (
                <label htmlFor="file-upload" className="photo-placeholder">
                  Unggah foto
                </label>
              )}
            </div>

            <div className="modal-actions">
              <button className="btn-rounded save-btn" onClick={handleUpdateSiswa}>
                Simpan
              </button>
              <button className="btn-rounded cancel-btn" onClick={() => setEditSiswa(null)}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
