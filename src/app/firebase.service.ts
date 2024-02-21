import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { first, firstValueFrom, map, Observable } from 'rxjs';
import { Trip } from './interfaces/Trip';
import { Roles, User } from './interfaces/User';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    trips!: Observable<any[]>;
    idNumber: number = 0;

    constructor(private db: AngularFireDatabase) {
        this.trips = this.db.list('Trips').valueChanges();
        console.log(this.trips);
        this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items: any) => {
            for(let i of items){
                this.idNumber++;
            }
        });  
    }  


    getTrips(): Observable<any[]> {
        console.log(this.trips);
        return this.trips;
    }

    addTrip(trip: Trip) {
        this.db.list('Trips').push({
            Id: this.idNumber,
            Name: trip.name,
            Country: trip.country,
            StartDate: trip.startDate,
            EndDate: trip.endDate,
            Price: trip.price,
            Currency: trip.currency,
            Quantity: trip.quantity,
            Points: trip.points,
            Voters: trip.voters,
            Description: trip.description,
            ImageLink: trip.imageLink,
        });
        console.log(trip);
        this.idNumber++;
    }
    
    removeTrip(id: number) {
        console.log(id);
        if (id > 9) {
            this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items: any) => {
                for (let item of items) {
                    if (item.payload.val().Id == id) {
                        this.db.list('Trips').remove(item.payload.key);
                    }
                }
                this.idNumber--;
            });
        }
    }


    addNewUser(user: User) {
        this.db.object('/Users/' + user.uid).set({
            email: user.email,
            roles: user.roles,
        });
      }
    
    async getUserRoles(uid: string) {
        return firstValueFrom(
            this.db.object('/Users/' + uid + '/roles').valueChanges()
        );
    }

    getUserRoles$(uid: string) {
        return this.db.object('/Users/' + uid + '/roles').valueChanges();
    }

    getUsers() {
        return this.db.list('Users').snapshotChanges();
    }

    changeUserRole(uid: string, role: string, value: string) {
        let change = '{"' + role + '"' + ':' + value + '}';
        this.db.object('/Users/' + uid + '/roles').update(JSON.parse(change));
    }

    getHistory$(uid: string): Observable<any[]> {
        return this.db.list('/Users/' + uid + '/history/').valueChanges();
    }

    pushHistory(items: any, uid: string) {
        try {
            this.db.list('/Users/' + uid + '/history/').push(items);
        }
        catch (err) {
            window.alert(err)
        }
    }

    updateTrip(data: any, id: number) {
        this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((trips: any) => {
            for (let trip of trips) {
                if (trip.payload.val().Id == id) {
                    console.log(trip.payload.key);
                    this.db.list('Trips').update(trip.payload.key, data);
                }
            }
            console.log(trips);
        });
    }

    changeQuantityOfTrip(id: number, amount: number) {
        this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((trips: any) => {
            for (let trip of trips) {
                if (trip.payload.val().Id == id) {
                    let temp = trip.payload.val().Quantity - amount;
                    this.db.list('Trips').update(trip.payload.key, { Quantity: temp });
                }
            }
        });
    }
}
