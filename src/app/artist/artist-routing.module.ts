import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistDetailsComponent } from './pages/artist-details/artist-details.component';
import { ArtistListComponent } from './pages/artist-list/artist-list.component';
import { ArtistComponent } from './artist.component';

const routes: Routes = [
	{
		path: '',
		component: ArtistComponent,
		children: [
			{
				path: '',
				component: ArtistListComponent
			},
			{
				path: ':id',
				component: ArtistDetailsComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ArtistRoutingModule {}
