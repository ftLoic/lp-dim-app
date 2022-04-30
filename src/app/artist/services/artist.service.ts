import { environment } from '../../../environments/environment';
import { Artist } from '../../core/models/artist';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { max, Observable } from 'rxjs';

@Injectable()
export class ArtistService {
	private readonly artistPath: string = '/artists';

	constructor(private _http: HttpClient) {}

	get(): Observable<Artist[]> {
		return this._http.get<Artist[]>(
			`${environment.apiBaseUrl}${this.artistPath}`
		);
	}

	getById(id: number): Observable<Artist> {
		return this._http.get<Artist>(
			`${environment.apiBaseUrl}${this.artistPath}/${id}`
		);
	}

	create(artist: Artist): Observable<string> {
		return this._http.post<string>(
			`${environment.apiBaseUrl}${this.artistPath}`,
			artist
		);
	}

	update(artist: Artist): Observable<string> {
		return this._http.put<string>(
			`${environment.apiBaseUrl}${this.artistPath}/${artist.id}`,
			artist
		);
	}

	delete(id: number): Observable<string> {
		return this._http.delete<string>(
			`${environment.apiBaseUrl}${this.artistPath}/${id}`
		);
	}
}
