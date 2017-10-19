import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { SearchService } from './search.service';
import { BaseRequestOptions, Http, ConnectionBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('SearchService', () => {
	beforeEach(() => {

		TestBed.configureTestingModule({
		  providers: [SearchService,
		  	{
		  		provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
		  			return new Http(backend, defaultOptions);
		  		}, 
		  		deps: [MockBackend, BaseRequestOptions]
		  	},
		  	{	provide: MockBackend, useClass: MockBackend	},
		  	{	provide: BaseRequestOptions, useClass: BaseRequestOptions }
		  ]
		});

	});

  	it('should retrieve all search results',
	  inject([SearchService, MockBackend], fakeAsync((searchService: SearchService, mockBackend: MockBackend) => {
	    let res: Response;
	    mockBackend.connections.subscribe(c => {
	      expect(c.request.url).toBe('/api?keyword=');
	      const response = new ResponseOptions({body: '["http://image-url"]'});
	      c.mockRespond(new Response(response));
	    });
	    searchService.getImages('').subscribe((response) => {
	      res = response;
	    });
	    tick();
	    expect(res[0]).toBe('http://image-url');
	  }))
	);

	it('should filter by search term',
	  inject([SearchService, MockBackend], fakeAsync((searchService: SearchService, mockBackend: MockBackend) => {
	    let res;
	    mockBackend.connections.subscribe(c => {
	      expect(c.request.url).toBe('/api?keyword=car');
	      const response = new ResponseOptions({body: '["http://car-image-url"]'});
	      c.mockRespond(new Response(response));
	    });
	    searchService.search('car').subscribe((response) => {
	      res = response;
	    });
	    tick();
	    expect(res[0]).toBe('http://car-image-url');
	  }))
	);

});
