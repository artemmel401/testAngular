import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PointComponent } from './components/point/point.compoent';
import { FiltersComponent } from './components/filters/filters.component';
import { CheckboxComponent } from './components/filters/checkbox/checkbox.component';
import { RadioButtonComponent } from './components/filters/radioButton/radioButton.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PointComponent,
    FiltersComponent,
    CheckboxComponent,
    RadioButtonComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
