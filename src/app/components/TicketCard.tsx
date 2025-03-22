'use client';

import { useState } from 'react';
import { Ticket } from '../../backend/types';
import EditTicketDialog from './EditTicketDialog';

interface TicketCardProps {
  ticket: Ticket;
  onUpdate: () => void;
}

export default function TicketCard({ ticket, onUpdate }: TicketCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;

    try {
      const response = await fetch(`http://localhost:3001/tickets/${ticket.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>{ticket.name}</h3>
        <div style={{ color: '#666' }}>Status: {ticket.status}</div>
      </div>

      <div className="card-content">
        <p>{ticket.description || 'No description'}</p>
        <p>Due: {formatDate(ticket.due)}</p>
        <p>Assignee: {ticket.assignee?.name || 'Unassigned'}</p>
      </div>

      <div className="card-footer">
        <button className="button button-secondary" onClick={() => setIsEditDialogOpen(true)}>
          Edit
        </button>
        <button className="button button-delete" onClick={handleDelete}>
          Delete
        </button>
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
