/* eslint-disable */
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { scan, take, tap } from 'rxjs/operators';
import { Bet } from 'src/models/bet';
import { QueryConfig } from 'src/models/QueryConfig';
import { User } from 'src/models/user';
@Injectable({
  providedIn: 'root',
})
export class BetService {
  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  private query: QueryConfig;

  data: Observable<any>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();

  constructor(private afs: AngularFirestore) {}

  getBetsCreatedByUser(userId) {
    let betsCreatedByUser = this.afs
      .collection('bets', (ref) => ref.where('creatorId', '==', userId))
      .valueChanges();
    return betsCreatedByUser;
  }

  getBetsUserParticipatesIn(activeBets): Bet[] {
    let userBets = [];
    for (let betObj of activeBets) {
      let docId = betObj.betId;
      this.afs
        .collection('bets')
        .doc(docId)
        .valueChanges()
        .pipe(take(1))
        .subscribe((bet) => {
          userBets.push(bet);
        });
    }
    return userBets;
  }

  totalBettingAmount;
  optionOneSupporters;
  optionTwoSupporters;
  settleBet(betWinner, betId) {
    let winners;
    let bonusEarnings = 0;
    // get bet with id
    this.afs
      .collection('bets')
      .doc(betId)
      .valueChanges()
      .pipe(take(1))
      .subscribe((bet: any) => {
        const initialBettingAmount = bet.state.totalBettingAmount;
        this.totalBettingAmount = bet.state.totalBettingAmount;
        //figure out the winners
        if (betWinner === 1) {
          winners = bet.state.optionOne.supporters;
        } else if (betWinner === 2) {
          winners = bet.state.optionTwo.supporters;
        }

        //figure out their base payout
        let winnerMoneyBack = [];
        let winnerEarnings = [];
        let winnerTotalEarnings = [];
        for (let winner of winners) {
          let moneyBackForCurrentWinner = winner.amount;
          winnerMoneyBack.push(moneyBackForCurrentWinner);
          this.totalBettingAmount =
            this.totalBettingAmount - moneyBackForCurrentWinner;
        }
        // figure out their bonus payout

        // Ιf there was none on the other side, there wont be a bonus
        if (this.totalBettingAmount === 0) {
          for (let winner of winners) {
            winnerEarnings.push(0);
          }
        } else if (this.totalBettingAmount !== 0) {
          for (let winner of winners) {
            bonusEarnings = (winner.amount / initialBettingAmount) * 100;
            this.totalBettingAmount = this.totalBettingAmount - bonusEarnings;
            winnerEarnings.push(bonusEarnings);
          }
        } else {
          console.log('Major problem!!!');
        }

        // sum them up
        for (let i in winnerMoneyBack) {
          for (let j in winnerEarnings) {
            winnerTotalEarnings.push(winnerMoneyBack[i] + winnerEarnings[j]);
          }
        }

        //pay the winners
        for (let winner of winners) {
          for (let i = 0; i < 1; i++) {
            this.afs
              .collection('users')
              .doc(winner.userId)
              .valueChanges()
              .pipe(take(1))
              .subscribe((user: any) => {
                let userBalance = user.balance;
                this.afs
                  .collection('users')
                  .doc(winner.userId)
                  .set(
                    { balance: userBalance + winnerTotalEarnings[i] },
                    { merge: true }
                  );
              });
          }
        }

        setTimeout(() => {
          this.payHost(bet);
        }, 1000);

        let appPayout = this.totalBettingAmount * 0.3;
        let appBalance;
        this.afs
          .collection('app')
          .doc('appProfit')
          .valueChanges()
          .pipe(take(1))
          .subscribe((appDoc: any) => {
            appBalance = appDoc.balance;
            this.afs
              .collection('app')
              .doc('appProfit')
              .set({ balance: appBalance + appPayout }, { merge: true });
          });

        this.afs
          .collection('bet')
          .doc(betId)
          .set({ settled: true, winningOption: betWinner }, { merge: true });
      });
  }

