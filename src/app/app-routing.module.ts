import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripsComponent } from './trips/trips.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { TripBasketComponent } from './trip-basket/trip-basket.component';
import { HomeComponent } from './home/home.component';
import { TripHistoryComponent } from './trip-history/trip-history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MenagerDashboardComponent } from './menager-dashboard/menager-dashboard.component';
import { TripModifyComponent } from './trip-modify/trip-modify.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';
import { MenagerGuard } from './guard/menager.guard';
import { LoginTwiceGuard } from './guard/login-twice.guard';

const routes: Routes = [
    {path: 'trips', component: TripsComponent},
    {path: 'trips/:id', component: TripDetailsComponent, canActivate: [AuthGuard]},
    {path: 'basket', component: TripBasketComponent, canActivate: [AuthGuard]},
    {path: 'history', component: TripHistoryComponent, canActivate: [AuthGuard]},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent, canActivate: [LoginTwiceGuard]},
    {path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard]},
    {path: 'menager', component: MenagerDashboardComponent, canActivate: [MenagerGuard]},
    {path: 'menager/modify/:id', component: TripModifyComponent, canActivate: [MenagerGuard]},
    {path: '', component: HomeComponent },
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
