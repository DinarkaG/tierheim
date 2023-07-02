import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderDComponent} from "./header-d/header-d.component";
import {VermittlungComponent} from "./vermittlung/vermittlung.component";
import {HomeComponent} from "./home/home.component";
import {ContactComponent} from "./contact/contact.component";
import { CardComponent } from './card/card.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
//import { ImpressumComponent } from './impressum/impressum.component';
import { ButtonsComponent } from './buttons/buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    SlideshowComponent,
    HeaderDComponent,
    HomeComponent,
    ContactComponent,
    VermittlungComponent,
    //ImpressumComponent,
    ButtonsComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
