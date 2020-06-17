import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    public authentication: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authentication.login(this.loginForm.value)
      .subscribe(
        data => {
          this.loading = false;
          if (data['isValid']) {
            this.onLoginSuccess();

          } else {
            this.onLoginFailure('Something went wrong');
          }

          this.loginForm.reset();
        },
        error => {
          this.onLoginFailure(error);
          this.loading = false;
          this.loginForm.reset();
        });
  }

  onLoginSuccess() {
    this.router.navigate(['dashboard']);
  }

  onLoginFailure(error) {
    alert(error);
  }

}
