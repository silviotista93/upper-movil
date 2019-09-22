import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailSuscriptionPage } from './detail-suscription.page';

const routes: Routes = [
  {
    path: '',
    component: DetailSuscriptionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailSuscriptionPage]
})
export class DetailSuscriptionPageModule {}
