import { Ticket } from '@/backend/types';

export async function deleteTicket(id: string): Promise<boolean> {
  const response = await fetch(`http://localhost:3001/tickets/${id}`, {
    method: 'DELETE'
  });
  return response.ok;
}

export async function getTickets(): Promise<Ticket[]> {
  const response = await fetch('http://localhost:3001/tickets');
  return response.json();
}

export async function getTicketById(id: string): Promise<Ticket> {
  const response = await fetch(`http://localhost:3001/tickets/${id}`);
  return response.json();
}

export async function createTicket(ticket: Ticket): Promise<Ticket> {
  const response = await fetch('http://localhost:3001/tickets', {
    method: 'POST',
    body: JSON.stringify(ticket)
  });
  return response.json();
}

export async function updateTicket(ticket: Ticket): Promise<Ticket> {
  const response = await fetch(`http://localhost:3001/tickets/${ticket.id}`, {
    method: 'PUT',
    body: JSON.stringify(ticket)
  });
  return response.json();
}