  payHost(bet) {
    //pay the host and the app
    let hostPayout = this.totalBettingAmount * 0.7;
    this.afs
      .collection('users')
      .doc(bet.creatorId)
      .valueChanges()
      .pipe(take(1))
      .subscribe((user: any) => {
        let currentHostBalance = user.balance;
        this.afs
          .collection('users')
          .doc(bet.creatorId)
          .set({ balance: currentHostBalance + hostPayout }, { merge: true });
      });
  }

  async executeBetTransaction(
    user: User,
    bet: Bet,
    amount: number,
    option: number,
    choiceName: string
  ) {
    let betData;
    let totalBettingAmount: number = bet.state.totalBettingAmount;
    let optionOneSupportersAmount = bet.state.optionOne.supportersAmount;
    let optionTwoSupportersAmount = bet.state.optionTwo.supportersAmount;

    const alreadyExistingBets = bet.state.optionOne.supporters; // needs refresh to work
    if (user.balance < amount) {
      console.log('not enough money');
      return;
    }
    console.log('bett', user.activeBets, bet.id);
    for (let alreadyActiveBet of user.activeBets) {
      if (alreadyActiveBet === bet.id) {
        console.log('sorry you cant bet twice');
        return;
      }
    }
    console.log(totalBettingAmount, amount);
    if (option === 1) {
      betData = {
        state: {
          numberOfParticipants: (bet.state.numberOfParticipants += 1),
          totalBettingAmount: totalBettingAmount + amount,
          optionOne: {
            supporters: [
              ...alreadyExistingBets,
              { userId: user.id, amount: amount, choice: option },
            ],
            supportersAmount: (optionOneSupportersAmount += 1),
          },
        },
      };
    } else {
      betData = {
        state: {
          numberOfParticipants: (bet.state.numberOfParticipants += 1),
          totalBettingAmount: (totalBettingAmount =
            totalBettingAmount + amount),
          optionTwo: {
            supporters: [
              ...alreadyExistingBets,
              { userId: user.id, amount: amount, choice: option },
            ],
            supportersAmount: (optionTwoSupportersAmount += 1),
          },
        },
      };
    }

    const userData = {
      balance: user.balance - amount,
      activeBets: [
        ...user.activeBets,
        {
          betId: bet.id,
          amount: amount,
          choice: option,
          choiceName: choiceName,
        },
      ],
    };
    this.afs.collection('bets').doc(bet.id).set(betData, { merge: true });
    this.afs.collection('users').doc(user.id).set(userData, { merge: true });
  }

  init(path: string, field: string, opts?: any) {
    this.query = {
      path,
      field,
      limit: 5,
      reverse: false,
      prepend: false,
      ...opts,
    };

    const first = this.afs.collection(this.query.path, (ref) => {
      return ref
        .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
        .limit(this.query.limit);
    });

    this.mapAndUpdate(first);

    this.data = this._data.asObservable().pipe(
      scan((acc, val) => {
        return this.query.prepend ? val.concat(acc) : acc.concat(val);
      })
    );
  }

  more() {
    const cursor = this.getCursor();

    const more = this.afs.collection(this.query.path, (ref) => {
      return ref
        .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
        .limit(this.query.limit)
        .startAfter(cursor);
    });
    this.mapAndUpdate(more);
  }

  private getCursor() {
    const current = this._data.value;

    if (current.length) {
      return this.query.prepend
        ? current[0].doc
        : current[current.length - 1].doc;
    }
    return null;
  }

  private mapAndUpdate(col: AngularFirestoreCollection<any>) {
    if (this._done.value || this._loading.value) {
      return;
    }

    this._loading.next(true);

    return col
      .snapshotChanges()
      .pipe(
        tap((arr) => {
          let values = arr.map((snap) => {
            const data = snap.payload.doc.data();
            const doc = snap.payload.doc;
            return { ...data, doc };
          });

          values = this.query.prepend ? values.reverse() : values;

          this._data.next(values);
          this._loading.next(false);

          if (!values.length) {
            this._done.next(true);
          }
        })
      )
      .pipe(take(1))
      .subscribe();
  }
}
