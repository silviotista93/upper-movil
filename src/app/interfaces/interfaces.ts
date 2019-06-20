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
    id?: string;
    board?: string;
    picture?: string;
    car_type_id?: string;
    cilindraje_id?: string;
    brand_id?: string;
    color_id?: string;
    user_id?: string;
    seleccionado?: boolean;
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
    created_at?: any;
    car?: string;
}

export interface Car_suscription {
    id?: string,
    subscription_id?: string,
    cars_id?: string,
    created_at?: any,
    updated_at?: any,
    car?: any;
}

export interface opciones {
    id?: string;
    opcion: string;
}
// #endregion
