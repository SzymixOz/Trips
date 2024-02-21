import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { first, firstValueFrom, Observable } from 'rxjs';
import { BasketService } from './basket.service';
import { FirebaseService } from './firebase.service'; 
import { HistoryService } from './history.service';
import { Roles, User } from './interfaces/User';

@Injectable({
      providedIn: 'root',
})
export class AuthService {
    
    userData: any = null;
    userRoles: Roles = {
        guest: true,
        admin: false,
        menager: false,
        client: false,
        banned: false,
    };
    persistenceSetting: string = 'local';

    constructor(
        private aFireAuth: AngularFireAuth,
        private router: Router,
        private fb: FirebaseService,
        private basket: BasketService,
    ) {
        aFireAuth.authState.subscribe(async (e: any) => {
            console.log(this.userRoles);
            console.log('__');
            if (e) {
                this.userData = e;
                const roles = await this.fb.getUserRoles(e?.uid);
                this.userRoles = roles as Roles;
            } else {
                this.userData = null;
                this.userRoles = {
                    guest: true,
                    client: false,
                    menager: false,
                    admin: false,
                    banned: false,
                };
            }
            console.log(this.userRoles);
            console.log('__');
        });
    }

    signInEmailPass(email: string, password: string) {
        return this.aFireAuth.setPersistence(this.persistenceSetting).then((_) => {
            return this.aFireAuth.signInWithEmailAndPassword(email, password)
            .then((ev) => {
                this.router.navigate(['']);
            })
            .catch((err) => {
                window.alert(err.message);
            });
        });
    }

    registerEmailPass(email: string, password: string) {
        return this.aFireAuth.createUserWithEmailAndPassword(email, password)
        .then((res) => {
            let userData = new User(res.user);
            this.fb.addNewUser(userData);
            this.router.navigate(['']);
        })
        .catch((err) => {
            window.alert(err.message);
        });
    }

    getAuthenticated(): Observable<any> {
        return this.aFireAuth.authState;
    }

    signOut() {
        return this.aFireAuth.signOut().then((ev) => {
            this.basket.basket = []
            this.router.navigate(['']);
        });
    }

    isLoggedIn() {
        return this.userData != null;
    }

    changePersistence(newSetting: string) {
        this.persistenceSetting = newSetting;
    }
}