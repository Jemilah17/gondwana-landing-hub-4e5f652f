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
    id: 'jordan',
    name: 'Jordan Lee',
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
    id: 'taylor',
    name: 'Taylor Morgan',
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
  director('riley', 'Riley Chen', 'DS', 'Chairperson', 'bg-amber', ['A', 'B']),
  director('morgan', 'Morgan Reed', 'GJ', 'Managing Director', 'bg-blue', ['A', 'B', 'C', 'D', 'E']),
  director('casey', 'Casey Brooks', 'JM', 'Audit Risk & Opp Cttee', 'bg-green', ['A', 'C']),
  director('avery', 'Avery Patel', 'DN', 'Independent NED', 'bg-purple', ['A', 'D']),
  director('quinn', 'Quinn Harper', 'HG', 'Non-Executive Director', 'bg-orange', ['A', 'E']),
  director('drew', 'Drew Bennett', 'JV', 'Chief Financial Officer', 'bg-teal', ['A', 'B', 'C', 'D', 'E']),
];

export const consultants: User[] = [
  {
    id: 'consultant-1',
    name: 'External CoSec Services',
    initials: 'CS',
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
