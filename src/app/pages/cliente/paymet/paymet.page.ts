import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-paymet',
  templateUrl: './paymet.page.html',
  styleUrls: ['./paymet.page.scss'],
})
export class PaymetPage implements OnInit {

  @ViewChild('slider') slider: IonSlides;
  @ViewChild('segments') segments;
  page: any;

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }
  atras() {
    this.navCtrl.back();
  }
  // Initialize slider
  ionViewDidEnter() {
   this.slideChanged();
  }

  // On segment click
  selectedTab(index) {
    this.slider.slideTo(index);
    console.log('selectedTab', index);
  }


  // On slide changed
  slideChanged() {
    const currentIndex = this.slider.getActiveIndex();
    const slides_count = this.segments.nativeElement.childElementCount;

    this.page = currentIndex.toString();
    if (this.page >= slides_count) {
      this.page = (slides_count - 1).toString();
    }

    console.log('slides_count', slides_count);
    console.log('this.page', this.page);
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

  // Get size start to current
  sizeLeft() {
    let size = 0;
    for (let i = 0; i < this.page; i++) {
      size+= this.segments.nativeElement.children[i].clientWidth;
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
