export enum TicketType{
  Bug,
  FeatureRequest
}

export const TicketTypeLabel: Record<number, string> = {
  [TicketType.Bug]: 'Bug',
  [TicketType.FeatureRequest]: 'Feature Request',
}
