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
  type: 'cosec' | 'director';
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
    type: 'cosec',
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
    type: 'cosec',
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
    type: 'cosec',
  },
];

const director = (
  id: string,
  name: string,
  initials: string,
  role: string,
  avatarColor: string,
  clusters: string[],
): User => ({
  id,
  name,
  initials,
  role,
  avatarColor,
  clusters,
  writeAccess: [],
  readOnly: clusters,
  disabled: ['A', 'B', 'C', 'D', 'E'].filter((c) => !clusters.includes(c)),
  type: 'director',
});

export const directors: User[] = [
  director('dave', 'Dave Smuts', 'DS', 'Chairperson', 'bg-amber', ['A', 'B']),
  director('gys', 'Gys Joubert', 'GJ', 'Managing Director', 'bg-blue', ['A', 'B', 'C', 'D', 'E']),
  director('james', 'James Mnyupe', 'JM', 'Audit Risk & Opp Cttee', 'bg-green', ['A', 'C']),
  director('davidn', 'David Namalenga', 'DN', 'Independent NED', 'bg-purple', ['A', 'D']),
  director('hannes', 'Hannes Gouws', 'HG', 'Non-Executive Director', 'bg-orange', ['A', 'E']),
  director('jaco', 'Jaco Visser', 'JV', 'Chief Financial Officer', 'bg-teal', ['A', 'B', 'C', 'D', 'E']),
];

export const allUsers: User[] = [...users, ...directors];

export const getUserById = (id: string): User | undefined => {
  return allUsers.find(user => user.id === id);
};
