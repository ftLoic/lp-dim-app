import { TestBed } from '@angular/core/testing';

import { ArtistService as ArtistService } from './artist.service';

describe('ArtistService', () => {
	let service: ArtistService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ArtistService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
