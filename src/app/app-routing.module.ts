import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'artists',
		pathMatch: 'full'
	},
	{
		path: 'artists',
		loadChildren: () => import('./artist/artist.module').then(m => m.ArtistModule)
	},
	{
		path: 'songs',
		loadChildren: () => import('./song/song.module').then(m => m.SongModule)
	},
	{
		path: '**',
		component: NotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
