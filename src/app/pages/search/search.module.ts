import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPageRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';

@NgModule({
    declarations: [SearchComponent],
    imports: [CommonModule, SearchPageRoutingModule],
})
export class SearchPageModule {}