'use client';

import { deletePerson } from '@/app/api/PersonApi';
import { useState } from 'react';
import { Person } from '../../../backend/types';
import EditPersonDialog from '../EditPersonDialog';
import styles from './card.module.css';
import { Button, ButtonType } from '../buttons/Button';

interface PersonCardProps {
  person: Person;
  onUpdate: () => void;
}

export default function PersonCard({ person, onUpdate }: PersonCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this person?')) return;

    try {
      const success = await deletePerson(person.id);
      if (success) onUpdate();
    } catch (error) {
      // TODO: display an error alert
      console.error('Error deleting person:', error);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{person.name}</h3>
      </div>

      <div className={styles.cardContent}>
        <p>Role: {person.role || 'No role specified'}</p>
      </div>

      <div className={styles.cardFooter}>
        <Button type={ButtonType.SECONDARY} text="Edit" onClick={() => setIsEditDialogOpen(true)} />
        <Button type={ButtonType.ALERT} text="Delete" onClick={handleDelete} />
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
