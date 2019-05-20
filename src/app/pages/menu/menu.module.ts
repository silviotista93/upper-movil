import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';
import { UserGuard } from 'src/app/guards/user.guard';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    canLoad: [ UserGuard ],
    children: [
      {
        path: 'home',
        loadChildren: '../cliente/home/home.module#HomePageModule',
        canLoad: [ UserGuard ]
      },
      {
        path: 'list',
        loadChildren: '../cliente/list/list.module#ListPageModule',
        canLoad: [ UserGuard ]
      },
      // tslint:disable-next-line:max-line-length
      { path: 'subscripcion', loadChildren: '../cliente/subscripcion/subscripcion.module#SubscripcionPageModule', canLoad: [ UserGuard ] },
      { path: 'historial', loadChildren: '../cliente/historial/historial.module#HistorialPageModule', canLoad: [ UserGuard ] },
      { path: 'autos', loadChildren: '../cliente/autos/autos.module#AutosPageModule', canLoad: [ UserGuard ] },
      { path: 'cuenta', loadChildren: '../cliente/cuenta/cuenta.module#CuentaPageModule', canLoad: [ UserGuard ] },
      { path: 'detalle-lavado', loadChildren: '../cliente/detalle-lavado/detalle-lavado.module#DetalleLavadoPageModule',
      canLoad: [ UserGuard ] },
      { path: 'image-modal', loadChildren: '../cliente/image-modal/image-modal.module#ImageModalPageModule', canLoad: [ UserGuard ] },
      { path: 'contacto', loadChildren: '../cliente/contacto/contacto.module#ContactoPageModule', canLoad: [ UserGuard ] },
      // tslint:disable-next-line:max-line-length
      { path: 'agregar-auto', loadChildren: '../cliente/agregar-auto/agregar-auto.module#AgregarAutoPageModule', canLoad: [ UserGuard ] },

      {path: '', redirectTo: '/menu/home'}
    ]

  }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
