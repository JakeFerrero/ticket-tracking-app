import { updatePerson } from '@/app/api/PersonApi';
import { useState } from 'react';
import { Person } from '../../../../backend/types';
import { Button, ButtonClass, ButtonType } from '../../buttons/Button';
import styles from '../modal.module.css';

interface EditPersonModalProps {
  person: Person;
  onClose: () => void;
}

export default function EditPersonModal({ person, onClose }: EditPersonModalProps) {
  const [name, setName] = useState(person.name);
  const [role, setRole] = useState(person.role);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePerson(person.id, {
        name,
        role
      });
      onClose();
    } catch (error) {
      console.error('Error updating person', error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Edit Person</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.modalFormGroup}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className={styles.modalFormGroup}>
            <label htmlFor="role">Role:</label>
            <input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} />
          </div>

          <div className={styles.modalButtons}>
            <Button buttonClass={ButtonClass.SECONDARY} text="Cancel" onClick={onClose} type={ButtonType.BUTTON} />
            <Button buttonClass={ButtonClass.PRIMARY} text="Save" type={ButtonType.SUBMIT} />
          </div>
        </form>
      </div>
    </div>
  );
}
