import { createContext, useContext, useState, ReactNode } from 'react';
import { users, allUsers, User } from '../data/users';

interface UserContextType {
  activeUser: User;
  setActiveUserById: (userId: string) => void;
  canWrite: (clusterId: string) => boolean;
  canRead: (clusterId: string) => boolean;
  isDisabled: (clusterId: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [activeUser, setActiveUser] = useState<User>(users[0]);

  const setActiveUserById = (userId: string) => {
    const user = allUsers.find(u => u.id === userId);
    if (user) setActiveUser(user);
  };

  const canWrite = (clusterId: string): boolean => {
    return activeUser.writeAccess.includes(clusterId);
  };

  const canRead = (clusterId: string): boolean => {
    return activeUser.writeAccess.includes(clusterId) || activeUser.readOnly.includes(clusterId);
  };

  const isDisabled = (clusterId: string): boolean => {
    return activeUser.disabled.includes(clusterId);
  };

  return (
    <UserContext.Provider value={{ activeUser, setActiveUserById, canWrite, canRead, isDisabled }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
