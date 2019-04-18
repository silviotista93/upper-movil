import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-auto',
  templateUrl: './agregar-auto.page.html',
  styleUrls: ['./agregar-auto.page.scss'],
})
export class AgregarAutoPage implements OnInit {

  tipo_vehiculo = [
    {
      img: 'automovil.png',
      seleccionado: true
    },
    {
      img: 'campero.png',
      seleccionado: false
    },
    {
      img: 'camioneta.png',
      seleccionado: false
    },
    {
      img: 'motocarro.png',
      seleccionado: false
    },
    {
      img: 'cuatrimoto.png',
      seleccionado: false
    },
    {
      img: 'microbus.png',
      seleccionado: false
    },
];

colores = [
  {
    img: 'amarillo.png',
    seleccionado: true
  },
  {
    img: 'azul_bandera.png',
    seleccionado: false
  },
  {
    img: 'azul.png',
    seleccionado: false
  },
  {
    img: 'blanco.png',
    seleccionado: false
  },
  {
    img: 'morado.png',
    seleccionado: false
  },
  {
    img: 'naranja.png',
    seleccionado: false
  },
  {
    img: 'negro.png',
    seleccionado: false
  },
  {
    img: 'rojo.png',
    seleccionado: false
  },
  {
    img: 'verde.png',
    seleccionado: false
  },
];

tipoVehiculoSlides = {
  slidesPerView: 3.5
};
colorSlides = {
  slidesPerView: 6.0
};
  constructor() { }

  ngOnInit() {
  }

  seleccionado_tipo_vehiculo (vehiculos) {
    this.tipo_vehiculo.forEach( img => img.seleccionado = false );
    vehiculos.seleccionado = true;
  }
  seleccionado_color (color) {
    this.colores.forEach( img => img.seleccionado = false );
    color.seleccionado = true;
  }
}
