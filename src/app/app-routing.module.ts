import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {VermittlungComponent} from "./vermittlung/vermittlung.component";
import {ContactComponent} from "./contact/contact.component";
import {SpendenComponent} from "./spenden/spenden.component";

const routes: Routes = [
  {path: '', component:HomeComponent },
  {path: 'vermittlung', component: VermittlungComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'spenden', component: SpendenComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
