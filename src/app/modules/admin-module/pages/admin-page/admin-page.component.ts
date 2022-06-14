import {Component} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  public currentSectionValue = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  public onSectionSelect(section: string): void {
    this.router.navigate([section], {relativeTo: this.activatedRoute});
  }
}
