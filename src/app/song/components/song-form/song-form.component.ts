import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom, Observable, toArray } from 'rxjs';
import { SongFormData } from 'src/app/core/models/songFormData';
import { Artist } from '../../../core/models/artist';
import { Song } from '../../../core/models/song';
import { SongService } from '../../services/song.service';

@Component({
	selector: 'app-song-form',
	templateUrl: './song-form.component.html',
	styleUrls: ['./song-form.component.scss'],
})
export class SongFormComponent implements OnInit {
	isUpdateMode: boolean;
	songForm: FormGroup;
	artists: Observable<Artist[]>;
	classes: string[] = ['LP-DIM-APP', 'LP-DIM-FI'];
	constructor(
		private _formBuilder: FormBuilder,
		private _songService: SongService,
		private _snackBar: MatSnackBar,
		private dialogRef: MatDialogRef<SongFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: SongFormData
	) {
		this.isUpdateMode = this.data.isUpdateMode;
	}

	ngOnInit(): void {
		this.initFormBuilder();
		this.artists = this._songService.getArtists();
	}

	initFormBuilder() {
		this.songForm = this._formBuilder.group({
			id: [
				this.data.isUpdateMode
					? this.data.songToUpdate.id
					: this.data.idToCreate,
				Validators.required,
			],
			name: [
				this.data.isUpdateMode ? this.data.songToUpdate.name : '',
				Validators.required,
			],
			duration: [
				this.data.isUpdateMode ? this.data.songToUpdate.duration : 0,
				Validators.required,
			],
			artist: [
				this.data.isUpdateMode ? this.data.songToUpdate.artist.id : undefined,
				Validators.required
			]
		});
	}

	closeForm(id?: number) {
		this.songForm.reset();
		this.dialogRef.close(id);
	}

	onSubmit(song: Song) {
		if (this.songForm.valid) {
			if (this.data.isUpdateMode) {
				// update
				this._songService.update(song).subscribe((response) => {
					this.closeForm(song.id);
					this._snackBar.open(response, '', {
						duration: 2000,
						panelClass: ['mat-toolbar', 'mat-accent'],
					});
				});
			} else {
				// create
				this._songService.create(song).subscribe((response) => {
					this.closeForm(song.id);
					this._snackBar.open(response, '', {
						duration: 2000,
						panelClass: ['mat-toolbar', 'mat-accent'],
					});
				});
			}
		}
	}
}
