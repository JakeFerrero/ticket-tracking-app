import { updatePerson } from '@/app/api/PersonApi';
import { useState } from 'react';
import { Person } from '../../../../backend/types';
import styles from '../../sidePanel/sidePanel.module.css';
import SidePanel from '../SidePanel';

interface Props {
  person: Person;
  onUpdate: () => void;
  onClose: () => void;
}

export default function PersonSidePanel({ person, onClose, onUpdate }: Props) {
  const [name, setName] = useState(person.name);
  const [role, setRole] = useState(person.role);

  const handleSubmit = async () => {
    try {
      await updatePerson(person.id, {
        name,
        role
      });
      onUpdate();
    } catch (error) {
      console.error('Error updating person', error);
    }
  };

  const handleCancel = () => {
    // Reset all form fields to their original values
    setName(person.name);
    setRole(person.role);
  };

  const hasChanges = name !== person.name || role !== person.role;

  return (
    <SidePanel onClose={onClose} onSave={handleSubmit} onCancel={handleCancel} hasChanges={hasChanges}>
      <div className={styles.sidePanelFormGroup}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className={styles.sidePanelFormGroup}>
        <label htmlFor="role">Role:</label>
        <input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} />
      </div>
    </SidePanel>
  );
}
