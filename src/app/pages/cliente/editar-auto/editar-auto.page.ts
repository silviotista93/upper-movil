import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CarService } from '../../../service/cliente/car.service';
import { environment } from 'src/environments/environment';
import { Car, Brand, Color, Car_type, Cilindraje } from 'src/app/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController, ActionSheetController } from '@ionic/angular';

declare var window: any;

@Component({
  selector: 'app-editar-auto',
  templateUrl: './editar-auto.page.html',
  styleUrls: ['./editar-auto.page.scss'],
})
export class EditarAutoPage implements OnInit {

  //#region Slides per view
  slidesCar = {
    slidesPerView: 3.5,
    spaceBetween: 2
  };

  slidesColor = {
    slidesPerView: 6.0
  };
  //#endregion

  URL = environment.url;

  brands: Brand[] = [];
  colors: Color[] = [];
  carTypes: Car_type[] = [];
  cilindrajes: Cilindraje[] = [];
  car: Car = {}

  imageToUpload: any;

  // #region Variables string
  avatarSel = new EventEmitter<string>();
  carSel: string;
  cilindrajeSel: string;
  colorSel: string;
  cilindrajeId: string;
  brandSel: string;

  public colorId: string;
  public carId: string;
  public brandId: string;
  image: string ;
  image2: string = "../assets/banner_add_auto.png";
  //#endregion

  id: any = this.route.snapshot.paramMap.get('id');

  constructor(
    private carService: CarService,
    private loadCtrl: LoadingController,
    private camera: Camera,
    private actSheetCtrl: ActionSheetController,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.loadData();
    await this.loadDataCar();
  }

  // #region Cargar Datos del auto
  async loadData() {
    this.carService.getCar(this.id).subscribe(resp => {
      this.car = resp['car'];
      this.image = this.car.picture;
      this.image2 = "";
    });
  }
  // #endregion

  // #region Cargar Marcas, Colores y Tipos 
  async loadDataCar() {

    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();

    this.carService.getBrand().subscribe(resp => {
      this.brands.push(...resp['brands']);
      loading.dismiss();
      for (const brand of this.brands) {
        if (brand.id === this.car.brand_id) {
          this.brandSel = brand.name;
          break;
        }
      }
    });
    this.carService.getColor().subscribe(resp => {
      this.colors.push(...resp['colors']);
      loading.dismiss();
      for (const color of this.colors) {
        if (color.id === this.car.color_id) {
          this.colorSel = color.picture;
          break;
        }
      }
    });
    this.carService.getCarType().subscribe(resp => {
      this.carTypes.push(...resp['carTypes']);
      loading.dismiss();
      for (const type of this.carTypes) {
        if (type.id === this.car.car_type_id) {
          this.carSel = type.picture;
          break;
        }
      }
    });

    this.carService.getCilindraje().subscribe(resp => {
      this.cilindrajes.push(...resp['cilindrajes']);
      loading.dismiss();
      for (const cilin of this.cilindrajes) {
        if (cilin.id === this.car.cilindraje_id) {
          this.cilindrajeSel = cilin.picture;
          break;
        }
      }
    });

    loading.dismiss();
  }
  // #endregion

  // #region Metodos clic
  selectedBrand(brand) {
    this.avatarSel.emit(brand.id);
    this.brandId = brand.id;
  }

  selectedCar(carTypes) {
    this.carSel = carTypes.picture;
    this.avatarSel.emit(carTypes.picture);
    this.carId = carTypes.id.toString();
    this.car.car_type_id = this.carId
  }

  selectedCilindraje(cilindrajes) {
    this.cilindrajeSel = cilindrajes.picture;
    this.avatarSel.emit(cilindrajes.picture);
    this.cilindrajeId = cilindrajes.id.toString();
    this.car.cilindraje_id = this.cilindrajeId;
  }

  selectedColor(colors) {
    this.colorSel = colors.picture;
    this.avatarSel.emit(colors.picture);
    this.colorId = colors.id.toString();
    this.car.color_id = this.colorId;
  }
  // #endregion

  // #region Actulizar carro
  async saveCar(car) {
    console.log('data', this.car);
    await this.carService.updatePicture(this.imageToUpload, this.id);
    this.car.picture = this.carService.image;
    const validated = await this.carService.updateCar(car);
    if (validated) {
      this.carService.image = "";
      this.car = {};
      this.ionViewWillEnter();
    }
  }
  // #endregion

  // #region Abrir Camera
  async openCamera() {
    const optionsCamera: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 400,
      targetHeight: 400,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    }
    await this.getPicture(optionsCamera);
  }
  // #endregion

  // #region Abrir Galeria
  async openGallery() {
    const optionsGallery: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 400,
      targetHeight: 400,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    await this.getPicture(optionsGallery);
  }
  // #endregion

  // #region Obtener imagen
  getPicture(options: CameraOptions) {
    this.camera.getPicture(options).then(async (imageData) => {

      this.imageToUpload = imageData;
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      
      const loading = await this.loadCtrl.create({
        spinner: 'crescent',
      });
      await loading.present();

      this.image2 = img;
      this.image = "";

      loading.dismiss();
    }, (err) => {
      // Handle error
    });
  }
  // #endregion

  // #region action sheet
  async presentActionSheet() {
    const actionSheet = await this.actSheetCtrl.create({
      header: 'Selecciona una opción',
      buttons: [
        {
          text: 'Camara',
          icon: 'camera',
          handler: () => {
            this.openCamera();
            console.log('Camara clicked');
          }
        }, {
          text: 'Galeria',
          icon: 'images',
          handler: () => {
            this.openGallery();
            console.log('Galeria clicked');
          }
        }]
    });
    await actionSheet.present();
  }
  // #endregion
}
