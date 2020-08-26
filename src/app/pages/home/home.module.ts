import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { HomePageRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule }  from '../../material.module';

//Ppipes
import { BuscarPipe } from '../../pipes/buscar.pipe';

@NgModule({
    declarations: [HomeComponent,
                   BuscarPipe],
    imports: [  CommonModule, 
                HomePageRoutingModule,
                MaterialModule,
                FormsModule],
})
export class HomePageModule {}