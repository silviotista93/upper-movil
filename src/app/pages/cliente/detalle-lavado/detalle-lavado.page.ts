import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSegment, IonSlides, LoadingController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../service/cliente/order.service';
import { Order, Car, Detailorder, CarSuscription } from '../../../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-detalle-lavado',
  templateUrl: './detalle-lavado.page.html',
  styleUrls: ['./detalle-lavado.page.scss'],
})
export class DetalleLavadoPage implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;
  @ViewChild('slider') slider: IonSlides;
  @ViewChild('segments') segments;
  page: any;
  id: 0;

  image: string = this.orderService.image;
  idDetalleLavado = null;

  opciones = [{
    id: '0',
    opcion: 'Detalle'
  },
  {
    id: '1',
    opcion: 'Facturación'
  }
  ];
  URL = environment.url;
  public car_suscription: CarSuscription = {};
  public car: Car = {};
  public detailOrden: Detailorder = null;

  public orden2: Order = {};

  sliderOpts = {
    zoom: false,
    slidesPerView: 1.2,
    spaceBetween: 20,
    centeredSlides: true
  };
  oculto = 30;

  constructor(
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private loadCtrl: LoadingController) { }


  ngOnInit() {
  }

  // async loadData() {

  //   const loading = await this.loadCtrl.create({
  //     spinner: 'crescent'
  //   });
  //   loading.present();
    
  //   this.orderService.getDetailOrden(this.activatedRoute.snapshot.paramMap.get('id')).then((data: any) => {
  //     this.detailOrden = data;
  //     console.log('detailorden', this.detailOrden);
  //     setTimeout(() => {
  //       this.selectedTab(this.opciones[0].id);
  //     }, 200);
  //   });
  //   loading.dismiss();
  // }
  // Initialize slide

  async ionViewWillEnter(){
    const name = this.activatedRoute.snapshot.paramMap.get("name")
    this.orden2 = JSON.parse(name);
    console.log('objeto', this.orden2);
    setTimeout(() => {
      this.selectedTab(this.opciones[0].id);
    }, 200);

    this.slideChanged();
    // await this.loadData();
  }
  // async ionViewDidEnter() {
  //   this.slideChanged();
  //   await this.loadData();
  // }

  // On segment click
  selectedTab(index) {
    // this.slider.slideTo(index);
    this.slider.slideTo(index);
    this.segment.value = index;
    console.log('selectedTab', index);

  }

  async openPreview(img) {
    const modal = await this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img: img
      }
    })
    await modal.present();
  }

  slideChanged() {
    /*
    console.log('ddddd', this.segments.nativeElement);
   console.log(this.segments.nativeElement.childElementCount);

    const currentIndex = this.slider.getActiveIndex();
    const slides_count = this.segments.nativeElement.childElementCount;
    
    this.page = currentIndex.toString();
    if (this.page >= slides_count) {
      this.page = (slides_count - 1).toString();
    }

    console.log('slides_count', slides_count);
    console.log('this.page', this.page);
    */
    this.centerScroll();
  }
  // Center current scroll
  centerScroll() {
    if (!this.segments || !this.segments.nativeElement) {
      return;
    }

    const sizeLeft = this.sizeLeft();
    const sizeCurrent = this.segments.nativeElement.children[this.page].clientWidth;
    let result = sizeLeft - (window.innerWidth / 2) + (sizeCurrent / 2);

    result = (result > 0) ? result : 0;
    this.smoothScrollTo(result);
  }
  sizeLeft() {
    let size = 0;
    for (let i = 0; i < this.page; i++) {
      size += this.segments.nativeElement.children[i].clientWidth;
    }
    return size;
  }

  // Easing function
  easeInOutQuart(time, from, distance, duration) {
    if ((time /= duration / 2) < 1) { return distance / 2 * time * time * time * time + from; }
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  }

  // Animate scroll
  smoothScrollTo(endX) {
    const startTime = new Date().getTime();
    const startX = this.segments.nativeElement.scrollLeft;
    const distanceX = endX - startX;
    const duration = 400;

    const timer = setInterval(() => {
      const time = new Date().getTime() - startTime;
      const newX = this.easeInOutQuart(time, startX, distanceX, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      this.segments.nativeElement.scrollLeft = newX;
    }, 1000 / 60); // 60 fps
  }

}
