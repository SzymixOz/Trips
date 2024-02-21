import { Injectable, OnInit } from '@angular/core';
import { BasketTrip } from './interfaces/BasketTrip';
import { BoughtTrip } from './interfaces/BoughtTrip';
import { FirebaseService } from './firebase.service';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService implements OnInit {

    private boughtTrips: BoughtTrip[] = [];

    today = new Date();
    d = this.today.getDate();
    m = this.today.getMonth() + 1; 
    y = this.today.getFullYear();
    dd!: string;
    mm!: string;
    todayFormated!: string; 
    
    tripsSub!: Subscription;
    
    constructor(private fb: FirebaseService, private auth: AuthService) {
        if (this.d < 10) {
            this.dd = '0' + String(this.d);
        }
        else  this.dd = String(this.d);
        if (this.m < 10) {
            this.mm = '0' + String(this.m);
        }
        else  this.mm = String(this.m);
        this.todayFormated = String(this.y) + '-' + this.mm + '-' + this.dd;
    }

    ngOnInit(): void {
        this.boughtTrips = [];
        this.tripsSub = this.fb.getHistory$(this.auth.userData?.uid).subscribe(trips => {
            for (let trip of trips) {
                let statuss;
                if (trip.startDate > this.todayFormated) 
                    statuss = "przed";
                else if (trip.endDate > this.todayFormated)
                    statuss = "w trakcie";
                else 
                    statuss = "zakończona";

                this.boughtTrips.push({
                    id: trip.id,
                    name: trip.name,
                    country: trip.country,
                    startDate: trip.startDate,
                    endDate: trip.endDate,
                    buyDate: trip.buyDate,
                    status: statuss,
                    price: trip.price,
                    currency: trip.currency,
                    amount: trip.amount,
                } as BoughtTrip);
            }
        });
    }

    addTrip(trip: BasketTrip) {
        let boughtTrip: BoughtTrip = {
            id: trip.id,
            name: trip.name,
            country: trip.country,
            startDate: trip.startDate,
            endDate: trip.endDate,
            buyDate: this.todayFormated,
            status: "",
            price: trip.price,
            currency: trip.currency,
            amount: trip.amount,
        }
        if (trip.startDate > this.todayFormated) 
            boughtTrip.status = "przed";
        else if (trip.endDate > this.todayFormated)
            boughtTrip.status = "w trakcie";
        else {
            boughtTrip.status = "zakończona";}

        this.boughtTrips.push(boughtTrip);
        this.fb.pushHistory(boughtTrip, this.auth.userData.uid);
    }

    getHistory() {
        return this.boughtTrips;
    }
}