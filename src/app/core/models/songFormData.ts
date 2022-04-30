import { Artist } from './artist';
import { Song } from './song';

export interface SongFormData {
	isUpdateMode: boolean;
	songToUpdate?: Song;
	idToCreate?: number;
}
