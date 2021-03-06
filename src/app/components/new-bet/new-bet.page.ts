import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/compat/app';
import { AlertController } from '@ionic/angular';
import { present } from '@ionic/core/dist/types/utils/overlays';

@Component({
  selector: 'app-new-bet',
  templateUrl: './new-bet.page.html',
  styleUrls: ['./new-bet.page.scss'],
})
export class NewBetPage implements OnInit {
  user;
  myForm: FormGroup;
  loading = false;
  success = false;
  constructor(
    private modalController: ModalController,
    public alertController: AlertController,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private authService: AuthService
  ) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      id: '',
      description: new FormControl('', Validators.required),
      creator: '',
      creatorId: '',
      creatorProfilePicURL: '',
      createdAt: '',
      optionOneName: new FormControl('', Validators.required),
      optionTwoName: new FormControl('', Validators.required),
      settled: false,
      state: {
        numberOfParticipants: 0,
        totalBettingAmount: 0,
        optionOne: {
          supportersAmount: 0,
          supporters: [],
        },
        optionTwo: {
          supportersAmount: 0,
          supporters: [],
        },
      },
    });
  }

  cancel() {
    this.modalController.dismiss();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Invalid Data',
      subHeader: 'All fields are mandatory',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async submitHandler() {
    if (this.myForm.invalid) {
      this.presentAlert();
      return;
    }
    this.loading = true;

    this.myForm.patchValue({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    this.myForm.patchValue({
      creatorId: this.user.id,
    });

    this.myForm.patchValue({
      creator: this.user.displayName,
    });

    this.myForm.patchValue({
      creatorProfilePicURL: this.user.photoURL,
    });

    const formValue = this.myForm.value;

    try {
      await this.afs
        .collection('bets')
        .add(formValue)
        .then((document) => {
          this.afs.collection('bets').doc(document.id).set(
            {
              id: document.id,
            },
            { merge: true }
          );
        });
      this.success = true;
    } catch (err) {
      console.log(err);
    }

    this.loading = false;
    this.cancel();
  }
}
