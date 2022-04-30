import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from '../shared/shared.module';
import { SongFormComponent } from './components/song-form/song-form.component';
import { SongDetailsComponent } from './pages/song-details/song-details.component';
import { SongListComponent } from './pages/song-list/song-list.component';
import { SongService } from './services/song.service';
import { SongRoutingModule } from './song-routing.module';
import { SongComponent } from './song.component';


@NgModule({
	declarations: [
		SongComponent,
		SongListComponent,
		SongDetailsComponent,
		SongFormComponent,
	],
	imports: [
		CommonModule,
		SongRoutingModule,
		SharedModule,
		HttpClientModule,
		MatDatepickerModule,
		MatNativeDateModule,
	],
	providers: [SongService, MatDatepickerModule, MatNativeDateModule],
})
export class SongModule {}
