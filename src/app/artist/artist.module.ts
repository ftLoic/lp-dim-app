import { ArtistService } from './services/artist.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistRoutingModule } from './artist-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ArtistComponent } from './artist.component';
import { ArtistListComponent } from './pages/artist-list/artist-list.component';
import { ArtistDetailsComponent } from './pages/artist-details/artist-details.component';
import { ArtistFormComponent } from './components/artist-form/artist-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
	declarations: [
		ArtistComponent,
		ArtistListComponent,
		ArtistDetailsComponent,
		ArtistFormComponent,
	],
	imports: [
		CommonModule,
		ArtistRoutingModule,
		SharedModule,
		HttpClientModule,
		MatDatepickerModule,
		MatNativeDateModule,
	],
	providers: [ArtistService, MatDatepickerModule, MatNativeDateModule],
})
export class ArtistModule {}
