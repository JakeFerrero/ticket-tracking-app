'use client';

import { deleteTicket } from '@/app/api/TicketApi';
import { useState } from 'react';
import { Ticket } from '../../../backend/types';
import { Button, ButtonClass } from '../buttons/Button';
import TicketSidePanel from '../sidePanel/tickets/TicketSidePanel';
import { getUserFacingTicketStatus } from '../utils/TicketStatusMap';
import styles from './card.module.css';

interface TicketCardProps {
  ticket: Ticket;
  onUpdate: () => void;
}

export default function TicketCard({ ticket, onUpdate }: TicketCardProps) {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

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
        <p style={{ color: '#666' }}>Status: {getUserFacingTicketStatus(ticket.status)}</p>
      </div>

      <div className={styles.cardContent}>
        <p>{ticket.description || 'No description'}</p>
        <p>Due: {formatDate(ticket.due)}</p>
        <p>Assignee: {ticket.assignee?.name || 'Unassigned'}</p>
      </div>

      <div className={styles.cardFooter}>
        <Button buttonClass={ButtonClass.SECONDARY} text="Edit" onClick={() => setIsSidePanelOpen(true)} />
        <Button buttonClass={ButtonClass.ALERT} text="Delete" onClick={handleDelete} />
      </div>

      {isSidePanelOpen && (
        <TicketSidePanel
          ticket={ticket}
          onUpdate={onUpdate}
          onClose={() => {
            setIsSidePanelOpen(false);
          }}
        />
      )}
    </div>
  );
}
