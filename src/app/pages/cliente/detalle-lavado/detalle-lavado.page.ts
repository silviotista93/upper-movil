import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';

@Component({
  selector: 'app-detalle-lavado',
  templateUrl: './detalle-lavado.page.html',
  styleUrls: ['./detalle-lavado.page.scss'],
})
export class DetalleLavadoPage implements OnInit {

  sliderOpts = {
    zoom: false,
    slidesPerView: 1.2,
    spaceBetween: 20,
    centeredSlides: true
  };
  oculto = 30;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  openPreview(img) {
    this.modalController.create ({
      component: ImageModalPage,
      componentProps: {
        img: img
      }
    }).then(modal => modal.present());
  }
}
