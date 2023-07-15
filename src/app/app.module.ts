import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderDComponent} from "./header-d/header-d.component";
import { VermittlungComponent} from "./vermittlung/vermittlung.component";
import { HomeComponent} from "./home/home.component";
import { ContactComponent} from "./contact/contact.component";
import { CardComponent } from './card/card.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { SpendenComponent } from './spenden/spenden.component';
import { TiercardsComponent } from './tiercards/tiercards.component';
import { HundComponent } from './hund/hund.component';
import { KatzeComponent } from './katze/katze.component';
import { KleintierComponent } from './kleintier/kleintier.component';
import { PopupComponent } from './popup/popup.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { PopupNewsletterComponent } from './popup-newsletter/popup-newsletter.component';

// Benötigte Module
@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HeaderDComponent,
    HomeComponent,
    ContactComponent,
    VermittlungComponent,
    ImpressumComponent,
    SpendenComponent,
    TiercardsComponent,
    HundComponent,
    KatzeComponent,
    KleintierComponent,
    PopupComponent,
    LoginComponent,
    AdminComponent,
    PopupNewsletterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
