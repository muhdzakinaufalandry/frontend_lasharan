'use client';

import { useEffect, useState } from 'react';
import '@/styles/teacher.css';

export default function AddTeacherPage() {
  const [IDUser, setIDUser] = useState('');
  const [IDMapel, setIDMapel] = useState('');
  const [namaGuru, setNamaGuru] = useState('');
  const [mataPelajaran, setMataPelajaran] = useState('');
  const [subjects, setSubjects] = useState([]);

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
    setIDMapel(selectedSubject?.id_mapel || '');
    setMataPelajaran(selectedSubject?.nama_mata_pelajaran || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newGuru = {
      id_user: parseInt(IDUser),
      id_mapel: parseInt(IDMapel),
      nama_guru: namaGuru,
      mata_pelajaran: mataPelajaran,
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
            <label>User ID *</label>
            <input
              type="text"
              placeholder="e.g. 5"
              value={IDUser}
              onChange={(e) => setIDUser(e.target.value)}
              required
            />
          </div>
          {/* <div className="form-group">
            <label>NIP *</label>
            <input
              type="text"
              placeholder="18 Digit"
              value={IDMapel}
              onChange={(e) => setIDMapel(e.target.value)}
              required
            />
          </div> */}
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
      </form>
    </div>
  );
}
