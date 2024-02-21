import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { HistoryService } from '../history.service';
import { BoughtTrip } from '../interfaces/BoughtTrip';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    numberOfTrips = 0;
    numberOfPlaces = 0;
    boughtTrips: BoughtTrip[] = [];


    today = new Date();
    d = this.today.getDate();
    m = this.today.getMonth() + 1; 
    y = this.today.getFullYear();
    dd!: string;
    mm!: string;
    todayFormated!: string;
    nextWeekFormated!: string;

    constructor(
        private basketService: BasketService,
        private historyService: HistoryService,
        public auth: AuthService
    ) {}

    ngOnInit() {
        this.basketService.getNumberOfTrips().subscribe(data => {
            this.numberOfTrips = data;
        });
        this.basketService.getNumberOfPlaces().subscribe(data => {
            this.numberOfPlaces = data;
        });
        this.boughtTrips = this.historyService.getHistory();

        if (this.d < 10) {
            this.dd = '0' + String(this.d);
        }
        else  this.dd = String(this.d);
        if (this.m < 10) {
            this.mm = '0' + String(this.m);
        }
        else  this.mm = String(this.m);
        this.todayFormated = String(this.y) + '-' + this.mm + '-' + this.dd;

        if (this.d > 24) {
            if (this.m == 12) {
                this.y += 1;
                this.m = 1;
            }
            this.m += 1;
            this.d = (this.d + 7) % 32 + 1;
        }
        else {
            this.d += 7;
        }
        if (this.d < 10) {
            this.dd = '0' + String(this.d);
        }
        else  this.dd = String(this.d);
        if (this.m < 10) {
            this.mm = '0' + String(this.m);
        }
        else  this.mm = String(this.m);
        this.nextWeekFormated = String(this.y) + '-' + this.mm + '-' + this.dd;
        
    }   
}
