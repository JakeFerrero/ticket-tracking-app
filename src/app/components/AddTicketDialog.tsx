'use client';

import { useEffect, useState } from 'react';
import { Person } from '../../backend/types';
import './Dialog.css';

interface AddTicketDialogProps {
  onClose: () => void;
}

export default function AddTicketDialog({ onClose }: AddTicketDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('UNASSIGNED');
  const [assigneeId, setAssigneeId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [people, setPeople] = useState<Person[]>([]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ticketData = {
      name,
      description,
      status,
      assignee: assigneeId ? people.find((p) => p.id === assigneeId) || null : null,
      due: dueDate ? new Date(dueDate) : null
    };

    try {
      const response = await fetch('http://localhost:3001/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketData)
      });

      if (response.ok) {
        onClose();
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>Add New Ticket</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="UNASSIGNED">Unassigned</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="WONT_DO">Won&apos;t Do</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="assignee">Assignee:</label>
            <select id="assignee" value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)}>
              <option value="">None</option>
              {people.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date:</label>
            <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>

          <div className="dialog-buttons">
            <button type="button" className="button button-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button">
              Add Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
