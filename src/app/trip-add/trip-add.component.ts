import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Trip } from '../interfaces/Trip'
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-trip-add',
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.css']
})
export class TripAddComponent implements OnInit {
    
    tripAddForm!: FormGroup;
 
    constructor(private formBuilder: FormBuilder, private fb: FirebaseService) {}
    
    today = new Date();
    d = this.today.getDate();
    m = this.today.getMonth() + 1; 
    y = this.today.getFullYear();
    dd!: string;
    mm!: string;
    todayFormated!: string;   

    ngOnInit() : void {
        if (this.d < 10) {
            this.dd = '0' + String(this.d);
        }
        else  this.dd = String(this.d);
        if (this.m < 10) {
            this.mm = '0' + String(this.m);
        }
        else  this.mm = String(this.m);
        this.todayFormated = String(this.y) + '-' + this.mm + '-' + this.dd;

        this.tripAddForm = this.formBuilder.group({
            tripName: ['', Validators.required],
            tripCountry: ['', Validators.required],
            tripStartDate: ['', Validators.required,],
            tripEndDate: ['', Validators.required],
            tripPrice: new FormControl('', [Validators.required, Validators.pattern('[0-9]*.?[0-9]+')]),
            // tripPrice: ['', Validators.required, Validators.pattern(/^[0-9]\d*$/)],
            // tripCurrency: ['', Validators.required],
            tripQuantity: new FormControl('', [Validators.required, Validators.pattern('[0-9]*.?[0-9]+')]),
            // tripQuantity:  ['', Validators.required, Validators.pattern(/^[0-9]\d*$/)],
            // tripRate:  ['', Validators.required, Validators.pattern('[1-5]')],
            tripDescription: ['', Validators.required],
            tripImageLink: ['', Validators.required]
        });
    }
      

    showError = false;
    showOk = false;

    submitForm() {
        // console.log(this.tripAddForm);
        // console.log(this.tripAddForm.valid);
        if (!this.tripAddForm.valid) {
            this.showError = true;
            return;
        }
        
        let newTrip = {
            name: this.tripAddForm.get('tripName')!.value,
            country: this.tripAddForm.get('tripCountry')!.value,
            startDate: this.tripAddForm.get('tripStartDate')!.value,
            endDate: this.tripAddForm.get('tripEndDate')!.value,
            price: this.tripAddForm.get('tripPrice')!.value,
            currency: 'zł',
            quantity: this.tripAddForm.get('tripQuantity')!.value,
            voters: 1,
            points: 5,
            description: this.tripAddForm.get('tripDescription')!.value,
            imageLink: [this.tripAddForm.get('tripImageLink')!.value],
            // amount: 0,
        } as Trip;
        this.showError = false;
        this.showOk = true;
        this.tripAddForm.reset();
        this.fb.addTrip(newTrip);
    }
}