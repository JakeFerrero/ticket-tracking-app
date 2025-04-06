import { TicketStatus } from '@/backend/types';

export const TicketStatusMap = {
  [TicketStatus.UNASSIGNED]: 'Unassigned',
  [TicketStatus.IN_PROGRESS]: 'In Progress',
  [TicketStatus.COMPLETED]: 'Completed',
  [TicketStatus.WONT_DO]: "Won't Do"
} as const;
export type UserFacingTicketStatus = (typeof TicketStatusMap)[keyof typeof TicketStatusMap];

export function getUserFacingTicketStatus(status: string): UserFacingTicketStatus {
  return TicketStatusMap[status as keyof typeof TicketStatusMap] || status;
}
