import { User } from './user';

export interface Bet {
  id: string;
  description: string;
  creator: string;
  creatorProfilePicURL: string;
  createdAt: Date;
  endingAt?: Date;
  settled: boolean;
  state: BetState;
}
export interface BetState {
  numberOfParticipants: number;
  optionOne: InFavorBet;
  optionTwo: AgainstBet;
}

export interface InFavorBet {
  supportersAmount: number;
  supporters: BetMade[];
}

export interface AgainstBet {
  supportersAmount: number;
  supporters: BetMade;
}

export interface BetMade {
  userId: string;
  amount: number;
}
