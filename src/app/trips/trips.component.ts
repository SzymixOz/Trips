import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Trip } from '../interfaces/Trip'
import { BasketTrip } from '../interfaces/BasketTrip'
import { BasketService } from '../basket.service';
import { Observable, Subscription } from 'rxjs';
import { FirebaseService } from '../firebase.service';

@Component({
	selector: 'app-trips',
	templateUrl: './trips.component.html',
	styleUrls: ['./trips.component.css']
})

export class TripsComponent implements OnInit {


	tripsData: Trip[] = [];
	filtredTripsData: Trip[] = [];
	basket: BasketTrip[] = [];
	reservedTrips = 0;

    tripsSub!: Subscription;

    constructor(private basketService: BasketService, private fb: FirebaseService) {}

	ngOnInit(): void {
        this.basket = this.basketService.getBasket();

        this.tripsSub = this.fb.getTrips().subscribe(change => {
            for (let trip of change) {
                this.tripsData.push({
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
        })

		this.filtredTripsData = this.tripsData;
	}


	filterEventHandler(trips: Trip[]) {
		this.filtredTripsData = trips;	
	}

	addClick(trip: Trip) {
		trip.amount += 1;
	}

	removeClick(trip: Trip) {
		trip.amount -= 1;
	}

	addToBusket(trip: Trip) {
		if (trip.amount > 0) {
			trip.quantity -= trip.amount;
			this.reservedTrips += trip.amount;
			const basketTrip: BasketTrip = {
                id: trip.id,
				name: trip.name,
				country: trip.country,
				startDate: trip.startDate,
				endDate: trip.endDate,
				price: trip.price,
				currency: trip.currency,
				amount: trip.amount
			};
            this.basketService.addTrip(basketTrip);
			trip.amount = 0;
		}
	}

    removeTrip(trip: Trip) {
		this.tripsData = this.tripsData.filter(item => item != trip);
		this.filtredTripsData = this.filtredTripsData.filter(item => item != trip);
		this.basketService.removeTrip(trip.id);
        // this.fb.removeTrip(trip.id);
	}


	getBorder(trip: Trip) {
		switch (trip) {
			case this.getTripMaxPrice(this.filtredTripsData):
				return '5px solid green';
			case this.getTripMinPrice(this.filtredTripsData):
				return '5px solid red';
			default:
				return '';
		}
	}

	getTripMaxPrice(trips: Trip[]): Trip {
		let max = 0;
		let maxTrip = <Trip>{};
		for (let trip of trips) {
			if (trip.price > max) {
				max = trip.price;
				maxTrip = trip;
			}
		}
		return maxTrip;
	}

	getTripMinPrice(trips: Trip[]): Trip {
		let min = 100000;
		let minTrip = <Trip>{};
		for (let trip of trips) {
			if (trip.price < min) {
				min = trip.price;
				minTrip = trip;
			}
		}
		return minTrip;
	}

	getBackGround(trip : Trip) {
		if (trip.quantity - trip.amount == 0) return 'red';
		else if (trip.quantity - trip.amount <= 3) return 'lightcoral';
		else return '';
	}

	updateRating(number: number, trip: Trip) {
		trip.voters++;
		trip.points += number;
	}

}