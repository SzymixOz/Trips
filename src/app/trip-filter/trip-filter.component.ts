import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Trip } from '../interfaces/Trip';
import { Options } from '@angular-slider/ngx-slider';


@Component({
  selector: 'app-trip-filter',
  templateUrl: './trip-filter.component.html',
  styleUrls: ['./trip-filter.component.css']
})
export class TripFilterComponent implements OnChanges{

    @Input() trips: Trip[] = [];

    @Output() filterEvent = new EventEmitter<Trip[]>();

    countriesArray: string[] = [];
    filteredCountries: string[] = [];
    filteredRate: number[] = [1, 2, 3, 4, 5];
    filteredTrips: Trip[] = [];
    filteredTripsSupp: Trip[] = [];

    openFilters = false;

    open() {
        this.openFilters = !this.openFilters;
    }
    
    uniqueCountry() {
        for (let trip of this.trips) {
            this.countriesArray.push(trip.country);
        }
        this.countriesArray = this.countriesArray.filter((value, index) => this.countriesArray.indexOf(value) === index);
        this.filteredCountries = structuredClone(this.countriesArray);
    }

    ngOnChanges(changes: SimpleChanges) {
        for (let trip of this.trips) {
            let flag = true;
            for (let country of this.countriesArray) {
                if (trip.country == country) {
                    flag = false;
                }
            }
            if (flag) {
                this.countriesArray.push(trip.country);
                this.filteredCountries.push(trip.country);
            }
        }
    }


    onChangeCountry(event: any) {
        if (event.target.checked) {
            this.filteredCountries.push(event.target.value);
            this.onFilterRating();
        }
        else {
            this.filteredCountries = this.filteredCountries.filter(iteam => iteam != event.target.value);
            this.onFilterRating();
        }
        this.setNewCeil(this.getTripMaxPrice(this.filteredTrips).price);
        this.setNewFloor(this.getTripMinPrice(this.filteredTrips).price);
    }

    onFilterCountry() {
        this.filteredTrips = [];
        for (let country of this.filteredCountries) {
            for (let trip of this.trips) {
                if (trip.country == country)
                    this.filteredTrips.push(trip);
            }
        }
    }


    onChangeRating(event: any) {
        if (event.target.checked) {
            this.filteredRate.push(event.target.value);
        }
        else {
            this.filteredRate = this.filteredRate.filter(iteam => iteam != event.target.value);
        }
    }

    onFilterRating() {
        this.onFilterCountry();
        this.filteredTripsSupp = [];
        for (let rate of this.filteredRate) {
            for (let trip of this.filteredTrips) {
                if (Math.round(trip.points/trip.voters) == rate)
                    this.filteredTripsSupp.push(trip);
            }
        }
        this.filteredTrips = this.filteredTripsSupp;
    }


    startDate: string = '01-01-2020';
    endDate!: string;
    
    onChangeStartDate(event: any) {
        this.startDate = event.target.value
    }

    onFilterStartDate() {
        this.onFilterRating();
        for (let i = 0; i < this.filteredTrips.length; i++) {
            if (this.filteredTrips[i].startDate < this.startDate) {
                this.filteredTrips.splice(i, 1);
                i--;
            }
        }
    }
   

    onChangeEndDate(event: any) {
        this.endDate = event.target.value;
    }

    onFilterEndDate() {
        this.onFilterStartDate();
        for (let i = 0; i < this.filteredTrips.length; i++) {
            if (this.filteredTrips[i].endDate > this.endDate) {
                this.filteredTrips.splice(i, 1);
                i--;
            }
        }
        
        this.setNewCeil(this.getTripMaxPrice(this.filteredTrips).price);
        this.setNewFloor(this.getTripMinPrice(this.filteredTrips).price);
    }

    
    onFilterRange() {
        this.onFilterEndDate();
        for (let i = 0; i < this.filteredTrips.length; i++) {
            if (this.filteredTrips[i].price < this.value || this.filteredTrips[i].price > this.highValue) {
                this.filteredTrips.splice(i, 1);
                i--;
            }
        }
        this.filterEvent.emit(this.filteredTrips);
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

    value: number = 0;
    highValue: number = 10000;
    options: Options = {
    floor: 0,
    ceil: 10000,
    };

    setNewCeil(newCeil: number): void {
        const newOptions: Options = Object.assign({}, this.options);
        newOptions.ceil = newCeil;
        this.options = newOptions;
    }

    setNewFloor(newFloor: number): void {
        const newOptions: Options = Object.assign({}, this.options);
        newOptions.floor = newFloor;
        this.options = newOptions;
    }
    
}
