export interface User {
  id: string;
  name: string;
  initials: string;
  role: string;
  avatarColor: string;
  clusters: string[];
  writeAccess: string[];
  readOnly: string[];
  disabled: string[];
}

export const users: User[] = [
  {
    id: 'fabiola',
    name: 'Fabiola Schrywer',
    initials: 'FS',
    role: 'Group Company Secretary',
    avatarColor: 'bg-orange',
    clusters: ['A', 'B', 'C', 'D', 'E'],
    writeAccess: ['A'],
    readOnly: ['B', 'C', 'D', 'E'],
    disabled: [],
  },
  {
    id: 'hilma',
    name: 'Hilma Antinda',
    initials: 'HA',
    role: 'Assistant CoSec',
    avatarColor: 'bg-green',
    clusters: ['C', 'D'],
    writeAccess: ['C', 'D'],
    readOnly: ['A'],
    disabled: ['B', 'E'],
  },
  {
    id: 'jemilah',
    name: 'Jemilah',
    initials: 'JM',
    role: 'Assistant CoSec',
    avatarColor: 'bg-blue',
    clusters: ['B', 'E'],
    writeAccess: ['B', 'E'],
    readOnly: ['A'],
    disabled: ['C', 'D'],
  },
];

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};
