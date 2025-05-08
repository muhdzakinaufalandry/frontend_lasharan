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
          <button className="btn cancel">cancel</button>
          <button className="btn reset">reset</button>
          <button className="btn save" onClick={handleSubmit}>save</button>
        </div>
      </div>

      <div className="form-section-title">User Details</div>

      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>User *</label>
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
            <select>
              <option>A</option>
              <option>B</option>
              </select>
          </div>
        </div>
      </form>
    </div>
  );
}
