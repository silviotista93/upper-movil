import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListSubscripcionesPage } from './list-subscripciones.page';
import { ModalInfoPlanPage } from '../modal-info-plan/modal-info-plan.page';
import { ModalInfoPlanPageModule } from '../modal-info-plan/modal-info-plan.module';

const routes: Routes = [
  {
    path: '',
    component: ListSubscripcionesPage
  }
];

@NgModule({
  entryComponents: [
    ModalInfoPlanPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfoPlanPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListSubscripcionesPage]
})
export class ListSubscripcionesPageModule {}
