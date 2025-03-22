export interface Person {
  id: string;
  name: string;
  role: string;
}

export interface Ticket {
  id: string;
  name: string;
  description: string;
  status: 'UNASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'WONT_DO';
  assignee: Person | undefined;
  due: Date | undefined;
}

export type CreatePersonDto = Omit<Person, 'id'>;
export type UpdatePersonDto = Partial<CreatePersonDto>;

export type CreateTicketDto = Omit<Ticket, 'id'>;
export type UpdateTicketDto = Partial<Omit<Ticket, 'id'>>;
