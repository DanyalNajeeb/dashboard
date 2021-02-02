import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: any;
  title = 'Dispatcher-3pl';
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
   
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}

}