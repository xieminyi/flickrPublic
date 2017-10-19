import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class SearchService {
	constructor(private http: Http) { }

	getImages(q: string) {
		return this.http.get('/api', {params: {keyword: q}}).map((res: Response) => res.json());
	}

	search(q: string): Observable<any> {
	  if (!q) {
	    q = '';
	  } else {
	    q = q.toLowerCase();
	  }
	  return this.getImages(q).map(data => data);
	}
}

