import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Route } from '@angular/router';
import {LogInComponent} from './components/auth/log-in/log-in.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {HomeComponent} from './components/pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes:Routes =[
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {path:'login', component:LogInComponent},
  {path:'register',component:RegisterComponent},
  { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
