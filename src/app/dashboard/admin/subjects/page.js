'use client'

import React, { useState, useEffect } from 'react'
import '@/styles/subject.css'
import { Pencil, Trash2, Plus } from 'lucide-react'

export default function SubjectPage() {
  const [mataPelajarans, setMataPelajarans] = useState([])
  const [kelas, setKelas] = useState([])
  const [editMataPelajaran, setEditMataPelajaran] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const [IDMapel, setIDMapel] = useState('')
  const [selectedKelas, setSelectedKelas] = useState('')
  const [namaMataPelajaran, setNamaMataPelajaran] = useState('')

  useEffect(() => {
    const fetchMataPelajarans = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/matapelajaran`)
        const data = await response.json()
        setMataPelajarans(data)
      } catch (error) {
        console.error("Error fetching mata pelajaran:", error)
      } finally {
        setLoading(false)
      }
    }

    const fetchKelas = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kelas`)
        const data = await response.json()
        setKelas(data)
      } catch (error) {
        console.error("Error fetching kelas:", error)
      }
    }

    fetchMataPelajarans()
    fetchKelas()
  }, [])

  const handleOpen = () => {
    setShowModal(true)
    setEditMataPelajaran(null)
    setSelectedKelas('')
    setNamaMataPelajaran('')
  }

  const handleClose = () => {
    setShowModal(false)
    setSelectedKelas('')
    setNamaMataPelajaran('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newMataPelajaran = {
      id_kelas: parseInt(selectedKelas),
      nama_mata_pelajaran: namaMataPelajaran,
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/matapelajaran`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMataPelajaran),
      })

      if (response.ok) {
        const updated = await response.json()
        setMataPelajarans([...mataPelajarans, updated])
        alert('Mata Pelajaran berhasil ditambahkan!')
        handleClose()
      } else {
        const errorText = await response.text()
        console.error("Response error:", errorText)
        alert('Gagal menambahkan Mata Pelajaran. Lihat console.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Terjadi kesalahan.')
    }
  }

  const handleDeleteMataPelajaran = async (id) => {
    if (!window.confirm("Yakin ingin menghapus Mata Pelajaran ini?")) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/matapelajaran/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        const updated = await response.json();
        setMataPelajarans(mataPelajarans.filter(s => s.id_mapel !== id))
        alert("Mata Pelajaran berhasil dihapus.")
      } else {
        alert("Gagal menghapus mata pelajaran.")
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Terjadi kesalahan saat menghapus mata pelajaran.')
    }
  }

  const handleEditMataPelajaran = (matapelajaran) => {
    setEditMataPelajaran(matapelajaran)
    setIDMapel(matapelajaran.id_mapel.toString())
    setSelectedKelas(matapelajaran.id_kelas.toString())
    setNamaMataPelajaran(matapelajaran.nama_mata_pelajaran)
    setShowModal(true)
  }

const handleUpdateMataPelajaran = async (e) => {
  e.preventDefault(); // ⛔ KAMU HARUS TAMBAHKAN INI JIKA PAKAI <form>
  const updatedData = {
    id_kelas: parseInt(selectedKelas),
    nama_mata_pelajaran: namaMataPelajaran,
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/matapelajaran/${IDMapel}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })

    const raw = await response.text(); // 👈 ambil response sebagai teks mentah
    console.log("Raw response:", raw);

    if (response.ok) {
      const updated = JSON.parse(raw); // parsing manual supaya bisa lihat error-nya kalau gagal
      setMataPelajarans(mataPelajarans.map(m =>
        m.id_mapel === updated.id_mapel ? updated : m
      ));
      alert("Mata Pelajaran berhasil diperbarui.");
      handleClose();
    } else {
      console.error("Gagal response update:", raw);
      alert("Gagal memperbarui mata pelajaran.");
    }
  } catch (error) {
    console.error('Error catch:', error); // 💥 tampilkan error asli
    alert("Terjadi kesalahan saat memperbarui mata pelajaran.");
  }
}


  const getKelasName = (id_kelas) => {
    const kelasData = kelas.find(k => k.id_kelas === id_kelas)
    return kelasData ? kelasData.nama_kelas : "Unknown"
  }

  return (
    <div className="subject-container">
      <div className="subject-header">
        <h2>List Mata Pelajaran</h2>
        <button className="btn-add" onClick={handleOpen}>
          <Plus size={20} />
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="subject-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Kelas</th>
              <th>Nama Mata Pelajaran</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mataPelajarans.map((subj) => (
              <tr key={subj.id_mapel}>
                <td>{subj.id_mapel}</td>
                <td>{getKelasName(subj.id_kelas)}</td>
                <td>{subj.nama_mata_pelajaran}</td>
                <td className="action-icons">
                <button onClick={() => handleEditMataPelajaran(subj)} className="icon-button">
                  <Pencil size={18} />
                </button>
                <button onClick={() => handleDeleteMataPelajaran(subj.id_mapel)} className="icon-button delete">
                  <Trash2 size={18} />
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content center-modal">
            <h3>{editMataPelajaran ? "Edit Subject" : "Add New Subject"}</h3>
            <hr />

            <form onSubmit={editMataPelajaran ? handleUpdateMataPelajaran : handleSubmit}>
              <div className="form-group">
                <label>Nama Kelas</label>
                <select
                  value={selectedKelas}
                  onChange={(e) => setSelectedKelas(e.target.value)}
                  required
                >
                  <option value="">Pilih kelas</option>
                  {kelas.map((k) => (
                    <option key={k.id_kelas} value={k.id_kelas}>
                      {k.nama_kelas}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Nama Mata Pelajaran</label>
                <input
                  type="text"
                  value={namaMataPelajaran}
                  onChange={(e) => setNamaMataPelajaran(e.target.value)}
                  required
                />
              </div>

              <div className="button-group">
                <button type="button" onClick={handleClose} className="cancel-btn">batal</button>
                <button type="reset" onClick={() => {
                  setIDMapel('')
                  setSelectedKelas('')
                  setNamaMataPelajaran('')
                }} className="reset-btn">reset</button>
                <button type="submit" className="save-btn">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
