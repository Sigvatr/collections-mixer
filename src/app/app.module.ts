import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './components/app/app.component';
import { TableComponent } from './components/table/table.component';
import { CollectionWrapperComponent } from './components/collection-wrapper/collection-wrapper.component';
import { ChooseColumnComponent } from './components/choose-column/choose-column.component';
import { ChooseOperationComponent } from './components/choose-operation/choose-operation.component';
import { ErrorMessageComponent } from './components/error-message.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CollectionWrapperComponent,
    ChooseColumnComponent,
    ChooseOperationComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
