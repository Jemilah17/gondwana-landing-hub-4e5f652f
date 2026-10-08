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
  type: 'cosec' | 'director' | 'consultant';
}

export const users: User[] = [
  {
    id: 'alex',
    name: 'Alex Reyes',
    initials: 'AR',
    role: 'Group Company Secretary',
    avatarColor: 'bg-orange',
    clusters: ['A', 'B', 'C', 'D', 'E'],
    writeAccess: ['A'],
    readOnly: ['B', 'C', 'D', 'E'],
    disabled: [],
    type: 'cosec',
  },
  {
    id: 'jordan',
    name: 'Jordan Lee',
    initials: 'JL',
    role: 'Assistant CoSec',
    avatarColor: 'bg-green',
    clusters: ['C', 'D'],
    writeAccess: ['C', 'D'],
    readOnly: ['A'],
    disabled: ['B', 'E'],
    type: 'cosec',
  },
  {
    id: 'taylor',
    name: 'Taylor Morgan',
    initials: 'TM',
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
  director('riley', 'Riley Chen', 'RC', 'Chairperson', 'bg-amber', ['A', 'B']),
  director('morgan', 'Morgan Reed', 'MR', 'Managing Director', 'bg-blue', ['A', 'B', 'C', 'D', 'E']),
  director('casey', 'Casey Brooks', 'CB', 'Audit Risk & Opp Cttee', 'bg-green', ['A', 'C']),
  director('avery', 'Avery Patel', 'AP', 'Independent NED', 'bg-purple', ['A', 'D']),
  director('quinn', 'Quinn Harper', 'QH', 'Non-Executive Director', 'bg-orange', ['A', 'E']),
  director('drew', 'Drew Bennett', 'DB', 'Chief Financial Officer', 'bg-teal', ['A', 'B', 'C', 'D', 'E']),
];

export const consultants: User[] = [
  {
    id: 'consultant-1',
    name: 'External CoSec Services',
    initials: 'EC',
    role: 'Company Secretarial Consultant',
    avatarColor: 'bg-slate',
    clusters: ['A', 'B', 'C', 'D', 'E'],
    writeAccess: [],
    readOnly: [],
    disabled: [],
    type: 'consultant',
  },
];

export const allUsers: User[] = [...users, ...directors, ...consultants];

export const getUserById = (id: string): User | undefined => {
  return allUsers.find(user => user.id === id);
};
