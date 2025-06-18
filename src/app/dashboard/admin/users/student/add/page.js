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
      setPhotoPreview(URL.createObjectURL(file)); // Display photo preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (photo) formData.append('photo', photo);
    formData.append('id_user', idUser);
    formData.append('id_kelas', idKelas);
    formData.append('nama_siswa', namaSiswa);
    formData.append('alamat', alamat);
    formData.append('tanggal_lahir', tanggalLahir);
    formData.append('nisn', nisn);
    formData.append('no_telp', noTelp);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/siswa`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error(await res.text());
      alert('Siswa berhasil ditambahkan!');
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
        <h2>Add New Student</h2>
      </div>

      <div className="form-section-title">Student Detail</div>

      <form className="student-form" onSubmit={handleSubmit}>
        {/* Photo Upload */}
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
          {photoPreview
            ? <img src={photoPreview} className="photo-preview" alt="preview" />
            : (
              <div className="photo-placeholder">
                <Plus size={32} />
                <span>Upload Photo</span>
              </div>
            )
          }
        </div>

        {/* Form Fields */}
        <div className="form-row">
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

        <div className="form-row">
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter student address"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
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
        </div>

        {/* Footer Buttons */}
        <div className="form-footer-buttons">
          <button
            type="button"
            className="btn cancel"
            onClick={handleCancel}
          >
            cancel
          </button>
          <button
            type="button"
            className="btn reset"
            onClick={handleReset}
          >
            reset
          </button>
          <button
            type="submit"
            className="btn save"
          >
            save
          </button>
        </div>
      </form>
    </div>
  );
}
