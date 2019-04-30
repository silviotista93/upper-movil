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
}


export interface ComponentMenu {
    title: string;
    url: string;
    icon: string;
}
