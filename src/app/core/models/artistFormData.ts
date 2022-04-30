import { Artist } from './artist';

export interface ArtistFormData {
	isUpdateMode: boolean;
	artistToUpdate?: Artist;
	idToCreate?: number;
}
