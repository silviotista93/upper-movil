import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
import { UserGuard } from 'src/app/guards/user.guard';
import { PipesModule } from 'src/app/pipes/pipes.module';
var routes = [
    {
        path: 'menu',
        component: MenuPage,
        canLoad: [UserGuard],
        children: [
            {
                path: 'home',
                loadChildren: '../cliente/home/home.module#HomePageModule',
                canLoad: [UserGuard]
            },
            {
                path: 'list',
                loadChildren: '../cliente/list/list.module#ListPageModule',
                canLoad: [UserGuard]
            },
            { path: 'subscripcion', loadChildren: '../cliente/subscripcion/subscripcion.module#SubscripcionPageModule', canLoad: [UserGuard] },
            { path: 'historial', loadChildren: '../cliente/historial/historial.module#HistorialPageModule', canLoad: [UserGuard] },
            { path: 'autos', loadChildren: '../cliente/autos/autos.module#AutosPageModule', canLoad: [UserGuard] },
            { path: 'cuenta', loadChildren: '../cliente/cuenta/cuenta.module#CuentaPageModule', canLoad: [UserGuard] },
            {
                path: 'detalle-lavado/:id', loadChildren: '../cliente/detalle-lavado/detalle-lavado.module#DetalleLavadoPageModule',
                canLoad: [UserGuard]
            },
            { path: 'image-modal', loadChildren: '../cliente/image-modal/image-modal.module#ImageModalPageModule', canLoad: [UserGuard] },
            { path: 'contacto', loadChildren: '../cliente/contacto/contacto.module#ContactoPageModule', canLoad: [UserGuard] },
            {
                path: 'agregar-auto', loadChildren: '../cliente/agregar-auto/agregar-auto.module#AgregarAutoPageModule',
                canLoad: [UserGuard]
            },
            {
                path: 'modal-solicitar',
                loadChildren: '../cliente/modal-solicitar/modal-solicitar.module#ModalSolicitarPageModule'
            },
            {
                path: 'modal-confirmar-solicitud',
                loadChildren: '../cliente/modal-confirmar-solicitud/modal-confirmar-solicitud.module#ModalConfirmarSolicitudPageModule'
            },
            {
                path: 'modal-alert-agregar-auto',
                loadChildren: '../cliente/modal-alert-agregar-auto/modal-alert-agregar-auto.module#ModalAlertAgregarAutoPageModule'
            },
            {
                path: 'list-subscripciones',
                loadChildren: '../cliente/list-subscripciones/list-subscripciones.module#ListSubscripcionesPageModule'
            },
            {
                path: 'modal-info-plan',
                loadChildren: '../cliente/modal-info-plan/modal-info-plan.module#ModalInfoPlanPageModule'
            },
            {
                path: 'paymet',
                loadChildren: '../cliente/paymet/paymet.module#PaymetPageModule'
            },
            {
                path: 'editar-auto/:id',
                loadChildren: '../cliente/editar-auto/editar-auto.module#EditarAutoPageModule'
            },
        ]
    },
    { path: '', redirectTo: '/menu/home' }
];
var MenuPageModule = /** @class */ (function () {
    function MenuPageModule() {
    }
    MenuPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                PipesModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MenuPage]
        })
    ], MenuPageModule);
    return MenuPageModule;
}());
export { MenuPageModule };
//# sourceMappingURL=menu.module.js.map