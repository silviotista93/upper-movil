import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSegment, IonSlides, LoadingController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../service/cliente/order.service';
import { Order, Car_suscription, Car, Detailorder } from '../../../interfaces/interfaces';
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

  opciones = [ {
    id: '0',
    opcion: 'Detalle'
  },
  {
    id: '1',
    opcion: 'Facturación'
  }
  ];
  URL = environment.url;
  public orden: Order = {};
  public car_suscription: Car_suscription = {};
  public car: Car = {};
  public detailOrden: Detailorder = null;

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
    private loadCtrl: LoadingController,
    ) { 
      
    }


  ngOnInit() {
    this.idDetalleLavado = this.activatedRoute.snapshot.paramMap.get('id');
    // this.orderService.getDetailOrden(this.idDetalleLavado);
  
          
    //   this.orden = this.orderService.order2;
    //   this.orderService.getCarSuscriptionOrden(this.orden.subscription_cars_id);
    //   this.car_suscription = this.orderService.car_suscription2;
    //   console.log('orden', this.orden);
    //   console.log('car_suscription', this.orderService.car_suscription2);
    //   this.car = this.orderService.car_suscription2['car'];
    //   this.image = this.URL + this.car.picture;
    //   console.log('carrossss', this.car);
    //   console.log('carrossss', this.image);   
    this.loadData();
  }
     async loadData() {

        const loading = await this.loadCtrl.create({
          spinner: 'crescent'
        });
        loading.present();
        this.orderService.getDetailOrden(this.activatedRoute.snapshot.paramMap.get('id')).then((data: any) => {
          this.detailOrden = data;
          setTimeout(() => {
            this.selectedTab( this.opciones[0].id);
          }, 200);
        });
        loading.dismiss();
    //     
    //     this.orderService.getDetailOrden(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(resp => {
    //     this.orden = resp['detail-order']; 
    //     this.orderService.getCarSuscriptionOrden(this.orden.subscription_cars_id);
    //     this.car = this.orderService.car;
    //     console.log('car_susc de detalle lavado', this.car);
    //     
        
    //  });
        
      }
  // Initialize slide
 async ionViewDidEnter() {
    this.slideChanged();
    await this.loadData();
   }
 
   // On segment click
   selectedTab(index) {
     this.slider.slideTo(index);
     this.segment.value = index;
     console.log('selectedTab', index);

   }
 
 async openPreview(img) {
    const modal = await this.modalController.create ({
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
    let result = sizeLeft - (window.innerWidth / 2) + (sizeCurrent / 2) ;

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
