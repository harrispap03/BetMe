import { User } from './user';

export interface Bet {
  id?: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  endingAt?: Date;
  settled: boolean;
  state: BetState;
}
export interface BetState {
  numberOfParticipants: number;
  optionOneName: InFavorBet;
  optionTwoName: AgainstBet;
}

export interface InFavorBet {
  optionOneSupportersAmount: number;
  optionOneSupporters: User['id'][];
}

export interface AgainstBet {
  optionTwoSupportersAmount: number;
  optionTwoSupporters: User['id'][];
}
