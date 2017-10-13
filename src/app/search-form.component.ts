import { Component } from '@angular/core';
import { Search } from './search'; 

import { Http, Response } from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()

@Component({
	selector: 'search-form',
	templateUrl: './search-form.component.html'
})

export class SearchFormComponent {
	constructor(private http: Http){
		this.httpRequest('');
	};

	images = [];
	loadingSuccess = true;
	errorMessage = null;

	triggerSearch(keyword: string){
		this.httpRequest(keyword);
	}

	// Private functions
	private httpRequest(keyword): any{
		this.http.post('/api', {keyword: keyword}).subscribe(data => {
				this.loadingSuccess = true;
				let res = data.json().response;
				this.images = res;
			},
			err => {
				this.loadingSuccess = false;
	      		let error = err.json();
	      		this.errorMessage = error.error;
	    });
	}
}

