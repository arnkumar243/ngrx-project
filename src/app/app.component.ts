import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './auth/auth.service';
import { User } from './auth/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData != null) {
      if (new Date().getTime() < userData.expiresIn) {
        this.authenticationService.userSubject.next(new User(userData.email, userData.token, userData.userId, userData.expiresIn));
      }
    }
  }

}
