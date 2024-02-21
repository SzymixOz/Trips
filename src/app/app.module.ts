import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import { TripAddComponent } from './trip-add/trip-add.component';
import { TripFilterComponent } from './trip-filter/trip-filter.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { TripRatingComponent } from './trip-rating/trip-rating.component';
import { TripBasketComponent } from './trip-basket/trip-basket.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { BasketService } from './basket.service';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { TripReviewComponent } from './trip-review/trip-review.component';
import { TripHistoryComponent } from './trip-history/trip-history.component';
import { HistoryService } from './history.service';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MenagerDashboardComponent } from './menager-dashboard/menager-dashboard.component';
import { TripModifyComponent } from './trip-modify/trip-modify.component';


@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    TripAddComponent,
    TripFilterComponent,
    TripRatingComponent,
    TripBasketComponent,
    NavbarComponent,
    PageNotFoundComponent,
    HomeComponent,
    TripDetailsComponent,
    TripReviewComponent,
    TripHistoryComponent,
    RegisterComponent,
    LoginComponent,
    AdminDashboardComponent,
    MenagerDashboardComponent,
    TripModifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxSliderModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule
    ],
  providers: [BasketService, HistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
