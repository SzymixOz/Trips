import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private formBuilder: FormBuilder, private auth: AuthService) { }
  
    loginForm!: FormGroup;
    showError: boolean = false;
    showOk: boolean = false;
    showLoader: boolean = false;
  
    ngOnInit(): void {  
        this.loginForm = this.formBuilder.group({
        login: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        });
    }
  
    submitForm(){
        if (!this.loginForm.valid) {
            this.showError = true;
            this.showLoader = false;
            return;
        }
        this.showLoader = true;
        this.showError = false;
        this.auth.signInEmailPass(this.loginForm.get('login')!.value,  this.loginForm.get('password')!.value);
        this.loginForm.reset();
        this.showLoader = false;
    }

}
