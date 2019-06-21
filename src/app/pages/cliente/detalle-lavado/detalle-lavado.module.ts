import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, NavParams } from '@ionic/angular';

import { DetalleLavadoPage } from './detalle-lavado.page';
import { ImageModalPageModule } from '../image-modal/image-modal.module';
import { ImageModalPage } from '../image-modal/image-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleLavadoPage
  }
];

@NgModule({
  entryComponents: [
    // ImageModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // ImageModalPageModule,
    RouterModule.forChild(routes)
  ],
  // providers: [NavParams],
  declarations: [DetalleLavadoPage]
})
export class DetalleLavadoPageModule {}
