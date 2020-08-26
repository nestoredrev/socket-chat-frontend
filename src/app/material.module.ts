import { NgModule } from '@angular/core';


// Angular material Modules
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@NgModule({  
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule
  ]
})
export class MaterialModule { }
