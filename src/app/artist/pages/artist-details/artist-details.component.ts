import { ArtistFormData } from '../../../core/models/artistFormData';
import { ArtistFormComponent } from '../../components/artist-form/artist-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/core/models/artist';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
	selector: 'app-artist-details',
	templateUrl: './artist-details.component.html',
	styleUrls: ['./artist-details.component.scss'],
})
export class ArtistDetailsComponent implements OnInit {
	artist$: Observable<Artist>;
	constructor(
		private _artistService: ArtistService,
		private _activatedRoute: ActivatedRoute,
		public _dialog: MatDialog,
		private _snackBar: MatSnackBar,
		private _router: Router,
		private _location: Location
	) {}

	ngOnInit(): void {
		this._activatedRoute.params.subscribe((params) => {
			this.fetchData(params['id']);
		});
	}

	fetchData(id: number) {
		this.artist$ = this._artistService.getById(id);
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
				this.fetchData(result);
			}
		});
	}

	deleteArtist(id: number) {
		this._artistService.delete(id).subscribe((response) => {
			this._snackBar.open(response, '', {
				duration: 2000,
				panelClass: ['mat-toolbar', 'mat-accent'],
			});

			this._router.navigateByUrl('/artists');
		});
	}

	goBack() {
		this._location.back();
	}
}
