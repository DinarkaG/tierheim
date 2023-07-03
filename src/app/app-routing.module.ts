import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {VermittlungComponent} from "./vermittlung/vermittlung.component";
import {ContactComponent} from "./contact/contact.component";
import {SpendenComponent} from "./spenden/spenden.component";
import {KatzeComponent} from "./katze/katze.component";
import {HundComponent} from "./hund/hund.component";
import {KleintierComponent} from "./kleintier/kleintier.component";
import {CardComponent} from "./card/card.component";

const routes: Routes = [
  {path: '', component:HomeComponent },
  {path: 'vermittlung', component: VermittlungComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'spenden', component: SpendenComponent},
  {path: 'katze', component: KatzeComponent},
  {path: 'hund', component: HundComponent},
  {path: 'kleintier', component: KleintierComponent},
  {path: 'card', component: CardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
