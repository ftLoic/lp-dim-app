import { Artist } from '../../../core/models/artist';
import { max, Observable, of } from 'rxjs';
import { ArtistService } from '../../services/artist.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ArtistFormComponent } from '../../components/artist-form/artist-form.component';
import { ArtistFormData } from 'src/app/core/models/artistFormData';

@Component({
	selector: 'app-artist-list',
	templateUrl: './artist-list.component.html',
	styleUrls: ['./artist-list.component.scss'],
})
export class ArtistListComponent implements OnInit {
	artist$: Observable<Artist[]>;
	displayedColumns: string[] = ['id', 'name', 'genre', 'description'];

	//Bidouille
	ids: number[] = [];

	constructor(
		private _artistService: ArtistService,
		private _router: Router,
		public _dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.fetchData();
	}

	fetchData() {
		this.artist$ = this._artistService.get();
	}

	showArtistDetails(artist: Artist) {
		this._router.navigateByUrl('/artists/' + artist.id);
	}

	createArtist() {
		const artistFormData: ArtistFormData = {
			isUpdateMode: false,
			idToCreate: Math.max(...this.ids) + 1,
		};

		const dialogRef = this._dialog.open(ArtistFormComponent, {
			data: artistFormData,
		});

		dialogRef.afterClosed().subscribe((result) => {
			this.fetchData();
		});
	}

	setId(id: number) {
		//Bidouille
		this.ids.push(id);
	}
}
