import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Brand, Color, Car_type, Usuario, Car } from 'src/app/interfaces/interfaces';
import { CarService } from 'src/app/service/cliente/car.service';
import { UserService } from 'src/app/service/cliente/user.service';
import { environment } from 'src/environments/environment';
import { LoadingController, NavController, ActionSheetController, AlertController } from '@ionic/angular';
import { Cilindraje } from '../../../interfaces/interfaces';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NgForm, Validators, FormGroup, FormControl } from '@angular/forms';
import { UiServiceService } from 'src/app/service/ui-service.service';
import { Base64 } from '@ionic-native/base64/ngx';



declare var window: any;

@Component({
  selector: 'app-agregar-auto',
  templateUrl: './agregar-auto.page.html',
  styleUrls: ['./agregar-auto.page.scss'],
})
export class AgregarAutoPage implements OnInit {

  //#region Slides per view
  slidesCar = {
    slidesPerView: 3.5,
    spaceBetween: 2
  };

  slidesColor = {
    slidesPerView: 6.0
  };
  //#endregion

  avatarSel = new EventEmitter<string>();

  brands: Brand[] = [];
  colors: Color[] = [];
  carTypes: Car_type[] = [];
  cilindrajes: Cilindraje[] = [];
  user: Usuario = {};

  tempImages: string[] = [];
  image: string = "../assets/banner_add_auto.png";

  public carSel: string;
  public colorSel: string;
  public cilindrajeSel: string;

  public brandId: string;

  public carId: string;
  public cilindrajeId: string;
  public colorId: string;
  board: string;

  registerCar: Car = {
    board: '',
    picture: '',
    car_type_id: '',
    cilindraje_id: '',
    brand_id: '',
    color_id: '',
    user_id: ''
  };

  URL = environment.url;

  constructor(
    private carService: CarService,
    private loadCtrl: LoadingController,
    private navCtrl: NavController,
    private userService: UserService,
    private actSheetCtrl: ActionSheetController,
    private uiService: UiServiceService,
    private camera: Camera) { }

  ngOnInit() {
    this.user = this.userService.getUsuario();
    this.registerCar = {};
    this.loadData();
  }

  // #region metodos clic 
  selectedCar(carTypes) {
    this.carSel = carTypes.picture;
    this.avatarSel.emit(carTypes.picture);
    this.carId = carTypes.id.toString();
    // console.log(this.carId);
  }

  selectedCilindraje(cilindrajes) {
    this.cilindrajeSel = cilindrajes.picture;
    this.avatarSel.emit(cilindrajes.picture);
    this.cilindrajeId = cilindrajes.id.toString();
    // console.log(this.cilindrajeId);
  }

  selectedColor(colors) {
    this.colorSel = colors.picture;
    this.avatarSel.emit(colors.picture);
    this.colorId = colors.id.toString();
    // console.log(this.colorId);
  }

  selectedBrand(brand) {
    this.avatarSel.emit(brand.id);
    this.brandId = brand.id;
    console.log("marca", brand.id);


  }
  // #endregion

  // #region Guardar carro
  async saveCar(registerCar) {

    registerCar.picture = this.carService.image;
    registerCar.car_type_id = this.carId;
    registerCar.color_id = this.colorId;
    registerCar.cilindraje_id = this.cilindrajeId;
    registerCar.user_id = this.user.id.toString();

    console.log('data', this.registerCar);
    await this.carService.createCar(registerCar);

  }
  // #endregion

  // #region Cargar Marcas, Colores y Tipos 
  async loadData() {

    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();

    this.carService.getBrand().subscribe(resp => {
      this.brands.push(...resp['brands']);
      loading.dismiss();
      console.log('brands', this.brands);
    });
    this.carService.getColor().subscribe(resp => {
      this.colors.push(...resp['colors']);
      loading.dismiss();
      console.log('colors', this.colors);
    });
    this.carService.getCarType().subscribe(resp => {
      this.carTypes.push(...resp['carTypes']);
      loading.dismiss();
      console.log('types', this.carTypes);
    });
    this.carService.getCilindraje().subscribe(resp => {
      this.cilindrajes.push(...resp['cilindrajes']);
      loading.dismiss();
      console.log('cilindrajes', this.cilindrajes);
    });
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

      const img = window.Ionic.WebView.convertFileSrc(imageData);
      console.log('img', img);

      this.image = img;
      console.log('imagedata', imageData);
      await this.carService.uploadPicture(imageData);
      imageData.clear();

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

  // #region de formulario 
  // async createCar(fCar: NgForm) {

  //   // let data: FormData = new FormData();

  //   this.registerCar.car_type_id = this.carId;
  //   this.registerCar.color_id = this.colorId;
  //   this.registerCar.cilindraje_id = this.cilindrajeId;
  //   this.registerCar.user_id = this.user.id.toString();

  //   // data.append('picture', this.registerCar.picture);
  //   // data.append('board', this.registerCar.board);
  //   // data.append('car_type_id', this.registerCar.car_type_id);
  //   // data.append('brand_id', this.registerCar.brand_id);
  //   // data.append('cilindraje_id', this.registerCar.cilindraje_id);
  //   // data.append('color_id', this.registerCar.color_id);
  //   // data.append('user_id', this.registerCar.user_id);

  //   // const jsonString = JSON.stringify(this.registerCar);
  //   // data.append('data', jsonString);

  //   // console.log('data form', data.get('picture'));
  //   // console.log('data form', data);

  //   const loading = await this.loadCtrl.create({
  //     spinner: 'crescent'
  //   });

  //   loading.present();

  //   if (fCar.invalid) {
  //     loading.dismiss();
  //     this.uiService.errorToast('Todos los campos son obligatorios');
  //     return;
  //   }
  //   const validated = this.carService.createCar(this.registerCar);

  //   console.log(this.registerCar);

  //   if (validated) {
  //     loading.dismiss();
  //     // data.forEach((value, key) => {
  //     //   console.log("key %s: value %s", key, value);
  //     // })
  //     console.log("bien...");
  //     // this.navCtrl.navigateRoot('menu/autos', { animated: true });

  //   } else {
  //     loading.dismiss();
  //     this.uiService.errorToast('paila');
  //   }
  // }

  // #endregion

}
