import { User } from './user';

export interface Bet {
  id: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  endingAt: Date;
  settled: boolean;
  state: BetState;
}
export interface BetState {
  numberOfParticipants: number;
  inFavor: InFavorBet;
  against: AgainstBet;
}

export interface InFavorBet {
  inFavorAmount: number;
  inFavor: User['id'][];
}

export interface AgainstBet {
  againstAmount: number;
  against: User['id'][];
}
