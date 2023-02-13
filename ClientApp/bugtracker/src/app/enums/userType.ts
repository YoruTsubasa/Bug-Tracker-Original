export enum UserType{
  Admin,
  Regular,
  Blocked
}

export const UserTypeLabelMapping: Record<number, string> = {
  [UserType.Admin]: 'Admin',
  [UserType.Regular]: 'Regular',
  [UserType.Blocked]: 'Blocked'
}
