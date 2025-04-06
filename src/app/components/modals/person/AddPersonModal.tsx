import { useState } from 'react';
import { createPerson } from '../../../api/PersonApi';
import { Button, ButtonClass, ButtonType } from '../../buttons/Button';
import styles from '../modal.module.css';

interface AddPersonModalProps {
  onClose: () => void;
}

export default function AddPersonModal({ onClose }: AddPersonModalProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPerson({
        name,
        role
      });
      onClose();
    } catch (error) {
      console.error('Error creating person', error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Add New Person</h2>
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
            <Button buttonClass={ButtonClass.PRIMARY} text="Add Person" type={ButtonType.SUBMIT} />
          </div>
        </form>
      </div>
    </div>
  );
}
