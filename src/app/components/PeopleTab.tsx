'use client';

import { useEffect, useState } from 'react';
import { Person } from '../../backend/types';
import AddPersonDialog from './AddPersonDialog';
import PersonCard from './PersonCard';

export default function PeopleTab() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await fetch('http://localhost:3001/people');
      const data = await response.json();
      setPeople(data);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  const handleAddPerson = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    fetchPeople(); // Refresh the list after adding
  };

  return (
    <div>
      <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
        <button className="button" onClick={handleAddPerson}>
          Add Person
        </button>
      </div>

      <div className="grid">
        {people.map((person) => (
          <PersonCard key={person.id} person={person} onUpdate={fetchPeople} />
        ))}
      </div>

      {isAddDialogOpen && <AddPersonDialog onClose={handleCloseDialog} />}
    </div>
  );
}
