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
    loadChildren: './pages/cliente/home/home.module#HomePageModule',
    canLoad: [ UserGuard ]
  },
  {
    path: 'list',
    loadChildren: './pages/cliente/list/list.module#ListPageModule',
    canLoad: [ UserGuard ]
  },
  { path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule',
  },
  { path: 'subscripcion', loadChildren: './pages/cliente/subscripcion/subscripcion.module#SubscripcionPageModule', canLoad: [ UserGuard ] },
  { path: 'historial', loadChildren: './pages/cliente/historial/historial.module#HistorialPageModule', canLoad: [ UserGuard ] },
  { path: 'autos', loadChildren: './pages/cliente/autos/autos.module#AutosPageModule', canLoad: [ UserGuard ] },
  { path: 'cuenta', loadChildren: './pages/cliente/cuenta/cuenta.module#CuentaPageModule', canLoad: [ UserGuard ] },
  { path: 'detalle-lavado', loadChildren: './pages/cliente/detalle-lavado/detalle-lavado.module#DetalleLavadoPageModule', 
  canLoad: [ UserGuard ] },
  { path: 'image-modal', loadChildren: './pages/cliente/image-modal/image-modal.module#ImageModalPageModule', canLoad: [ UserGuard ] },
  { path: 'contacto', loadChildren: './pages/cliente/contacto/contacto.module#ContactoPageModule', canLoad: [ UserGuard ] },
  { path: 'agregar-auto', loadChildren: './pages/cliente/agregar-auto/agregar-auto.module#AgregarAutoPageModule', canLoad: [ UserGuard ] },
  { path: 'menu', component: MenuComponent, canLoad: [ UserGuard ] },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
