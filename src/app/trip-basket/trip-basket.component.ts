import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BasketTrip } from '../interfaces/BasketTrip';
import { BasketService } from '../basket.service';
import { Observable, Subscription } from 'rxjs';
import { HistoryService } from '../history.service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-trip-basket',
  templateUrl: './trip-basket.component.html',
  styleUrls: ['./trip-basket.component.css']
})
export class TripBasketComponent implements OnInit{

    basket!: BasketTrip[];
    price!: number;
    currency = 'zł';

    constructor(
        private basketService: BasketService,
        private buyService: HistoryService, 
        private fb: FirebaseService
        ) {}


    ngOnInit() {
        this.basket = this.basketService.getBasket();
    }

    removeTrip(trip: BasketTrip) {
        this.basketService.removeTrip(trip.id);
        this.ngOnInit();
    }

    buyTrip(trip: BasketTrip) {
        this.buyService.addTrip(trip);
        this.fb.changeQuantityOfTrip(trip.id, trip.amount);
        this.removeTrip(trip);
        this.ngOnInit();
    }

}
