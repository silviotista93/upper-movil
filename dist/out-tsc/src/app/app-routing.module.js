import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { UserGuard } from './guards/user.guard';
// import { MenuComponent } from './components/menu/menu.component';
var routes = [
    // {
    //   path: 'home',
    //   loadChildren: './pages/cliente/home/home.module#HomePageModule',
    //   canLoad: [ UserGuard ]
    // },
    // {
    //   path: 'list',
    //   loadChildren: './pages/cliente/list/list.module#ListPageModule',
    //   canLoad: [ UserGuard ]
    // },
    {
        path: 'login',
        loadChildren: './pages/login/login.module#LoginPageModule',
    },
    // tslint:disable-next-line:max-line-length
    // { path: 'subscripcion', loadChildren: './pages/cliente/subscripcion/subscripcion.module#SubscripcionPageModule', canLoad: [ UserGuard ] },
    // { path: 'historial', loadChildren: './pages/cliente/historial/historial.module#HistorialPageModule', canLoad: [ UserGuard ] },
    // { path: 'autos', loadChildren: './pages/cliente/autos/autos.module#AutosPageModule', canLoad: [ UserGuard ] },
    // { path: 'cuenta', loadChildren: './pages/cliente/cuenta/cuenta.module#CuentaPageModule', canLoad: [ UserGuard ] },
    // { path: 'detalle-lavado', loadChildren: './pages/cliente/detalle-lavado/detalle-lavado.module#DetalleLavadoPageModule',
    // canLoad: [ UserGuard ] },
    // { path: 'image-modal', loadChildren: './pages/cliente/image-modal/image-modal.module#ImageModalPageModule', canLoad: [ UserGuard ] },
    // { path: 'contacto', loadChildren: './pages/cliente/contacto/contacto.module#ContactoPageModule', canLoad: [ UserGuard ] },
    // tslint:disable-next-line:max-line-length
    // { path: 'agregar-auto', loadChildren: './pages/cliente/agregar-auto/agregar-auto.module#AgregarAutoPageModule', canLoad: [ UserGuard ] },
    // { path: 'menu', component: MenuComponent, canLoad: [ UserGuard ] },
    { path: '', loadChildren: './pages/menu/menu.module#MenuPageModule', canLoad: [UserGuard] },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map