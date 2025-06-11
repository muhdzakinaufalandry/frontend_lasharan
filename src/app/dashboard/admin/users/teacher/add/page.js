'use client';

import { useEffect, useState } from 'react';
import '@/styles/teacher.css';

export default function AddTeacherPage() {
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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Gagal memuat data user:', error);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/matapelajaran`);
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error('Gagal memuat data mata pelajaran:', error);
      }
    };

    fetchSubjects();
  }, []);


  const handleSubjectChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const selectedSubject = subjects.find((s) => s.id_mapel === selectedId);
    setIDUser(selectedSubject?.id_user || '');
    setIDMapel(selectedSubject?.id_mapel || '');
    setMataPelajaran(selectedSubject?.nama_mata_pelajaran || '');
    setNip(selectedSubject?.nip || '');
    setAlamat(selectedSubject?.alamat || '');
    setEmail(selectedSubject?.email || '');
    setNoTelp(selectedSubject?.no_telp || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newGuru = {
      id_user: parseInt(IDUser),
      id_mapel: parseInt(IDMapel),
      nama_guru: namaGuru,
      mata_pelajaran: mataPelajaran,
      nip: nip,
      alamat: alamat,
      email: email,
      no_telp: noTelp
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/guru`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGuru),
      });

      if (response.ok) {
        alert('Guru berhasil ditambahkan!');
        setIDUser('');
        setIDMapel('');
        setNamaGuru('');
        setMataPelajaran('');
        setNip('');
        setAlamat('');
        setEmail('');
        setNoTelp('');
      } else {
        const err = await response.text();
        console.error('Gagal:', err);
        alert('Gagal menambahkan guru.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan.');
    }
  };

  return (
    <div className="teacher-form-container">
      <div className="form-header">
        <h2>Add Teachers</h2>
        <div className="form-buttons">
          <button className="btn cancel">cancel</button>
          <button className="btn reset" type="reset">reset</button>
          <button className="btn save" type="submit" onClick={handleSubmit}>save</button>
        </div>
      </div>

      <div className="form-section-title">Personal Details</div>

      <form className="teacher-form">
        <div className="form-row">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              placeholder="e.g. Maria"
              value={namaGuru}
              onChange={(e) => setNamaGuru(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Username</label>
            <select
              value={IDUser}
              onChange={(e) => setIDUser(e.target.value)}
              required
            >
              <option value="">Pilih User</option>
              {user.map((u) => (
                <option key={u.id_user} value={u.id_user}>
                  {u.username}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Subject</label>
            <select
              value={IDMapel}
              onChange={handleSubjectChange}
              required
            >
              <option value="">Pilih Mata Pelajaran</option>
              {subjects.map((subject) => (
                <option key={subject.id_mapel} value={subject.id_mapel}>
                  {subject.nama_mata_pelajaran}
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
              placeholder="e.g. Jl. Raya"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="e.g. 08123456789"
              value={noTelp}
              onChange={(e) => setNoTelp(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>NIK</label>
            <input
              type="text"
              placeholder="e.g. 123456789"
              value={nip}
              onChange={(e) => setNip(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="e.g. 1x7oO@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
