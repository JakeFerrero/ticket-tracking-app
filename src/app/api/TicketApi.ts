import { CreateTicketDto, Ticket, UpdateTicketDto } from '@/backend/types';

export async function deleteTicket(id: string): Promise<boolean> {
  const response = await fetch(`http://localhost:3001/tickets/${id}`, {
    method: 'DELETE'
  });
  return response.ok;
}

// TODO: throw on these instead of response.json
export async function getTickets(): Promise<Ticket[]> {
  const response = await fetch('http://localhost:3001/tickets');
  return response.json();
}

export async function getTicketById(id: string): Promise<Ticket> {
  const response = await fetch(`http://localhost:3001/tickets/${id}`);
  return response.json();
}

export async function createTicket(ticket: CreateTicketDto): Promise<Ticket> {
  const response = await fetch('http://localhost:3001/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ticket)
  });
  return response.json();
}

export async function updateTicket(id: string, ticket: UpdateTicketDto): Promise<Ticket> {
  const response = await fetch(`http://localhost:3001/tickets/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ticket)
  });
  return response.json();
}
