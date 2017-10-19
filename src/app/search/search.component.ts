import { Component, OnInit } from '@angular/core';

import { SearchService } from '../shared';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	query: string;
	searchResults: Array<string>;
  errorMeg: string;
  loadingSuccess = true;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.getImages('');
  }

  search(): void{
  	this.getImages(this.query);
  }

  // Private functions
  private getImages(keyword): any{
    this.searchService.search(keyword).subscribe(
      data => { 
        this.loadingSuccess = true;
        this.searchResults = data.response; 
      },
      err => {
        this.loadingSuccess = false;
        let error = err.json();
        this.errorMeg = error.error;
      }
    );
  }
}
