import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import HttpClientModule 
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

// Import templates
import { SearchFormComponent } from './search-form.component';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
  ],
  declarations: [
    AppComponent,
    SearchFormComponent,
    HeaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
