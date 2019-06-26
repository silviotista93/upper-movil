export interface Usuario {
    id?: string;
    names?: string;
    last_name?: string;
    email?: string;
    password?: string;
    slug?: string;
    avatar?: string;
    phone_1?: string;
    phone_2?: string;
    social_acounts?: string;
    roles?: string;
}

export interface ComponentMenu {
    title: string;
    url: string;
    icon: string;
}

export interface RolesUsers {
    id?: string;
    roles_id?: string;
    users_id?: string;
}

//#region interfaces de Carros
export interface Car {
  subscription?: any;
    id?: number;
    board?: string;
    picture?: string;
    car_type_id?: string;
    cilindraje_id?: string;
    brand_id?: string;
    color_id?: string;
    user_id?: string;
    seleccionado?: boolean;
    pivot?: Pivot3;
}
export interface Brand {
    id?: string;
    name?: string;
    picture?: string;
}

export interface Color {
    id?: string;
    name?: string;
    picture?: string;
}

export interface Cilindraje {
    id?: string;
    name?: string;
    picture?: string;
}

export interface Car_type {
    id?: string;
    name?: string;
    picture?: string;
}

export interface Type_Wash {
    id?: string;
    type?: string;
    price?: string;
    description?: string;
    seleccionado?: boolean;
}
export interface Plan_type_Wash {
    id?: string;
    type_wash_id?: string;
    plan_id?: string;
    quantity?: string;
    pivot?: Pivot2;

}
export interface Order {
    id?: string;
    latitude?: any;
    longitude?: any;
    sign?: string;
    status?: any;
    description?: string;
    subscription?: string;
    subscription_cars_id?: string;
    suscription?: string;
    washer_id?: string;
    user_id?: string;
    address?: string;
    typesWash?: any;
    pivot?: any;
    created_at?: any;
    car?: string;
}

export interface Car_suscription {
    id?: string,
    subscription_id?: string;
    cars_id?: string;
    created_at?: any;
    updated_at?: any;
    car?: any;
}

export interface opciones {
    id?: string;
    opcion: string;
}

export interface Plan {
  id: number;
  name: string;
  description: string;
  picture: string;
  time: string;
  price: number;
  seleccionado?: boolean;
  created_at: string;
  updated_at: string;
  wash_type: Washtype[];
}

export interface Washtype {
  id: number;
  type: string;
  price: string;
  description: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface Pivot {
  plan_id: number;
  type_wash_id: number;
  quantity: number;
}
// #endregion


export interface Suscripciones {
  id: number;
  subscription_id: number;
  cars_id: number;
  created_at?: any;
  updated_at?: any;
  car: Car;
  suscriptions: Suscription;
}

export interface Suscription {
  id: number;
  plan_id: number;
  date_start: string;
  date_end: string;
  state: any;
  created_at: string;
  updated_at: string;
  plans: Plan;
  car?: Car[];
}


export interface Detailorder {
  id: number;
  latitude: number;
  longitude: number;
  status: number;
  sign?: any;
  description?: any;
  subscription_cars_id: number;
  user_id: number;
  washer_id?: any;
  address: string;
  created_at: string;
  updated_at: string;
  suscription: Suscription;
  plan_type_wash: Plan_type_Wash[];
}


export interface Pivot2 {
  order_id: number;
  plan_type_washes_id: number;
}


export interface Pivot3 {
  subscription_id: number;
  cars_id: number;
}

export interface CreateSuscription {
  car_id: number;
  plan_id: number;
}

