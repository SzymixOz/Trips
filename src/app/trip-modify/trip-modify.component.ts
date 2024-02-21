import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { Trip } from '../interfaces/Trip';

@Component({
  selector: 'app-trip-modify',
  templateUrl: './trip-modify.component.html',
  styleUrls: ['./trip-modify.component.css']
})
export class TripModifyComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private fb: FirebaseService,
        private router: Router
    ) {}

    today = new Date();
    d = this.today.getDate();
    m = this.today.getMonth() + 1; 
    y = this.today.getFullYear();
    dd!: string;
    mm!: string;
    todayFormated!: string;   
  
    tripModifyForm!: FormGroup;
    id: any;
    trip: any;
    subscription: Subscription | undefined;
  
    ngOnInit(): void {
        if (this.d < 10) {
            this.dd = '0' + String(this.d);
        }
        else  this.dd = String(this.d);
        if (this.m < 10) {
            this.mm = '0' + String(this.m);
        }
        else  this.mm = String(this.m);
        this.todayFormated = String(this.y) + '-' + this.mm + '-' + this.dd;


        this.subscription = this.route.params.subscribe((params) => {
            console.log("ID:", params['id']);
            this.id = params['id'];
        });

        this.fb.getTrips().pipe(first()).subscribe((trips: any) => {
            for (let t of trips) {
                // console.log("__");
                // console.log(t);
                if (t.Id == this.id) {
                    this.trip = t;
                    this.tripModifyForm.patchValue(t);
                    break;
                }
            }
        });
        this.tripModifyForm = this.formBuilder.group({
            tripName: ['', Validators.required],
            tripCountry: ['', Validators.required],
            tripStartDate: ['', Validators.required],
            tripEndDate: ['', Validators.required],
            tripPrice: ['', Validators.required],
            tripQuantity: ['', Validators.required],
            tripDescription: ['', Validators.required],
            tripImageLink: ['', Validators.required]
        });
        
        setTimeout(() => {
            this.tripModifyForm.patchValue({
                tripName: this.trip?.Name,
                tripCountry: this.trip?.Country,
                tripStartDate: this.trip?.StartDate,
                tripEndDate: this.trip?.EndDate,
                tripPrice: this.trip?.Price,
                tripQuantity: this.trip?.Quantity,
                tripDescription: this.trip?.Description,
                tripImageLink: this.trip?.ImageLink
            });
        }, 500);
        
    }

    ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
    }
  
    showError = false;
    showOk = false;
  
  
    submitForm() {
        if (!this.tripModifyForm.valid) {
            this.showError = true;
            console.log(this.tripModifyForm.get('tripCountry')!.value);
            return;
        }
        let dataToUpdate = {
            Name: this.tripModifyForm.get('tripName')!.value,
            Country: this.tripModifyForm.get('tripCountry')!.value,
            StartDate: this.tripModifyForm.get('tripStartDate')!.value,
            EndDate: this.tripModifyForm.get('tripEndDate')!.value,
            Price: this.tripModifyForm.get('tripPrice')!.value,
            Currency: 'zł',
            Id: 11,
            Quantity: this.tripModifyForm.get('tripQuantity')!.value,
            Voters: this.trip.Voters,
            Points: this.trip.Points,
            Description: this.tripModifyForm.get('tripDescription')!.value,
            ImageLink: [this.tripModifyForm.get('tripImageLink')!.value],
        };
        try{
            this.fb.updateTrip(dataToUpdate, this.id);
        }catch(err){
            window.alert(err);
        }
        this.showError = false;
        this.showOk = true;
        this.tripModifyForm.reset();
        this.router.navigate(['/menager/'])
    }

}
