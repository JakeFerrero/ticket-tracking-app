'use client';

import { getTickets } from '@/app/api/TicketApi';
import { useEffect, useState } from 'react';
import { Ticket } from '../../../backend/types';
import AddTicketModal from '../modals/tickets/AddTicketModal';
import { Button, ButtonClass } from '../buttons/Button';
import TicketCard from '../cards/TicketCard';
import styles from './page.module.css';

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // TODO: search by: title
  // TODO: filter by: status, assignee
  // TODO: sort by: Az, due date

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const tickets = await getTickets();
      setTickets(tickets);
    } catch (error) {
      // TODO: error popup
      console.error('Error fetching tickets:', error);
    }
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    fetchTickets(); // Refresh the list after adding
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <Button buttonClass={ButtonClass.PRIMARY} text="Add Ticket" onClick={() => setIsAddDialogOpen(true)} />
      </div>

      <div className={styles.pageContent}>
        <div className={styles.grid}>
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} onUpdate={fetchTickets} />
          ))}
        </div>

        {isAddDialogOpen && <AddTicketModal onClose={handleCloseDialog} />}
      </div>
    </div>
  );
}
