export enum TicketStatus{
  Open,
  Resolved,
  InProgress
}

export const TicketStatusLabel: Record<number, string> = {
  [TicketStatus.Open]: 'Open',
  [TicketStatus.Resolved]: 'Resolved',
  [TicketStatus.InProgress]: 'In Progress'
}

