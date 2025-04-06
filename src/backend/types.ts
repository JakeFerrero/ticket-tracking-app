export interface Person {
  id: string;
  name: string;
  role: string;
}

export const TicketStatus = {
  UNASSIGNED: 'UNASSIGNED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  WONT_DO: 'WONT_DO',
} as const;
export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];

export interface Ticket {
  id: string;
  name: string;
  description: string;
  status: TicketStatus;
  assignee: Person | undefined;
  due: Date | undefined;
}

export type CreatePersonDto = Omit<Person, 'id'>;
export type UpdatePersonDto = Partial<CreatePersonDto>;

export type CreateTicketDto = Omit<Ticket, 'id'>;
export type UpdateTicketDto = Partial<Omit<Ticket, 'id'>>;
