'use client';

import { useState } from 'react';
import { Ticket } from '../../../backend/types';
import EditTicketDialog from '../EditTicketDialog';
import { deleteTicket } from '@/app/api/TicketApi';
import { ButtonType } from '../buttons/Button';
import { Button } from '../buttons/Button';
import styles from './card.module.css';

interface TicketCardProps {
  ticket: Ticket;
  onUpdate: () => void;
}

export default function TicketCard({ ticket, onUpdate }: TicketCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;

    try {
      const success = await deleteTicket(ticket.id);
      if (success) onUpdate();
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{ticket.name}</h3>
        <div style={{ color: '#666' }}>Status: {ticket.status}</div>
      </div>

      <div className={styles.cardContent}>
        <p>{ticket.description || 'No description'}</p>
        <p>Due: {formatDate(ticket.due)}</p>
        <p>Assignee: {ticket.assignee?.name || 'Unassigned'}</p>
      </div>

      <div className={styles.cardFooter}>
        <Button type={ButtonType.SECONDARY} text="Edit" onClick={() => setIsEditDialogOpen(true)} />
        <Button type={ButtonType.ALERT} text="Delete" onClick={handleDelete} />
      </div>

      {isEditDialogOpen && (
        <EditTicketDialog
          ticket={ticket}
          onClose={() => {
            setIsEditDialogOpen(false);
            onUpdate();
          }}
        />
      )}
    </div>
  );
}
