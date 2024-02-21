import { Injectable } from '@angular/core';
import { BasketTrip } from './interfaces/BasketTrip';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

    // private basket: BasketTrip[] = [];
    basket: BasketTrip[] = [];
    // private subjectBasket = new Subject<BasketTrip[]>();

    private numberOfTrips = 0;
    private subjectTrips = new Subject<number>();
    private numberOfPlaces = 0;
    private subjectPlaces = new Subject<number>();

    constructor() { }

    addTrip(trip: BasketTrip) {
        console.log(trip);
        this.basket.push(trip);
        // this.subjectBasket.next(this.basket);

        this.numberOfTrips++;
        this.subjectTrips.next(this.numberOfTrips);
        
        this.numberOfPlaces += trip.amount;
        this.subjectPlaces.next(this.numberOfPlaces);

        console.log(this.basket);
    }

    removeTrip(tripId: number) {
        let placesToRemove = 0;
        this.basket.forEach(element => {
            if (element.id == tripId) {
                placesToRemove += element.amount;
            }
            console.log(element);
        });
        this.basket = this.basket.filter(item => item.id != tripId);
        // this.subjectBasket.next(this.basket);

        if (placesToRemove != 0) {
            this.numberOfTrips--;
            this.subjectTrips.next(this.numberOfTrips); 
            
            this.numberOfPlaces -= placesToRemove;
            this.subjectPlaces.next(this.numberOfPlaces);
        }

    }

    getBasket() {
        return this.basket;
    }
    
    getNumberOfTrips(): Observable<number> {
        return this.subjectTrips.asObservable();
    }

    getNumberOfPlaces(): Observable<number> {
        return this.subjectPlaces.asObservable();
    }
}
