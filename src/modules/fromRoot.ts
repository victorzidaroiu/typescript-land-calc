import { CompaniesData } from '../common'

export interface CompaniesPrintData {
  id: string,
  name: string,
  parent: CompaniesPrintData | null,
  owned: {
    name: string,
    land: number
  }[],
  land: number
}

export const getPrintLines = (companies: CompaniesPrintData): string[] => {
  const line = `${companies.id}; ${companies.name} owner of ${companies.land} land parcels`

  if (companies.parent) {
    return [...getPrintLines(companies.parent), line]
  } else {
    return [line]
  }
}

export const generateTreeStructure = (indentSize: number): string => Array(indentSize).fill(' | ').join('')
export const getPrintOutput = (lines: string[]): string[] => lines.map((line, index) => `${generateTreeStructure(index)}${line}`)

export const getCompany = (companyId: string, companies: CompaniesData): {
  name: string
  land: number,
} => ({
  name: companies[companyId].name,
  land: companies[companyId].land
})

export const getCompanyFromRoot = (companyId: string, companies: CompaniesData): CompaniesPrintData => {
  const company = companies[companyId]

  if (!company) {
    return null
  }

  const owned = company.owned.map(companyId => getCompany(companyId, companies))

  const companyData = {
    id: companyId,
    name: company.name,
    land: company.land,
    owned,
    parent: null
  }

  if (!company.parent) {
    return companyData
  } else {
    companyData.parent = getCompanyFromRoot(company.parent, companies)

    return companyData
  }
}

export const getCompanyFromRootPrintLines = (companyId: string, companies: CompaniesData): string[] =>
  getPrintOutput(getPrintLines(getCompanyFromRoot(companyId, companies)))