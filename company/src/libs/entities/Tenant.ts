export interface TenantData {
 tenantName:string
}

export class Tenant {
  tenantName:string

  constructor({tenantName }: TenantData) {
    this. tenantName = tenantName
  }
}
