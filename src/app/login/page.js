'use client';

import { useState } from 'react';
import '../../styles/login.css';


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Logika login di sini (sementara console.log)
    console.log('Username:', username);
    console.log('Password:', password);
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
            type="password"
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
