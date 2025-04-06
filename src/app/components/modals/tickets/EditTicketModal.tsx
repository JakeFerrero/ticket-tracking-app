import { getPeople } from '@/app/api/PersonApi';
import { updateTicket } from '@/app/api/TicketApi';
import { useEffect, useState } from 'react';
import { Person, Ticket, TicketStatus } from '../../../../backend/types';
import { Button, ButtonClass } from '../../buttons/Button';
import { TicketStatusMap } from '../../utils/TicketStatusMap';
import styles from '../modal.module.css';

interface EditTicketModalProps {
  ticket: Ticket;
  onClose: () => void;
}

export default function EditTicketModal({ ticket, onClose }: EditTicketModalProps) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ticketData = {
      name,
      description,
      status,
      assignee: assigneeId ? people.find((p) => p.id === assigneeId) : undefined,
      due: dueDate ? new Date(dueDate) : undefined
    };

    try {
      await updateTicket(ticket.id, ticketData);
      onClose();
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Edit Ticket</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.modalFormGroup}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className={styles.modalFormGroup}>
            <label htmlFor="description">Description:</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className={styles.modalFormGroup}>
            <label htmlFor="status">Status:</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value as TicketStatus)}>
              {Object.entries(TicketStatusMap).map(([internalStatus, displayStatus]) => (
                <option key={internalStatus} value={internalStatus}>
                  {displayStatus}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.modalFormGroup}>
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

          <div className={styles.modalFormGroup}>
            <label htmlFor="dueDate">Due Date:</label>
            <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>

          <div className={styles.modalButtons}>
            <Button buttonClass={ButtonClass.SECONDARY} text="Cancel" onClick={onClose} />
            <Button buttonClass={ButtonClass.PRIMARY} text="Save Changes" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
}
