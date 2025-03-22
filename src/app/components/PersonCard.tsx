'use client';

import { useState } from 'react';
import { Person } from '../../backend/types';
import EditPersonDialog from './EditPersonDialog';

interface PersonCardProps {
  person: Person;
  onUpdate: () => void;
}

export default function PersonCard({ person, onUpdate }: PersonCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this person?')) return;

    try {
      const response = await fetch(`http://localhost:3001/people/${person.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>{person.name}</h3>
      </div>

      <div className="card-content">
        <p>Role: {person.role || 'No role specified'}</p>
      </div>

      <div className="card-footer">
        <button className="button button-secondary" onClick={() => setIsEditDialogOpen(true)}>
          Edit
        </button>
        <button className="button button-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>

      {isEditDialogOpen && (
        <EditPersonDialog
          person={person}
          onClose={() => {
            setIsEditDialogOpen(false);
            onUpdate();
          }}
        />
      )}
    </div>
  );
}
