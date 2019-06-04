import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListSubscripcionesPage } from './list-subscripciones.page';

const routes: Routes = [
  {
    path: '',
    component: ListSubscripcionesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListSubscripcionesPage]
})
export class ListSubscripcionesPageModule {}
