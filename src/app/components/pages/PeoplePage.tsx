'use client';

import { useEffect, useState } from 'react';
import { Person } from '../../../backend/types';
import { getPeople } from '../../api/PersonApi';
import AddPersonDialog from '../AddPersonDialog';
import { Button, ButtonType } from '../buttons/Button';
import PersonCard from '../cards/PersonCard';
import styles from './page.module.css';

export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const ppl = await getPeople();
      setPeople(ppl);
    } catch (error) {
      // TODO: error popup
      console.error('Error fetching people:', error);
    }
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    fetchPeople(); // Refresh the list after adding
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <Button type={ButtonType.PRIMARY} text="Add Person" onClick={() => setIsAddDialogOpen(true)} />
      </div>

      <div className={styles.pageContent}>
        <div className={styles.grid}>
          {people.map((person) => (
            <PersonCard key={person.id} person={person} onUpdate={fetchPeople} />
          ))}
        </div>

        {isAddDialogOpen && <AddPersonDialog onClose={handleCloseDialog} />}
      </div>
    </div>
  );
}
