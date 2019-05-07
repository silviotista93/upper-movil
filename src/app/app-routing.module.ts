import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/user.guard';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canLoad: [ UserGuard ]
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule',
    canLoad: [ UserGuard ]
  },
  {
    path: 'list',
    loadChildren: './pages/list/list.module#ListPageModule',
    canLoad: [ UserGuard ]
  },
  { path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule',
  },
  { path: 'subscripcion', loadChildren: './pages/subscripcion/subscripcion.module#SubscripcionPageModule', canLoad: [ UserGuard ] },
  { path: 'historial', loadChildren: './pages/historial/historial.module#HistorialPageModule', canLoad: [ UserGuard ] },
  { path: 'autos', loadChildren: './pages/autos/autos.module#AutosPageModule', canLoad: [ UserGuard ] },
  { path: 'cuenta', loadChildren: './pages/cuenta/cuenta.module#CuentaPageModule', canLoad: [ UserGuard ] },
  { path: 'detalle-lavado', loadChildren: './pages/detalle-lavado/detalle-lavado.module#DetalleLavadoPageModule', canLoad: [ UserGuard ] },
  { path: 'image-modal', loadChildren: './pages/image-modal/image-modal.module#ImageModalPageModule', canLoad: [ UserGuard ] },
  { path: 'contacto', loadChildren: './pages/contacto/contacto.module#ContactoPageModule', canLoad: [ UserGuard ] },
  { path: 'agregar-auto', loadChildren: './pages/agregar-auto/agregar-auto.module#AgregarAutoPageModule', canLoad: [ UserGuard ] },
  { path: 'menu', component: MenuComponent, canLoad: [ UserGuard ] },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
