import { ArtistService } from '../../services/artist.service';
import { Artist as Artist } from '../../../core/models/artist';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtistFormData } from 'src/app/core/models/artistFormData';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-artist-form',
	templateUrl: './artist-form.component.html',
	styleUrls: ['./artist-form.component.scss'],
})
export class ArtistFormComponent implements OnInit {
	isUpdateMode: boolean;
	artistForm: FormGroup;

	classes: string[] = ['LP-DIM-APP', 'LP-DIM-FI'];
	constructor(
		private _formBuilder: FormBuilder,
		private _artistService: ArtistService,
		private _snackBar: MatSnackBar,
		private dialogRef: MatDialogRef<ArtistFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ArtistFormData
	) {
		this.isUpdateMode = this.data.isUpdateMode;
	}

	ngOnInit(): void {
		this.initFormBuilder();
	}

	initFormBuilder() {
		this.artistForm = this._formBuilder.group({
			id: [
				this.data.isUpdateMode
					? this.data.artistToUpdate.id
					: this.data.idToCreate,
				Validators.required,
			],
			name: [
				this.data.isUpdateMode ? this.data.artistToUpdate.name : '',
				Validators.required,
			],
			genre: [
				this.data.isUpdateMode ? this.data.artistToUpdate.genre : '',
				Validators.required,
			],
			image: [
				this.data.isUpdateMode ? this.data.artistToUpdate.image : '',
				Validators.required,
			],
			description: [
				this.data.isUpdateMode ? this.data.artistToUpdate.description : '',
				Validators.required
			]
		});
	}

	closeForm(id?: number) {
		this.artistForm.reset();
		this.dialogRef.close(id);
	}

	onSubmit(artist: Artist) {
		if (this.artistForm.valid) {
			if (this.data.isUpdateMode) {
				// update
				this._artistService.update(artist).subscribe((response) => {
					this.closeForm(artist.id);
					this._snackBar.open(response, '', {
						duration: 2000,
						panelClass: ['mat-toolbar', 'mat-accent'],
					});
				});
			} else {
				// create
				this._artistService.create(artist).subscribe((response) => {
					this.closeForm(artist.id);
					this._snackBar.open(response, '', {
						duration: 2000,
						panelClass: ['mat-toolbar', 'mat-accent'],
					});
				});
			}
		}
	}
}
