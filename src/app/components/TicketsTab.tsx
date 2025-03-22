'use client';

import { useEffect, useState } from 'react';
import { Ticket } from '../../backend/types';
import AddTicketDialog from './AddTicketDialog';
import TicketCard from './TicketCard';

export default function TicketsTab() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch('http://localhost:3001/tickets');
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleAddTicket = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    fetchTickets(); // Refresh the list after adding
  };

  return (
    <div>
      <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
        <button className="button" onClick={handleAddTicket}>
          Add Ticket
        </button>
      </div>

      <div className="grid">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} onUpdate={fetchTickets} />
        ))}
      </div>

      {isAddDialogOpen && <AddTicketDialog onClose={handleCloseDialog} />}
    </div>
  );
}
