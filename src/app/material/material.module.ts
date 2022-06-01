import { NgModule } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";
import {MatBadgeModule} from '@angular/material/badge';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

const MaterialComponents = [MatToolbarModule, MatIconModule, MatButtonModule, MatBadgeModule, MatDividerModule, MatInputModule, MatSelectModule]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
