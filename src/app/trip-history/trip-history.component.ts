import { Component } from '@angular/core';
import { HistoryService } from '../history.service';
import { BoughtTrip } from '../interfaces/BoughtTrip';

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.css']
})
export class TripHistoryComponent {

    boughtTrips: BoughtTrip[] = [];
    boughtTripsFiltred: BoughtTrip[] = [];
    availableStatus: string[] = ['przed', 'w trakcie', 'zakończona'];
    

    constructor(private historyService: HistoryService) {}
    
    ngOnInit() {
        this.historyService.ngOnInit();
        this.boughtTrips = this.historyService.getHistory();
        this.boughtTripsFiltred = this.boughtTrips;
    }

    onChangeStatus(event: any) {
        if (event.target.checked) {
            this.availableStatus.push(event.target.value);
        }
        else {
            this.availableStatus = this.availableStatus.filter(item => item != event.target.value);
        }
    }

    onFilterStatus() {
        this.boughtTripsFiltred = [];
        for (let trip of this.boughtTrips) {
            for (let status of this.availableStatus) {
                if (trip.status == status)
                    this.boughtTripsFiltred.push(trip);
            }
        }
    }
}