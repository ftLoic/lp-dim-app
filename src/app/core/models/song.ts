import { Artist } from './artist';

export interface Song {
	id: number;
	artist: Artist;
	name: string;
	duration: number;
}