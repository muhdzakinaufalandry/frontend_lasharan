'use client';

import { useEffect, useState, useRef } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import '@/styles/teacher.css';

export default function AddTeacherPage() {
  const router = useRouter();

  const [IDUser, setIDUser] = useState('');
  const [IDMapel, setIDMapel] = useState('');
  const [namaGuru, setNamaGuru] = useState('');
  const [mataPelajaran, setMataPelajaran] = useState('');
  const [nip, setNip] = useState('');
  const [alamat, setAlamat] = useState('');
  const [email, setEmail] = useState('');
  const [noTelp, setNoTelp] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [user, setUser] = useState([]);
  const [teacherPhoto, setTeacherPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`)
      .then(r => r.json())
      .then(setUser)
      .catch(() => console.error('Gagal load user'));
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/matapelajaran`)
      .then(r => r.json())
      .then(setSubjects)
      .catch(() => console.error('Gagal load mapel'));
  }, []);

  const handleSubjectChange = e => {
    const sel = subjects.find(s => s.id_mapel === +e.target.value) || {};
    setIDUser(sel.id_user ?? '');
    setIDMapel(sel.id_mapel ?? '');
    setMataPelajaran(sel.nama_mata_pelajaran ?? '');
    setNip(sel.nip ?? '');
    setAlamat(sel.alamat ?? '');
    setEmail(sel.email ?? '');
    setNoTelp(sel.no_telp ?? '');
  };

  const handlePhotoFile = file => {
    setTeacherPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handlePhotoChange = e => {
    const file = e.target.files[0];
    if (file) handlePhotoFile(file);
  };

  const handleDrop = e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handlePhotoFile(file);
  };

  const resetForm = () => {
    setIDUser(''); setIDMapel('');
    setNamaGuru(''); setMataPelajaran('');
    setNip(''); setAlamat('');
    setEmail(''); setNoTelp('');
    setTeacherPhoto(null); setPhotoPreview(null);
  };

  const handleCancel = () => {
    router.push('/dashboard/admin/users/teacher');
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const dataGuru = {
      id_user: parseInt(IDUser),
      id_mapel: parseInt(IDMapel),
      nama_guru: namaGuru,
      mata_pelajaran: mataPelajaran,
      nip,
      alamat,
      email,
      no_telp: noTelp
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/guru`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataGuru)
      });

      if (!res.ok) throw new Error(await res.text());
      const result = await res.json(); // backend harus mengembalikan id_guru

      // Upload foto jika ada
      if (teacherPhoto && result.id_guru) {
        const formData = new FormData();
        formData.append('id_guru', result.id_guru);
        formData.append('foto', teacherPhoto);

        const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload-foto-guru`, {
          method: 'POST',
          body: formData
        });

        if (!uploadRes.ok) {
          console.warn("Data guru ditambah, tapi upload foto gagal.");
          alert('Guru berhasil ditambahkan, tetapi foto gagal diunggah.');
        } else {
          alert('Guru dan foto berhasil ditambahkan!');
        }
      } else {
        alert('Guru berhasil ditambahkan!');
      }

      resetForm();
    } catch (err) {
      console.error(err);
      alert('Gagal menambahkan guru.');
    }
  };

  return (
    <div className="teacher-form-container">
      <div className="form-header">
        <h2>Tambah Guru</h2>
        <div className="form-buttons">
          <button type="button" className="btn cancel" onClick={handleCancel}>Batal</button>
          <button type="button" className="btn reset" onClick={resetForm}>Reset</button>
          <button type="submit" className="btn save" onClick={handleSubmit}>Simpan</button>
        </div>
      </div>

      <div className="form-section-title">Detail guru</div>

      <form className="teacher-form" onSubmit={handleSubmit}>
        {/* Photo Upload */}
        <div
          className="photo-upload-container"
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
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

        {/* Form Fields */}
        <div className="form-row">
          <div className="form-group">
            <label>Nama *</label>
            <input
              type="text"
              value={namaGuru}
              onChange={e => setNamaGuru(e.target.value)}
              placeholder="e.g. Maria"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Username</label>
            <select
              value={IDUser}
              onChange={e => setIDUser(e.target.value)}
              required
            >
              <option value="">Pilih User</option>
              {user.map(u =>
                <option key={u.id_user} value={u.id_user}>{u.username}</option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label>Mata Pelajaran</label>
            <select
              value={IDMapel}
              onChange={handleSubjectChange}
              required
            >
              <option value="">Pilih Mata Pelajaran</option>
              {subjects.map(s =>
                <option key={s.id_mapel} value={s.id_mapel}>{s.nama_mata_pelajaran}</option>
              )}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Alamat</label>
            <input
              type="text"
              value={alamat}
              onChange={e => setAlamat(e.target.value)}
              placeholder="e.g. Jl. Raya"
            />
          </div>
          <div className="form-group">
            <label>No HP</label>
            <input
              type="text"
              value={noTelp}
              onChange={e => setNoTelp(e.target.value)}
              placeholder="e.g. 08123456789"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>NIK</label>
            <input
              type="text"
              value={nip}
              onChange={e => setNip(e.target.value)}
              placeholder="e.g. 123456789"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. name@example.com"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
