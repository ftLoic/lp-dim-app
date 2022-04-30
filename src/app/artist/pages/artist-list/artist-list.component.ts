import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArtistFormData } from 'src/app/core/models/artistFormData';
import { Artist } from '../../../core/models/artist';
import { ArtistFormComponent } from '../../components/artist-form/artist-form.component';
import { ArtistService } from '../../services/artist.service';

@Component({
	selector: 'app-artist-list',
	templateUrl: './artist-list.component.html',
	styleUrls: ['./artist-list.component.scss'],
})
export class ArtistListComponent implements OnInit {
	artist$: Observable<Artist[]>;
	displayedColumns: string[] = ['id', 'name', 'genre', 'description', 'update', 'delete'];

	//Bidouille
	ids: number[] = [];

	constructor(
		private _artistService: ArtistService,
		private _router: Router,
		private _snackBar: MatSnackBar,
		public _dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.fetchData();
	}

	fetchData() {
		this.artist$ = this._artistService.get();
	}

	showArtistDetails($event, artist: Artist) {
		if ($event.target.tagName === 'TD')
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

	updateArtist(artist: Artist) {
		const artistFormData: ArtistFormData = {
			isUpdateMode: true,
			artistToUpdate: artist,
		};

		const dialogRef = this._dialog.open(ArtistFormComponent, {
			data: artistFormData,
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.fetchData();
			}
		});
	}

	deleteArtist(id: number) {
		this._artistService.delete(id).subscribe((response) => {
			this._snackBar.open(response, '', {
				duration: 2000,
				panelClass: ['mat-toolbar', 'mat-accent'],
			});
		});
	}

	setId(id: number) {
		//Bidouille
		this.ids.push(id);
	}
}
