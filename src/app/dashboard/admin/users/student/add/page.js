'use client';
import React, { useState, useEffect } from 'react';
import '@/styles/student.css';

export default function AddStudent() {
  const [idUser, setIDUser] = useState('');
  const [idKelas, setIDKelas] = useState('');
  const [kelasList, setKelasList] = useState([]);
  const [namaSiswa, setNamaSiswa] = useState('');
  const [alamat, setAlamat] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');

  useEffect(() => {
    const fetchKelas = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kelas`);
        const data = await response.json();
        setKelasList(data);
      } catch (error) {
        console.error('Gagal memuat data kelas:', error);
      }
    };

    fetchKelas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSiswa = {
      id_user: parseInt(idUser),
      id_kelas: parseInt(idKelas),
      nama_siswa: namaSiswa,
      alamat: alamat,
      tanggal_lahir: tanggalLahir,
    };

    console.log("Data yang dikirim:", newSiswa);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/siswa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSiswa),
      });

      if (response.ok) {
        alert('Siswa berhasil ditambahkan!');
        setIDUser('');
        setIDKelas('');
        setNamaSiswa('');
        setAlamat('');
        setTanggalLahir('');
      } else {
        const errorText = await response.text();
        console.error("Response error:", errorText);
        alert('Gagal menambahkan siswa. Lihat console.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan.');
    }
  };

  return (
    <div className="student-form-container">
      <h2 className="form-title">Add New Student</h2>

      <form className="student-form" onSubmit={handleSubmit}>
        <div className="section-header">
          <h3>Student Details</h3>
          <div className="form-buttons">
            <button type="button" className="btn-cancel">cancel</button>
            <button type="reset" className="btn-reset">reset</button>
            <button type="submit" className="btn-save">save</button>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              placeholder="Enter name"
              value={namaSiswa}
              onChange={(e) => setNamaSiswa(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>User ID *</label>
            <input
              type="number"
              placeholder="Enter user ID"
              value={idUser}
              onChange={(e) => setIDUser(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Birth *</label>
            <input
              type="date"
              value={tanggalLahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Address *</label>
            <input
              type="text"
              placeholder="Enter student address"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Class *</label>
            <select value={idKelas} onChange={(e) => setIDKelas(e.target.value)} required>
              <option value="">Pilih Kelas</option>
              {kelasList.map((kelas) => (
                <option key={kelas.id_kelas} value={kelas.id_kelas}>
                  {kelas.nama_kelas}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}
