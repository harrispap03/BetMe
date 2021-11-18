import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: 'userProfile.page.html',
  styleUrls: ['userProfile.page.scss'],
})
export class UserProfilePage {
  constructor(public auth: AuthService) {}
}
