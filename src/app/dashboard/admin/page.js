'use client';
import React, { useState, useEffect } from 'react';
import '@/styles/dashboard.css';

export default function AdminDashboard() {
  const [gurus, setGurus] = useState([]);  // State untuk guru
  const [siswas, setSiswas] = useState([]);  // State untuk siswa
  const [kelass, setKelass] = useState([]);  // State untuk kelas
  const [loading, setLoading] = useState(true);  // State untuk loading

  // Fetch data guru
  useEffect(() => {
    const fetchGurus = async () => {
      try {
        const response = await fetch('http://localhost:8080/guru');
        const data = await response.json();
        setGurus(data);
      } catch (error) {
        console.error("Error fetching guru:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGurus();
  }, []);

  // Fetch data siswa
  useEffect(() => {
    const fetchSiswas = async () => {
      try {
        const response = await fetch('http://localhost:8080/siswa');
        const data = await response.json();
        setSiswas(data);
      } catch (error) {
        console.error("Error fetching siswa:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSiswas();
  }, []);

  // Fetch data kelas
  useEffect(() => {
    const fetchKelass = async () => {
      try {
        const response = await fetch('http://localhost:8080/kelas');
        const data = await response.json();
        setKelass(data);
      } catch (error) {
        console.error("Error fetching kelas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKelass();
  }, []);

  return (
    <div className="dashboard-container">
      <main className="dashboard-content">
        <div className="dashboard-top">
          <div className="dashboard-header">
            <h1>Welcome, Admin Higher Secondary School Team!</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices nunc sed,
              pharetra ante. Quisque gravida facilisis dui.
            </p>
          </div>

          <div className="info-cards">
            <div className="info-card yellow">
              <h2>Students</h2>
              <p>{siswas.length}</p> {/* Menampilkan jumlah siswa */}
            </div>
            <div className="info-card purple">
              <h2>Teachers</h2>
              <p>{gurus.length}</p> {/* Menampilkan jumlah guru */}
            </div>
            <div className="info-card yellow">
              <h2>Class</h2>
              <p>{kelass.length}</p> {/* Menampilkan jumlah kelas */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
