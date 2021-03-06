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
  account?: string;
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
  car_suscription?: any;
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

//#region CILINDRAJE, MARCA, COLOR, TIPO DE CARRO 
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
//#endregion

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
  id?: number;
  latitude?: number;
  longitude?: number;
  status?: string;
  sign?: any;
  description?: any;
  car_detail_subscription_id?: number;
  user_id?: any;
  washer_id?: any;
  address?: any;
  created_at?: string;
  updated_at?: string;
  car_detail_suscription?: CarDetailSuscription;
}


export interface CarSuscription {
  id?: any,
  cars_id?: any;
  created_at?: any;
  updated_at?: any;
  date_end?: any;
  date_start?: any;
  plan_id?: any;
  state?: any;
}

export interface CarDetailSuscription {
  id?: any,
  carsus_id?: any;
  plan_type_id?: any;
  quantity?: any;
  created_at?: any;
  updated_at?: any;
}

export interface opciones {
  id?: string;
  opcion: string;
}

export interface Plan {
  id?: number;
  name?: string;
  description?: string;
  picture?: string;
  time?: string;
  price?: number;
  seleccionado?: boolean;
  created_at?: string;
  updated_at?: string;
  wash_type?: Washtype[];
}

export interface Washtype {
  id?: number;
  type?: string;
  price?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  pivot?: Pivot;
}

export interface Pivot {
  plan_id?: number;
  type_wash_id?: number;
  quantity?: number;
}
// #endregion


export interface Suscripciones {
  id?: number;
  subscription_id?: number;
  cars_id?: number;
  created_at?: any;
  updated_at?: any;
  car: Car;
  suscriptions: Suscription;
}

export interface Suscription {
  id?: number;
  plan_id?: number;
  date_start?: string;
  date_end?: string;
  state?: any;
  created_at?: string;
  updated_at?: string;
  plans?: Plan;
  car?: Car[];
}


export interface Detailorder {
  id?: number;
  latitude?: number;
  longitude?: number;
  status?: number;
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
  car_id?: any;
  plan_id?: any;
}

