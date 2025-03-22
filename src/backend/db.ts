import { v4 as uuid } from 'uuid';
import { CreatePersonDto, CreateTicketDto, Person, Ticket, UpdatePersonDto, UpdateTicketDto } from './types';

class Database {
  private people: Map<string, Person> = new Map();
  private tickets: Map<string, Ticket> = new Map();

  // Person operations
  getAllPeople(): Person[] {
    return Array.from(this.people.values());
  }

  getPerson(id: string): Person | undefined {
    return this.people.get(id);
  }

  createPerson(data: CreatePersonDto): Person {
    const person: Person = {
      id: uuid(),
      ...data
    };
    this.people.set(person.id, person);
    return person;
  }

  updatePerson(id: string, data: UpdatePersonDto): Person | undefined {
    const person = this.people.get(id);
    if (!person) return;

    const updatedPerson = {
      ...person,
      ...data
    };
    this.people.set(id, updatedPerson);
    return updatedPerson;
  }

  deletePerson(id: string): boolean {
    return this.people.delete(id);
  }

  // Ticket operations
  getAllTickets(): Ticket[] {
    return Array.from(this.tickets.values());
  }

  getTicket(id: string): Ticket | undefined {
    return this.tickets.get(id);
  }

  createTicket(data: CreateTicketDto): Ticket {
    const ticket: Ticket = {
      id: uuid(),
      ...data,
      status: data.status || 'UNASSIGNED'
    };
    this.tickets.set(ticket.id, ticket);
    return ticket;
  }

  updateTicket(id: string, data: UpdateTicketDto): Ticket | undefined {
    const ticket = this.tickets.get(id);
    if (!ticket) return;

    const updatedTicket = {
      ...ticket,
      ...data
    };
    this.tickets.set(id, updatedTicket);
    return updatedTicket;
  }

  deleteTicket(id: string): boolean {
    return this.tickets.delete(id);
  }
}

export const db = new Database();
