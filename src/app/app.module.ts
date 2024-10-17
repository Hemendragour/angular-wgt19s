import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Add this to support ngModel in the template

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule, // Import FormsModule for template-driven forms
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
