'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/login.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        alert('Login gagal. Periksa kembali username dan password.');
        return;
      }

      const data = await res.json();

      // Simpan ke localStorage
      localStorage.setItem('token', data.token); // dummy-token
      localStorage.setItem('id_user', data.id_user);
      localStorage.setItem('id_role', data.id_role);

      // Redirect berdasarkan id_role
      if (data.id_role == 1) {
        router.push('/dashboard/admin');
      } else if (data.id_role == 2) {
        router.push('/dashboard/Teacher');
      } else if (data.id_role == 3) {
        router.push('/dashboard/Student');
      } else {
        console.error("Role tidak dikenali:", data.id_role);
        alert("Role tidak dikenali. Hubungi admin.");
      }

    } catch (error) {
      console.error('Terjadi kesalahan saat login:', error);
      alert('Terjadi kesalahan saat login.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/logo-smas.png" alt="Logo SMAS" className="login-logo" />
        <h1 className="login-title">SMAS Islam lasharan jaya Gowa 
          Portal login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Masuk</button>
        </form>
      </div>
    </div>
  );
}
