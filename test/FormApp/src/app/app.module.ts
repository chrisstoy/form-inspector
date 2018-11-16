import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FirstFormComponent } from './first-form/first-form.component';
import { SecondFormComponent } from './second-form/second-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstFormComponent,
    SecondFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
