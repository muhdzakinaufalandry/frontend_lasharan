'use client';
import React, { useState, useEffect } from 'react';
import '@/styles/class.css';
import '@/styles/dashboard.css';
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function ClassPage() {
  const [kelass, setKelass] = useState([]);
  const [gurus, setGurus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editKelas, setEditKelas] = useState(null);
  const [IDGuru, setIDGuru] = useState('');
  const [namaKelas, setNamaKelas] = useState('');
  const [tahunAjaran, setTahunAjaran] = useState('');

  useEffect(() => {
    const fetchKelass = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kelas`);
        const data = await response.json();
        setKelass(data);
      } catch (error) {
        console.error("Error fetching kelas:", error);
      }
    };
    fetchKelass();
  }, []);

  useEffect(() => {
    const fetchGurus = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/guru`);
        const data = await response.json();
        setGurus(data);
      } catch (error) {
        console.error("Error fetching guru:", error);
      }
    };
    fetchGurus();
  }, []);

  const getNamaGuruById = (id) => {
    const guru = gurus.find((g) => g.id_guru === id);
    return guru ? guru.nama_guru : 'Tidak diketahui';
  };

  const handleOpen = () => {
    setShowModal(true);
    setEditKelas(null);
    setIDGuru('');
    setNamaKelas('');
    setTahunAjaran('');
  };

  const handleClose = () => {
    setShowModal(false);
    setEditKelas(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id_guru: parseInt(IDGuru),
      nama_kelas: namaKelas,
      tahun_ajaran: tahunAjaran,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kelas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const updated = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kelas`);
        const data = await updated.json();
        setKelass(data);
        alert('Kelas berhasil ditambahkan!');
        handleClose();
      } else {
        const text = await response.text();
        console.error("Response error:", text);
        alert('Gagal menambahkan kelas.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menambahkan kelas.');
    }
  };

  const handleEdit = (kelas) => {
    setEditKelas(kelas);
    setIDGuru(kelas.id_guru.toString());
    setNamaKelas(kelas.nama_kelas);
    setTahunAjaran(kelas.tahun_ajaran);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedKelas = {
      id_kelas: editKelas.id_kelas,
      id_guru: parseInt(IDGuru),
      nama_kelas: namaKelas,
      tahun_ajaran: tahunAjaran,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kelas/${editKelas.id_kelas}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedKelas),
      });

      if (response.ok) {
        const updated = await response.json();
        setKelass(kelass.map(k => (k.id_kelas === updated.id_kelas ? updated : k)));
        alert('Kelas berhasil diperbarui!');
        handleClose();
      } else {
        const text = await response.text();
        console.error("Response error:", text);
        alert('Gagal memperbarui kelas.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat memperbarui kelas.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus kelas ini?')) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kelas/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setKelass(kelass.filter(k => k.id_kelas !== id));
        alert('Kelas berhasil dihapus.');
      } else {
        alert('Gagal menghapus kelas.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menghapus kelas.');
    }
  };

  return (
    <div className="class-container">
      <div className="class-header">
        <h2>All Class List</h2>
        <button className="btn-add" onClick={handleOpen}>
          <Plus size={18} />
        </button>
      </div>

      <table className="class-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Class Name</th>
            <th>Teacher</th>
            <th>School Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {kelass.map((kelas, index) => (
            <tr key={kelas.id_kelas}>
              <td>{index + 1}</td>
              <td>{kelas.nama_kelas}</td>
              <td>{getNamaGuruById(kelas.id_guru)}</td>
              <td>{kelas.tahun_ajaran}</td>
              <td className="action-icons">
                <Pencil
                  size={16}
                  title="Edit"
                  onClick={() => handleEdit(kelas)}
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                />
                <Trash2
                  size={16}
                  title="Delete"
                  onClick={() => handleDelete(kelas.id_kelas)}
                  style={{ cursor: 'pointer', color: '#c0392b' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editKelas ? 'Edit Class' : 'Add Class'}</h3>
            <hr />
            <form onSubmit={editKelas ? handleUpdate : handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Teacher</label>
                  <select
                    value={IDGuru}
                    onChange={(e) => setIDGuru(e.target.value)}
                    required
                  >
                    <option value="">Pilih Guru</option>
                    {gurus.map((guru) => (
                      <option key={guru.id_guru} value={guru.id_guru}>
                        {guru.nama_guru}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Class</label>
                  <input
                    type="text"
                    value={namaKelas}
                    onChange={(e) => setNamaKelas(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>School Year</label>
                  <input
                    type="text"
                    value={tahunAjaran}
                    onChange={(e) => setTahunAjaran(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="button-group">
                <button type="button" onClick={handleClose} className="cancel-btn">Cancel</button>
                <button type="submit" className="save-btn">{editKelas ? 'Update' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
