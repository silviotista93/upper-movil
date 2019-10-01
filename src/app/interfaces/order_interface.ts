export interface Order {
  id?: number;
  latitude?: number;
  longitude?: number;
  status?: number;
  sign?: any;
  description?: any;
  car_detail_subscription_id?: number;
  user_id?: number;
  washer_id?: any;
  address?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Plantypewash {
  id: number;
  type: string;
  price: string;
  description: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot3;
}

export interface Pivot3 {
  order_id: number;
  plan_type_washes_id: number;
}

export interface Suscription {
  id: number;
  plan_id: number;
  date_start: string;
  date_end: string;
  created_at: string;
  updated_at: string;
  car: Car[];
  plans: Plans;
}

export interface Plans {
  id: number;
  name: string;
  description: string;
  picture: string;
  time: string;
  price: number;
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
  pivot: Pivot2;
}

export interface Pivot2 {
  plan_id: number;
  type_wash_id: number;
  quantity: number;
}

export interface Car {
  id: number;
  board: string;
  picture: string;
  car_type_id: number;
  cilindraje_id: number;
  brand_id: number;
  color_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
  brand: Brand;
}

export interface Brand {
  id: number;
  name: string;
  picture?: any;
  created_at: string;
  updated_at: string;
}

export interface Pivot {
  subscription_id: number;
  cars_id: number;
}
