import { v4 as uuidV4 } from 'uuid';

export const getRandomLink = () => {
  const uid = uuidV4();
  return `${uid.substring(0, 4)}-${uid.substring(5, 8)}`; // euee-3e3e
};
