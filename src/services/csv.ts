import * as csv from 'csv-parser'
import * as fs from 'fs'
import { CompanyCSVItem, CompaniesData, LandCSVItem } from '../common'
import config from '../config'

const transformCompany = ({ company_id: id, name, parent }: CompanyCSVItem): CompaniesData =>
  ({ [id]: { owned: [], name, parent: parent || null, land: 0 } })

export const loadCompanies = (): Promise<CompaniesData> => new Promise((resolve, reject) => {
  let results = {};

  fs.createReadStream(config.dataFiles.companies)
    .pipe(csv())
    .on('data', (data) => {
      results = { ...results, ...transformCompany(data) }
    })
    .on('error', (error) => {
      reject(error)
    })
    .on('end', () => {
      resolve(results)
    });
})

export const loadLand = (): Promise<LandCSVItem[]> => new Promise((resolve, reject) => {
  const results = [];

  fs.createReadStream(config.dataFiles.land)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('error', (error) => {
      reject(error)
    })
    .on('end', () => {
      resolve(results)
    });
})