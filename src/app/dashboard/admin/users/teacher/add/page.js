'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/teacher.css';

export default function AddTeacherPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    designation: '',
    fullName: '',
    email: '',
    password: '',
    subject: '',
    phone: '',
    gender: '',
    class: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data Guru:', form);
    router.push('/dashboard/admin/users/teacher');
  };

  return (
    <div className="teacher-form-container">
      <div className="form-header">
        <h2>Add Teachers</h2>
        <div className="form-buttons">
          <button className="btn cancel">cancel</button>
          <button className="btn reset">reset</button>
          <button className="btn save">save</button>
        </div>
      </div>

      <div className="form-section-title">Personal Details</div>

      <form className="teacher-form">
        <div className="form-row">
          <div className="form-group">
            <label>Name *</label>
            <input type="text" placeholder="e.g. Maria" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>User *</label>
            <select>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              </select>
          </div>
          <div className="form-group">
            <label>NIP *</label>
            <input type="text" placeholder="18 Digit" />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <select>
              <option>Subject</option>
              <option>Math</option>
              <option>Science</option>
            </select>
          </div>
        </div>

        {/* <div className="form-section-title">Login/Account Details</div>

        <div className="form-group full-width">
          <label>User Name *</label>
          <input type="text" placeholder="e.g. wilson" />
        </div>

        <div className="form-group full-width">
          <label>Password *</label>
          <input type="password" placeholder="********" />
        </div> */}
      </form>
    </div>
  )
}