'use client'
import React, { useState } from 'react'
import '@/styles/subject.css'

export default function SubjectPage() {
  const [showModal, setShowModal] = useState(false)
  const [subjects, setSubjects] = useState([
    { id: 1, code: 'SUBJ001', name: 'Mathematics' },
    { id: 2, code: 'SUBJ002', name: 'Science' },
    { id: 3, code: 'SUBJ003', name: 'English' },
  ])
  const [formData, setFormData] = useState({ code: '', name: '' })

  const handleOpen = () => setShowModal(true)
  const handleClose = () => {
    setShowModal(false)
    setFormData({ code: '', name: '' })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = () => {
    if (formData.code && formData.name) {
      setSubjects([...subjects, {
        id: subjects.length + 1,
        code: formData.code,
        name: formData.name
      }])
      handleClose()
    }
  }

  return (
    <div className="subject-container">
      <div className="subject-header">
        <h2>All Subject List</h2>
        <button className="btn-add" onClick={handleOpen}>+</button>
      </div>

      <table className="subject-table">
        <thead>
          <tr>
            <th>Subject Code</th>
            <th>Subject Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subj) => (
            <tr key={subj.id}>
              <td>{subj.code}</td>
              <td>{subj.name}</td>
              <td>
                <button>✏️</button>
                <button>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content center-modal">
            <h3>Add New Subject</h3>
            <hr />

            <div className="form-group">
              <label>Subject Code</label>
              <input
                type="text"
                name="code"
                placeholder="e.g., MATH101"
                value={formData.code}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Subject Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g., Mathematics"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="button-group">
              <button onClick={handleClose} className="cancel-btn">cancel</button>
              <button onClick={() => setFormData({ code: '', name: '' })} className="reset-btn">reset</button>
              <button onClick={handleSave} className="save-btn">save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
