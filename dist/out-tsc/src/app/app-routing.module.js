import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { UserGuardGuard } from './guards/user-guard.guard';
var routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './pages/home/home.module#HomePageModule',
        canLoad: [UserGuardGuard]
    },
    {
        path: 'list',
        loadChildren: './pages/list/list.module#ListPageModule'
    },
    { path: 'login',
        loadChildren: './pages/login/login.module#LoginPageModule'
    },
    { path: 'subscripcion', loadChildren: './pages/subscripcion/subscripcion.module#SubscripcionPageModule' },
    { path: 'historial', loadChildren: './pages/historial/historial.module#HistorialPageModule' },
    { path: 'autos', loadChildren: './pages/autos/autos.module#AutosPageModule' },
    { path: 'cuenta', loadChildren: './pages/cuenta/cuenta.module#CuentaPageModule' },
    { path: 'detalle-lavado', loadChildren: './pages/detalle-lavado/detalle-lavado.module#DetalleLavadoPageModule' },
    { path: 'image-modal', loadChildren: './pages/image-modal/image-modal.module#ImageModalPageModule' },
    { path: 'contacto', loadChildren: './pages/contacto/contacto.module#ContactoPageModule' },
    { path: 'agregar-auto', loadChildren: './pages/agregar-auto/agregar-auto.module#AgregarAutoPageModule' },
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