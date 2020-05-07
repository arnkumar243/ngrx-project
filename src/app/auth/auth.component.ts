import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './auth.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isErrorOccured = false;
  errorMessage: string;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwithAuthentication() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(formData: NgForm) {

    this.isErrorOccured = false;
    let authObservable: Observable<any>;

    if (this.isLoginMode) {
      authObservable = this.authenticationService.login(formData.value);
    } else {
      authObservable = this.authenticationService.signUp(formData.value);
    }
    authObservable.subscribe(response => {
      this.router.navigate(['/recipes']);
    }, error => {
      this.isErrorOccured = true;
      this.errorMessage = error;
    });
  }

}
