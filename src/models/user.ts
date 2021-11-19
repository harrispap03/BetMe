import { Bet } from './bet';

export interface User {
  id: string;
  createdAt: Date;
  email: string;
  name: string;
  surname: string;
  balance: number;
  activeBets: Bet[];
  pastBets: Bet[];
  isHost: boolean;
}
