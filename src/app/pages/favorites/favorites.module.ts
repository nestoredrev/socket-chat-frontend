import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesPageRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';

@NgModule({
    declarations: [FavoritesComponent],
    imports: [CommonModule, FavoritesPageRoutingModule],
})
export class FavoritesPageModule {}