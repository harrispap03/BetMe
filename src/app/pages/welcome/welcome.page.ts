import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  constructor(public auth: AuthService, private router: Router) {
    if(!this.auth.user$){
      this.router.navigate(['bets']);
      console.log('navigating');
    }
  }

  ngOnInit() {}

  takeAlook() {
    this.router.navigate(['bets']);
  }

  signUp() {
    this.router.navigate(['user-profile']);
  }
}
