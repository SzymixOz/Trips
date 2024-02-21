import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.css']
})
export class TripRatingComponent implements OnInit{
    @Input() amountPoints = 0;
    @Input() amountVote = 0;
    @Input() id = 0;
    
    @Output() ratingChanged = new EventEmitter<number>();

    imageSrc!: number; 
    voted = false;

    constructor(private auth: AuthService, private historyService: HistoryService) {}

    ngOnInit(): void {
        this.imageSrc = this.amountPoints / this.amountVote;
    }

    rattingApplied(number: number) {
        if (this.auth.userRoles.menager || this.auth.userRoles.banned) { 
            return;
        }
        this.historyService.ngOnInit();
        let boughtTrips = this.historyService.getHistory();
        setTimeout(() => {
            for (let trip of boughtTrips) {
                if (trip.id == this.id) {
                    if (this.voted) return;
                    this.ratingChanged.emit(number);
                    this.voted = true;
                    return;
                }
            }
            alert("Niestety nie możesz ocenić tej wycieczki, najpierw z niej skorzystaj"); 
        }, 350);
    }
}
