import { getPeople } from '@/app/api/PersonApi';
import { updateTicket } from '@/app/api/TicketApi';
import { useEffect, useState } from 'react';
import { Person, Ticket, TicketStatus } from '../../../../backend/types';
import styles from '../../sidePanel/sidePanel.module.css';
import { TicketStatusMap } from '../../utils/TicketStatusMap';
import SidePanel from '../SidePanel';

interface Props {
  ticket: Ticket;
  onUpdate: () => void;
  onClose: () => void;
}

export default function TicketSidePanel({ ticket, onClose, onUpdate }: Props) {
  const [name, setName] = useState(ticket.name);
  const [description, setDescription] = useState(ticket.description);
  const [status, setStatus] = useState(ticket.status);
  const [assigneeId, setAssigneeId] = useState(ticket.assignee?.id || '');
  const [dueDate, setDueDate] = useState(ticket.due ? new Date(ticket.due).toISOString().split('T')[0] : '');
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    fetchPeople();
  }, []);

  // TODO: for tickets, we should cache people with a ttl. An api call every time you do
  // anything with a ticket is bad.
  const fetchPeople = async () => {
    try {
      const response = await getPeople();
      setPeople(response);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  const handleSubmit = async () => {
    const ticketData = {
      name,
      description,
      status,
      assignee: assigneeId ? people.find((p) => p.id === assigneeId) : undefined,
      due: dueDate ? new Date(dueDate) : undefined
    };

    try {
      await updateTicket(ticket.id, ticketData);
      onUpdate();
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const handleCancel = () => {
    // Reset all form fields to their original values
    setName(ticket.name);
    setDescription(ticket.description);
    setStatus(ticket.status);
    setAssigneeId(ticket.assignee?.id || '');
    setDueDate(ticket.due ? new Date(ticket.due).toISOString().split('T')[0] : '');
  };

  const hasChanges =
    name !== ticket.name ||
    description !== ticket.description ||
    status !== ticket.status ||
    assigneeId !== (ticket.assignee?.id || '') ||
    dueDate !== (ticket.due ? new Date(ticket.due).toISOString().split('T')[0] : '');

  return (
    <SidePanel onClose={onClose} onSave={handleSubmit} onCancel={handleCancel} hasChanges={hasChanges}>
      <div className={styles.sidePanelFormGroup}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className={styles.sidePanelFormGroup}>
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className={styles.sidePanelFormGroup}>
        <label htmlFor="status">Status:</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value as TicketStatus)}>
          {Object.entries(TicketStatusMap).map(([internalStatus, displayStatus]) => (
            <option key={internalStatus} value={internalStatus}>
              {displayStatus}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.sidePanelFormGroup}>
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

      <div className={styles.sidePanelFormGroup}>
        <label htmlFor="dueDate">Due Date:</label>
        <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>
    </SidePanel>
  );
}
