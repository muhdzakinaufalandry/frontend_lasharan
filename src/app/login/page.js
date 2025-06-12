'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import '../../styles/login.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      localStorage.setItem('token', data.token);
      localStorage.setItem('id_user', data.id_user);
      localStorage.setItem('id_role', data.id_role);

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
    <div className="login-bg">
      <div className="login-card">
        <img src="/logo-smas.png" alt="Logo SMAS" className="login-logo" />
        <div className="login-title">
          SMAS Islam lasharan jaya Gowa <br />
          <span className="login-subtitle">Portal login</span>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <span className="input-icon">
              <User size={18} />
            </span>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <div className="input-group">
            <span className="input-icon">
              <Lock size={18} />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
            <span
              className="input-icon-right"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={0}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}
