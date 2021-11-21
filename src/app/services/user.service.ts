import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take } from 'rxjs/operators';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afs: AngularFirestore) {}

  isFirstTimeUser(userId: User['id']): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const usersRef = this.afs.collection<User>('users').doc(userId);
      let isFirstTimeUser: boolean;
      usersRef
        .get()
        .pipe(take(1))
        .subscribe((doc) => {
          if (doc.exists) {
            isFirstTimeUser = false;
          } else {
            isFirstTimeUser = true;
          }
          resolve(isFirstTimeUser);
        });
    });
  }
}
