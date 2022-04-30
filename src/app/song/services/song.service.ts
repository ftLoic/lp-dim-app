import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../../core/models/artist';
import { environment } from '../../../environments/environment';
import { Song } from '../../core/models/song';

@Injectable()
export class SongService {
	private readonly artistPath: string = '/artists';
	private readonly songPath: string = '/songs';

	constructor(private _http: HttpClient) {}

	get(): Observable<Song[]> {
		return this._http.get<Song[]>(
			`${environment.apiBaseUrl}${this.songPath}`
		);
	}

	getArtists(): Observable<Artist[]> {
		return this._http.get<Artist[]>(
			`${environment.apiBaseUrl}${this.artistPath}`
		);
	}

	getById(id: number): Observable<Song> {
		return this._http.get<Song>(
			`${environment.apiBaseUrl}${this.songPath}/${id}`
		);
	}

	create(song: Song): Observable<string> {
		return this._http.post<string>(
			`${environment.apiBaseUrl}${this.songPath}`,
			song
		);
	}

	update(song: Song): Observable<string> {
		return this._http.put<string>(
			`${environment.apiBaseUrl}${this.songPath}/${song.id}`,
			song
		);
	}

	delete(id: number): Observable<string> {
		return this._http.delete<string>(
			`${environment.apiBaseUrl}${this.songPath}/${id}`
		);
	}
}
