import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Artist } from '../../../core/models/artist';
import { Song } from '../../../core/models/song';
import { SongFormData } from '../../../core/models/songFormData';
import { SongFormComponent } from '../../components/song-form/song-form.component';
import { SongService } from '../../services/song.service';

@Component({
	selector: 'app-song-list',
	templateUrl: './song-list.component.html',
	styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {
	song$: Observable<Song[]>;
	artists: Artist[];
	displayedColumns: string[] = ['id', 'name', 'artist', 'duration'];

	//Bidouille
	ids: number[] = [];

	constructor(
		private _songService: SongService,
		private _router: Router,
		public _dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.fetchData();
	}

	async fetchData() {
		this.song$ = this._songService.get();
	}

	showSongDetails(song: Song) {
		this._router.navigateByUrl('/songs/' + song.id);
	}

	createArtist() {
		const songFormData: SongFormData = {
			isUpdateMode: false,
			idToCreate: Math.max(...this.ids) + 1,
		};

		const dialogRef = this._dialog.open(SongFormComponent, {
			data: songFormData,
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
