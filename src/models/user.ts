import { Bet } from './bet';
import { FieldValue } from '@firebase/firestore';
export interface User {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
  createdAt: FieldValue;
  balance: number;
  activeBets: string[];
  pastBets: Bet[];
  canHostGames: boolean;
}
