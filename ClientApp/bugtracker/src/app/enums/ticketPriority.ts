export enum TicketPriority{
  Low,
  Medium,
  High
}

export const TicketPriorityLabeling :  Record<number, string> = {
  [TicketPriority.Low]: 'Low',
  [TicketPriority.Medium]: 'Medium',
  [TicketPriority.High]: 'High'
}
