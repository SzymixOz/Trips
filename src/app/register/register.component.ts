import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private auth: AuthService) {}
  
    regForm!: FormGroup;
    showError: boolean = false;
    showOk: boolean = false;

    ngOnInit(): void {
        this.regForm = this.formBuilder.group({
            login: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }
  
    submitForm() {
        if (!this.regForm.valid) {
            this.showError = true;
            return;
        }
        this.showError = false;
        this.auth.registerEmailPass(this.regForm.get('login')!.value, this.regForm.get('password')!.value);
        this.regForm.reset();
    }

}
