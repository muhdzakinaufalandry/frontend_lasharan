'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import '@/styles/student.css';

export default function AddStudent() {
  const router = useRouter();
  const fileInputRef = useRef();

  const [idUser, setIDUser] = useState('');
  const [idKelas, setIDKelas] = useState('');
  const [kelasList, setKelasList] = useState([]);
  const [namaSiswa, setNamaSiswa] = useState('');
  const [alamat, setAlamat] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [nisn, setNISN] = useState('');
  const [noTelp, setNoTelp] = useState('');
  const [user, setUser] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`)
      .then((r) => r.json())
      .then(setUser)
      .catch(() => console.error('Gagal load user'));
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kelas`)
      .then((r) => r.json())
      .then(setKelasList)
      .catch(() => console.error('Gagal load kelas'));
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataSiswa = {
      id_user: parseInt(idUser),
      id_kelas: parseInt(idKelas),
      nama_siswa: namaSiswa,
      alamat,
      tanggal_lahir: tanggalLahir,
      nisn,
      no_telp: noTelp
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/siswa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataSiswa)
      });

      if (!res.ok) throw new Error(await res.text());
      const result = await res.json(); // harus mengembalikan id_siswa

      if (photo && result.id_siswa) {
        const formData = new FormData();
        formData.append('id_siswa', result.id_siswa);
        formData.append('foto', photo);

        const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload-foto-siswa`, {
          method: 'POST',
          body: formData
        });

        if (!uploadRes.ok) {
          alert('Siswa berhasil ditambahkan, tetapi upload foto gagal.');
        } else {
          alert('Siswa dan foto berhasil ditambahkan!');
        }
      } else {
        alert('Siswa berhasil ditambahkan!');
      }

      handleReset();
    } catch (err) {
      console.error(err);
      alert('Gagal menambahkan siswa.');
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
      router.push('/dashboard/admin/users/student');
    }
  };

  const handleReset = () => {
    setIDUser('');
    setIDKelas('');
    setNamaSiswa('');
    setAlamat('');
    setTanggalLahir('');
    setNISN('');
    setNoTelp('');
    setPhoto(null);
    setPhotoPreview(null);
  };

  return (
    <div className="student-form-container">
      <div className="form-header">
        <h2>Tambah Siswa</h2>
      </div>

      <div className="form-section-title">Detail Siswa</div>

      <form className="student-form" onSubmit={handleSubmit}>
        <div
          className="photo-upload-container"
          onClick={() => fileInputRef.current.click()}
        >
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
          />
          {photoPreview ? (
            <img src={photoPreview} className="photo-preview" alt="preview" />
          ) : (
            <div className="photo-placeholder">
              <Plus size={32} />
              <span>Unggah Foto</span>
            </div>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Nama *</label>
            <input
              type="text"
              placeholder="Enter name"
              value={namaSiswa}
              onChange={(e) => setNamaSiswa(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Username</label>
            <select value={idUser} onChange={(e) => setIDUser(e.target.value)} required>
              <option value="">Pilih Username</option>
              {user.map((user) => (
                <option key={user.id_user} value={user.id_user}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Kelas *</label>
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

        <div className="form-row">
          <div className="form-group">
            <label>Alamat</label>
            <input
              type="text"
              placeholder="Enter student address"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Tanggal Lahir *</label>
            <input
              type="date"
              value={tanggalLahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>NISN</label>
            <input
              type="text"
              placeholder="Enter NISN"
              value={nisn}
              onChange={(e) => setNISN(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>No Telp</label>
            <input
              type="text"
              placeholder="Enter no telp"
              value={noTelp}
              onChange={(e) => setNoTelp(e.target.value)}
            />
          </div>
        </div>

        <div className="form-footer-buttons">
          <button
            type="button"
            className="btn cancel"
            onClick={handleCancel}
          >
            Batal
          </button>
          <button
            type="button"
            className="btn reset"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn save"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
