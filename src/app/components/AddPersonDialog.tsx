'use client';

import { useState } from 'react';
import './Dialog.css';

interface AddPersonDialogProps {
  onClose: () => void;
}

export default function AddPersonDialog({ onClose }: AddPersonDialogProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const personData = {
      name,
      role
    };

    try {
      const response = await fetch('http://localhost:3001/people', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(personData)
      });

      if (response.ok) {
        onClose();
      }
    } catch (error) {
      console.error('Error creating person:', error);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>Add New Person</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} />
          </div>

          <div className="dialog-buttons">
            <button type="button" className="button button-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button">
              Add Person
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
