import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { SuscripcionService } from '../../../service/cliente/suscripcion.service';
var ModalInfoPlanPage = /** @class */ (function () {
    function ModalInfoPlanPage(modalCtrl, loadCtrl, planService) {
        this.modalCtrl = modalCtrl;
        this.loadCtrl = loadCtrl;
        this.planService = planService;
        this.plans = null;
    }
    ModalInfoPlanPage.prototype.ngOnInit = function () {
        var _this = this;
        // this.loadData();
        this.planService.firstPlans2(this.nombre).then(function (plans) {
            _this.plans = plans;
            console.log('vista', _this.plans);
        }).catch();
    };
    // async loadData() {
    //   const loading = await this.loadCtrl.create({
    //     spinner: 'crescent'
    //   });
    //   loading.present();
    //   console.log('id', this.nombre);
    //   this.planService.firstPlans(1).subscribe(resp => {
    //     this.plans.push(...resp['plan']);
    //     loading.dismiss();
    //     // event.target.complete();
    //     console.log('Planes', this.plans);
    //   });
    // }
    ModalInfoPlanPage.prototype.cerrar_modal = function () {
        this.modalCtrl.dismiss();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ModalInfoPlanPage.prototype, "nombre", void 0);
    ModalInfoPlanPage = tslib_1.__decorate([
        Component({
            selector: 'app-modal-info-plan',
            templateUrl: './modal-info-plan.page.html',
            styleUrls: ['./modal-info-plan.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            LoadingController,
            SuscripcionService])
    ], ModalInfoPlanPage);
    return ModalInfoPlanPage;
}());
export { ModalInfoPlanPage };
//# sourceMappingURL=modal-info-plan.page.js.map