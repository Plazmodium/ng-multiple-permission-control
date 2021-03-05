import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngrx-multiple-permissions-control';
  bool?: boolean;
  constructor(private router: Router, private location: Location) {
    
      this.router.events.subscribe((evt: any) => {
        if (evt instanceof NavigationEnd) {
          console.log(evt.url) //path of the route
        }
      });
  }
}

