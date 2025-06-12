'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/datauser.css';

export default function AddUserPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    password: '',
    registrationDate: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleReset = () => {
    setForm({
      username: '',
      password: '',
      registrationDate: '',
      role: '',
    });
  };

  const handleCancel = () => {
    router.back(); // atau router.push('/dashboard/admin/users')
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Data:', form);
    router.push('/dashboard/admin/users');
  };

  return (
    <div className="user-form-container">
      <div className="form-header">
        <h2>Add User</h2>
        <div className="form-buttons">
          <button type="button" className="btn cancel" onClick={handleCancel}>Cancel</button>
          <button type="button" className="btn reset" onClick={handleReset}>Reset</button>
          <button type="submit" className="btn save" onClick={handleSubmit}>Save</button>
        </div>
      </div>

      <div className="form-section-title">User Details</div>

      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Username *</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Maria"
              required
            />
          </div>
          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Registration Date *</label>
            <input
              type="date"
              name="registrationDate"
              value={form.registrationDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Role *</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="guru">Guru</option>
              <option value="siswa">Siswa</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}
