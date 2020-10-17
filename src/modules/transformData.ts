import { CompaniesData, LandCSVItem } from '../common'

export const getTotalLandOwned = (companyId: string, companies: CompaniesData): number => {
  return companies[companyId].owned.reduce((acc, companyId) => acc + getTotalLandOwned(companyId, companies), companies[companyId].land)
}

export const transformCompanies = (companies: CompaniesData): CompaniesData => {
  Object.entries(companies).forEach(([companyId, company]) => {
    if (company.parent) {
      companies[company.parent].owned.push(companyId)
    }
  });

  return companies
}

export const addOwnedLandToCompanies = (land: LandCSVItem[], companies: CompaniesData): CompaniesData => {
  land.forEach(({ company_id }) => {
    if (companies[company_id]) {
      companies[company_id].land += 1
    }
  });

  return companies
}

export const addTotalLandToCompanies = (companies: CompaniesData): CompaniesData => {
  Object.entries(companies).map(([companyId, company]) => {
    company.land = getTotalLandOwned(companyId, companies)
  })

  return companies
}
