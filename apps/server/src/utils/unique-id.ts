import { v4 as v4uuid } from 'uuid';

export const generateUniqueId = (): string => {
  return v4uuid();
};
