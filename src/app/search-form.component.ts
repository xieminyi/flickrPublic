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

	// image urls
	images = [];
	// flag: show images or error message
	loadingSuccess = true;
	// error message from server response
	errorMessage = null;

	// Send query to server api: 
	// 1 key enter event and 
	// 2 search button event
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

