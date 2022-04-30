import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongDetailsComponent } from './pages/song-details/song-details.component';
import { SongListComponent } from './pages/song-list/song-list.component';
import { SongComponent } from './song.component';

const routes: Routes = [
	{
		path: '',
		component: SongComponent,
		children: [
			{
				path: '',
				component: SongListComponent
			},
			{
				path: ':id',
				component: SongDetailsComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SongRoutingModule {}
