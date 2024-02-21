import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-trip-review',
  templateUrl: './trip-review.component.html',
  styleUrls: ['./trip-review.component.css']
})
export class TripReviewComponent {

    constructor(
        private formBuilder: FormBuilder,
        private auth: AuthService,
        private historyService: HistoryService
    ) {}

    reviewForm!: FormGroup;

    @Input() id = 0;
    @Output() newReviewEvent = new EventEmitter<review>();

    reviews: review[] = [];
    message = '';

    
    ngOnInit(): void {
        this.reviewForm = this.formBuilder.group({
            nick: ['', Validators.required],
            tripName: ['', Validators.required],
            date: [''],
            review: ['', [Validators.required , Validators.minLength(50), Validators.maxLength(500)]]
        });
    }

    onSubmit(reviewForm: any) {
        if(this.auth.userRoles.banned) {
            alert("Jesteś zbanowany, nie możesz dodawać komentarzy");
            this.reviewForm.reset();
            return;
        }
        let flag = false;
        this.historyService.ngOnInit();
        let boughtTrips = this.historyService.getHistory();
        setTimeout(() => {
            for (let trip of boughtTrips) {
                if (trip.id == this.id) {
                    flag = true;
                }
            }
            if (flag) {
                if(!this.reviewForm.valid) {
                    this.validatorsMassage();
                    alert(this.message);
                    this.message = '';
                    return;
                }
                let newReview = ({
                    nick: reviewForm.get('nick')!.value,
                    tripName: reviewForm.get('tripName')!.value,
                    date: reviewForm.get('date')!.value,
                    review: reviewForm.get('review')!.value,
                } as review);
                this.newReviewEvent.emit(newReview);
                this.reviewForm.reset();
            }
            else {
                alert("Niestety nie możesz skomentować tej wycieczki, najpierw z niej skorzystaj"); 
            }
        }, 350);        
    }

    validatorsMassage() {
        if (!this.reviewForm.get('nick')!.valid) {
            this.message += 'Nick jest wymagany\n';
        }
        if (!this.reviewForm.get('tripName')!.valid) {
            this.message += 'Nazwa wycieczki jest wymagana\n';
        }
        if (!this.reviewForm.get('review')!.valid) {
            this.message += 'Recenzja musi zawierać między 50, a 500 znaków\n';
        }
    }
}

interface review {
    nick: string;
    tripName: string;
    date: string;
    review: string;
}