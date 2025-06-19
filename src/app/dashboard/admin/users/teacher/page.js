'use client';
import React, { useEffect, useState } from 'react';
import '@/styles/teacher.css';
import Link from 'next/link';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function TeacherPage() {
  const [gurus, setGurus] = useState([]);
  const [filteredGurus, setFilteredGurus] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editGuru, setEditGuru] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const baseImage = "/logo-smas.png";

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/guru`)
      .then((response) => response.json())
      .then((data) => {
        setGurus(data);
        setFilteredGurus(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredGurus(
      gurus.filter((g) =>
        g.nama_guru.toLowerCase().includes(term) ||
        g.mata_pelajaran?.toLowerCase().includes(term)
      )
    );
  };

  const handleDeleteGuru = async (id) => {
    if (!window.confirm("Yakin ingin menghapus guru ini?")) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/guru/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updated = gurus.filter((g) => g.id_guru !== id);
        setGurus(updated);
        setFilteredGurus(updated);
        alert("Guru berhasil dihapus.");
      } else {
        alert("Gagal menghapus guru.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menghapus guru.');
    }
  };

  const handleEditGuru = (guru) => {
    setEditGuru(guru);
    setSelectedFile(null); // reset foto lama
  };

  const handleUpdateGuru = async () => {
    if (!editGuru) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/guru/${editGuru.id_guru}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editGuru),
      });

      if (response.ok) {
        // Upload foto ke endpoint S3 jika ada file yang dipilih
        if (selectedFile) {
          const formData = new FormData();
          formData.append("id_guru", editGuru.id_guru);
          formData.append("foto", selectedFile);

          const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload-foto-guru`, {
            method: "POST",
            body: formData,
          });

          if (!uploadRes.ok) {
            alert("Data guru diperbarui, tapi upload foto gagal.");
          }
        }

        const updated = gurus.map((g) =>
          g.id_guru === editGuru.id_guru ? { ...editGuru } : g
        );
        setGurus(updated);
        setFilteredGurus(updated);
        setEditGuru(null);
        alert("Guru berhasil diperbarui.");
      } else {
        alert("Gagal memperbarui guru.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Terjadi kesalahan saat memperbarui guru.");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditGuru({ ...editGuru, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="teacher-page">
      <div className="teacher-header">
        <div className="header-text">
          <h1>Guru</h1>
          <p>List Guru</p>
        </div>

        <div className="header-actions">
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by name or subject..."
              className="search-input"
              style={{ paddingLeft: '2rem' }}
            />
          </div>

          <Link href="/dashboard/admin/users/teacher/add" className="add-new-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Plus size={16} /> Tambah
          </Link>
        </div>
      </div>

      <table className="teacher-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nama Guru</th>
            <th>Mata Pelajaran</th>
            <th>NIP</th>
            <th>Alamat</th>
            <th>Email</th>
            <th>No HP</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredGurus.map((teacher, index) => (
            <tr key={teacher.id_guru}>
              <td>{index + 1}</td>
              <td>
                <Image
                  src={teacher.foto || baseImage}
                  alt={teacher.nama_guru || "Guru"}
                  className="teacher-photo"
                  width={50}
                  height={50}
                />
              </td>
              <td>{teacher.nama_guru}</td>
              <td>{teacher.mata_pelajaran}</td>
              <td>{teacher.nip}</td>
              <td>{teacher.alamat}</td>
              <td>{teacher.email}</td>
              <td>{teacher.no_telp}</td>
              <td className="action-icons">
                <Pencil
                  size={16}
                  title="Edit"
                  onClick={() => handleEditGuru(teacher)}
                  style={{ cursor: 'pointer', marginRight: '8px' }}
                />
                <Trash2
                  size={16}
                  title="Delete"
                  onClick={() => handleDeleteGuru(teacher.id_guru)}
                  style={{ cursor: 'pointer', color: '#c0392b' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editGuru && (
        <div className="edit-modal">
          <div className="modal-content">
            <h3>Edit Guru</h3>
            <div className="form-group">
              <label>Nama</label>
              <input
                type="text"
                value={editGuru.nama_guru}
                onChange={(e) => setEditGuru({ ...editGuru, nama_guru: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Mata Pelajaran</label>
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
              <label>Alamat</label>
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
              <label>No HP</label>
              <input
                type="text"
                value={editGuru.no_telp}
                onChange={(e) => setEditGuru({ ...editGuru, no_telp: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Foto</label>
              <div className="photo-upload-container" onClick={() => document.getElementById('file-upload').click()}>
                {editGuru.photo ? (
                  <img src={editGuru.photo} alt="Teacher" className="photo-preview" />
                ) : (
                  <div className="photo-placeholder">Unggah Foto</div>
                )}
                <input
                  type="file"
                  id="file-upload"
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                  accept="image/*"
                />
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-rounded save-btn" onClick={handleUpdateGuru}>
                Simpan
              </button>
              <button className="btn-rounded cancel-btn" onClick={() => setEditGuru(null)}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
