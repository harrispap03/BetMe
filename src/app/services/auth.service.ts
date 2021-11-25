import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private userService: UserService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        if (user) {
          // Implement: check if the doc is in firestore if not create it
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    const isFirstTimeUser = await this.userService.isFirstTimeUser(
      credential.user.uid
    );
    if (isFirstTimeUser) {
      this.setUserDataForFirstTimeUsers(credential.user);
    }
  }

  updtateUserData(userId: string, data: any){
    console.log(userId);
    this.afs.doc(`users/${userId}`).set(data, {merge: true});
  }

  updateBetData(betId: string, data: any){
    this.afs.doc(`bets/${betId}`).set(data, {merge: true});
  }
  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  private setUserDataForFirstTimeUsers(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data = {
      id: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: user.metadata.createdAt,
      balance: 0,
      activeBets: [],
      pastBets: [],
      canHostGames: true,
    };

    return userRef.set(data, { merge: true });
  }
}
