import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TohComponent } from './toh.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule, FormsModule
  ],
  declarations: [
    TohComponent
  ],
  bootstrap: [ TohComponent ]

})
export class TohModule { }
