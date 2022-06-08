import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {first} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router) {
  }

  public ngOnInit(): void {
    this.authService.checkAuth().pipe(first()).subscribe((data) => {
      this.authService.setUser(data);
    });
  }
}
