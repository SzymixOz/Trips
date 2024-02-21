import { Component, OnInit } from '@angular/core';
import { Trip } from '../interfaces/Trip'
import { BasketTrip } from '../interfaces/BasketTrip'
import { BasketService } from '../basket.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

    tripId = -1;
    trip!: Trip;
    selected = 0;
    photoSrc!: string;
    reviews: review[] = [];

	basket: BasketTrip[] = [];
	reservedTrips = 0;
    private subscription!: Subscription;
    tripsSub!: Subscription;

    constructor(private basketService: BasketService, private route: ActivatedRoute, private fb: FirebaseService) {}

	ngOnInit(): void {
        
        this.subscription = this.route.params.subscribe(params => {
            this.tripId = params['id']
        });

        this.tripsSub = this.fb.getTrips().subscribe(change => {
            for (let trip of change) {
                if (trip.Id == this.tripId) {
                    this.trip = ({
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
                    } as Trip)
                }
            }
            this.changePhotoSrc();
        });
	}

    nextPhoto() {
        this.selected = (this.selected + 1) % this.trip.imageLink.length;
        this.changePhotoSrc();
    }
    
    previousPhoto() {
        this.selected = (this.selected - 1 + this.trip.imageLink.length) % this.trip.imageLink.length;
        this.changePhotoSrc();
    }

    changePhotoSrc() {
        this.photoSrc = this.trip.imageLink[this.selected];
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
		this.basketService.removeTrip(trip.id);
        // this.fb.removeTrip(trip.id);
	}

	updateRating(number: number, trip: Trip) {
		trip.voters++;
		trip.points += number;
	}

    addReview(newReview: review){
        this.reviews.push(newReview);
    }

}

interface review {
    nick: string;
    tripName: string;
    date: string;
    review: string;
}