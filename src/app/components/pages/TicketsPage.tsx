'use client';

import { getTickets } from '@/app/api/TicketApi';
import { useEffect, useState } from 'react';
import { Ticket } from '../../../backend/types';
import AddTicketDialog from '../AddTicketDialog';
import { Button, ButtonType } from '../buttons/Button';
import TicketCard from '../cards/TicketCard';
import styles from './page.module.css';

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const ticket = await getTickets();
      setTickets(ticket);
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
        <Button type={ButtonType.PRIMARY} text="Add Ticket" onClick={() => setIsAddDialogOpen(true)} />
      </div>

      <div className={styles.pageContent}>
        <div className={styles.grid}>
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} onUpdate={fetchTickets} />
          ))}
        </div>

        {isAddDialogOpen && <AddTicketDialog onClose={handleCloseDialog} />}
      </div>
    </div>
  );
}
