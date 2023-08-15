export interface TenantData {

    name: string;

}

export class Tenant {

    name: string;


    constructor({ name }: TenantData) {
        this.name = name;

    }
}
