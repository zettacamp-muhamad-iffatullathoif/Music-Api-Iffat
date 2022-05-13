import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { SubSink } from 'subsink';

interface Payload {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  private subs = new SubSink();
  loginForm!: FormGroup;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmitLogin() {
    this.isLoading = true;
    const payload: Payload = this.loginForm.value;
    this.subs.sink = this.loginService
      .loginUser(payload.email, payload.password)
      .subscribe((resp) => {
        this.isLoading = false;
        console.log(resp);
        if (resp) {
          this.router.navigate(['/song']);
        }
      });

    // this.router.navigate(['/song']);
  }
}
