import { Artist } from './artist';

export interface ArtistFormData {
	isUpdateMode: boolean;
	songToUpdate?: Artist;
	idToCreate?: number;
}
