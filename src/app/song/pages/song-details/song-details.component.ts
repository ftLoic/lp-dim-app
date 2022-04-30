import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/core/models/artist';
import { Song } from '../../../core/models/song';
import { lastValueFrom, toArray } from 'rxjs';
import { SongFormData } from '../../../core/models/songFormData';
import { SongFormComponent } from '../../components/song-form/song-form.component';
import { SongService } from '../../services/song.service';

@Component({
	selector: 'app-song-details',
	templateUrl: './song-details.component.html',
	styleUrls: ['./song-details.component.scss'],
})
export class SongDetailsComponent implements OnInit {
	song$: Observable<Song>;
	constructor(
		private _songService: SongService,
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

	async fetchData(id: number) {
		this.song$ = this._songService.getById(id);
	}

	updateSong(song: Song) {
		const songFormData: SongFormData = {
			isUpdateMode: true,
			songToUpdate: song,
		};

		const dialogRef = this._dialog.open(SongFormComponent, {
			data: songFormData,
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.fetchData(result);
			}
		});
	}

	deleteSong(id: number) {
		this._songService.delete(id).subscribe((response) => {
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
