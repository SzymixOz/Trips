import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BasketService } from '../basket.service';
import { FirebaseService } from '../firebase.service';
import { Trip } from '../interfaces/Trip';

@Component({
  selector: 'app-menager-dashboard',
  templateUrl: './menager-dashboard.component.html',
  styleUrls: ['./menager-dashboard.component.css']
})
export class MenagerDashboardComponent implements OnInit {
    constructor(
        public auth: AuthService,
        public basket: BasketService,
        private fb: FirebaseService
    ) { }
  
    trips!: Trip[];
  
    ngOnInit(): void {
        this.fb.getTrips().subscribe((change) => {
            this.trips = [];
            for (let trip of change) {
                this.trips.push({
                    id: trip.Id,
                    name: trip.Name,
                    country: trip.Country,
                    startDate: trip.StartDate,
                    endDate: trip.EndDate,
                    price: trip.Price,
                    currency: trip.Currency,
                    quantity: trip.Quantity,
                    points: trip.Points,
                    voters: trip.Voters,
                    description: trip.Description,
                    imageLink: trip.ImageLink,
                    amount: 0,
                } as Trip);
            }
        });
    }
  
    deleteTrip(id: number) {
        this.fb.removeTrip(id);
    }

}
