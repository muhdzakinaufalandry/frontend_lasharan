'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import '@/styles/grades.css';

export default function ParticipantsDetailsPage() {
  const { subjectId, studentId } = useParams();

  const [data, setData] = useState({ penilaian: [], total: '0.00' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idNilai, setIdNilai] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    nama_nilai: '',
    bobot: '',
    nilai: '',
  });

  const openAddModal = () => {
    setIsEditing(false);
    setFormData({ nama_nilai: '', bobot: '', nilai: '' });
    setShowModal(true);
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/nilai-detail?id_mapel=${subjectId}&id_siswa=${studentId}`);
      if (!res.ok) throw new Error('Gagal mengambil data nilai');
      const result = await res.json();
      setData(result);

      if (result.penilaian.length > 0) {
        setIdNilai(result.penilaian[0].id_nilai);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [subjectId, studentId]);

  const resetForm = () => {
    setFormData({ nama_nilai: '', bobot: '', nilai: '' });
    setIsEditing(false);
    setEditId(null);
    setShowModal(false);
  };

  const handleSubmit = async () => {
    const { nama_nilai, bobot, nilai } = formData;

    if (!nama_nilai || !bobot || !nilai) {
      alert('Mohon isi semua kolom.');
      return;
    }

  const payload = {
    id_nilai: parseInt(idNilai),         // Jika idNilai bisa string
    id_mapel: parseInt(subjectId),       // Penting: ubah ke integer
    id_siswa: parseInt(studentId),       // Penting: ubah ke integer
    nama_nilai: nama_nilai,
    nilai: parseInt(nilai),              // Sudah benar
    bobot: bobot.toString(),             // Tetap string (mis. "30%")
  };


    try {
      let res;

      if (isEditing) {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/penilaian/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error('Gagal mengedit nilai');

        const updated = await res.json();
        setData((prev) => ({
        ...prev,
        penilaian: prev.penilaian.map((item) =>
          item.id_penilaian === editId ? updated.penilaian : item
        ).filter(Boolean), // pastikan tidak ada item undefined
        total: updated.nilai?.total_nilai?.toFixed(2) || prev.total,
      }));

      } else {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/penilaian`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error('Gagal menambah nilai');

        const created = await res.json();

        // Jika id_nilai belum ada, set sekarang
        if (!idNilai && created?.penilaian?.id_nilai) {
          setIdNilai(created.penilaian.id_nilai);
        }

        setData((prev) => ({
          ...prev,
          penilaian: [...prev.penilaian, created.penilaian].filter(Boolean),
          total: created.nilai?.total_nilai?.toFixed(2) || prev.total,
        }));


      }

      // 🔁 Ambil ulang data dari backend agar pasti terupdate
        await fetchData();
        resetForm();
      } catch (err) {
        alert(err.message);
      }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus nilai ini?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/penilaian/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Gagal menghapus nilai');

      await fetchData(); // refresh data
    } catch (err) {
      alert(err.message);
    }
  };

  const openEditModal = (item) => {
    setFormData({
      nama_nilai: item.nama_nilai,
      bobot: item.bobot,
      nilai: item.nilai.toString(),
    });
    setEditId(item.id_penilaian);
    setIsEditing(true);
    setShowModal(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grade-page">
      <main className="grade-main">
        <div className="header-section">
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <button>Search by Name or roll.</button>
            <button>All Classes</button>
            <button onClick={openAddModal}>＋</button>
          </div>

          <div className="subject-header">
            <h2>Detail Nilai</h2>
            <span className="year">2024–2025</span>
          </div>
        </div>

        <section className="grade-section">
          <div className="section-header">
            <h3>Daftar Penilaian</h3>
            <button onClick={openAddModal} className="btn-add-nilai">＋ Tambah Penilaian</button>
          </div>

          <div className="grade-table-container">
            <table className="grade-table">
              <thead>
                <tr>
                  <th>Nama Nilai</th>
                  <th>Bobot</th>
                  <th>Nilai</th>
                  <th>Range</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.penilaian?.filter(Boolean).map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.nama_nilai}</td>
                    <td>{item.bobot}</td>
                    <td style={{ color: '#10B981' }}>{item.nilai}</td>
                    <td>0 - 100</td>
                    <td>
                      <button title="Edit" onClick={() => openEditModal(item)}>✏️</button>
                      <button title="Delete" onClick={() => handleDelete(item.id_penilaian)}>🗑️</button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td><strong>Course Total</strong></td>
                  <td>-</td>
                  <td style={{ color: '#0ea5e9' }}><strong>{data.total}</strong></td>
                  <td>0 - 100</td>
                  <td><button title="View">👁️</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{isEditing ? 'Edit Nilai' : 'Tambah Nilai'}</h3>
              <input
                placeholder="Nama Penilaian"
                value={formData.nama_nilai}
                onChange={(e) => setFormData({ ...formData, nama_nilai: e.target.value })}
              />
              <input
                type="text"
                placeholder="Bobot (%)"
                value={formData.bobot}
                onChange={(e) => setFormData({ ...formData, bobot: e.target.value })}
              />
              <input
                type="number"
                placeholder="Nilai"
                value={formData.nilai}
                onChange={(e) => setFormData({ ...formData, nilai: e.target.value })}
              />
              <div className="modal-actions">
                <button onClick={handleSubmit}>{isEditing ? 'Update' : 'Simpan'}</button>
                <button onClick={resetForm}>Batal</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
