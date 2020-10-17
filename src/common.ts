export interface CompanyCSVItem {
  company_id: string,
  name: string,
  parent: string
}

export interface CompaniesData {
  [key: string]: {
    name: string,
    parent: string,
    owned: string[],
    land: number
  }
}

export interface LandCSVItem {
  land_id: string
  company_id: string
}
