export interface Usuario {
    id?: string;
    name?: string;
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

export interface Car {
    id?: string;
    board?: string;
    picture?: string;
    car_type_id?: string;
    cilindraje_id?: string;
    brand_id?: string;
    user_id?: string;
    color_id?: string;
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
