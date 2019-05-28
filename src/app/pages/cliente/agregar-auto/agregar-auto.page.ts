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
    picture: 'cars/8CO5OD33Y1BuYIm0TvAeifFkCzce95fmn0cJ7cqI.jpeg',
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
    this.avatarSel.emit(brand.id)
    this.brandId = brand.id;
    console.log("marca", brand.id)
  }
  // #endregion

  // #region Guardar carro
  async saveCar(registerCar) {

    // registerCar = new FormGroup ({
    //   board: new FormControl('', Validators.required),
    //   picture: new FormControl('', Validators.required), 
    //   car_type_id: new FormControl('', Validators.required), 
    //   cilindraje_id: new FormControl('', Validators.required), 
    //   brand_id: new FormControl('', Validators.required), 
    //   color_id: new FormControl('', Validators.required), 
    //   user_id: new FormControl('', Validators.required),   
    // });

    // registerCar.brand_id = this.brandId;
    registerCar.car_type_id = this.carId;
    registerCar.color_id = this.colorId;
    registerCar.cilindraje_id = this.cilindrajeId;
    registerCar.user_id = this.user.id.toString();

    console.log('data', this.registerCar);

    await this.carService.createCar(registerCar);
    this.navCtrl.navigateRoot('autos', { animated: true });
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
  openCamera() {
    const optionsCamera: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    }
    this.getPicture(optionsCamera);
  }
  // #endregion

  // #region Abrir Galeria
  openGallery() {
    const optionsGallery: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.getPicture(optionsGallery);
  }
  // #endregion

  // #region Obtener imagen
  getPicture(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      const img = window.Ionic.WebView.convertFileSrc(imageData);

      this.image = img;
      console.log(img)

      //this.carService.createCar(imageData);
      this.registerCar.picture = imageData;
      this.tempImages.push(img);

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

  async createCar(fCar: NgForm) {
    this.registerCar.car_type_id = this.carId;
    this.registerCar.color_id = this.colorId;
    this.registerCar.cilindraje_id = this.cilindrajeId;
    this.registerCar.user_id = this.user.id.toString();

    console.log('data', this.registerCar);
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();

    if (fCar.invalid) {
      loading.dismiss();
      this.uiService.errorToast('Todos los campos son obligatorios');
      return;
    }
    const validated = this.carService.createCar(this.registerCar);

    console.log(this.registerCar);

    if (validated) {
      loading.dismiss();
      console.log("paila");
      // this.navCtrl.navigateRoot('menu/autos', { animated: true });

    } else {
      loading.dismiss();
      this.uiService.errorToast('paila');
    }
  }


}
