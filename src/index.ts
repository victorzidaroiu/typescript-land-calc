import { loadCompanies, loadLand } from './services/csv';
import * as parseArgs from 'minimist';
import { addTotalLandToCompanies, addOwnedLandToCompanies, transformCompanies } from './modules/transformData'
import { getCompanyFromRootPrintLines } from './modules/fromRoot'

(async () => {
  const companiesRawData = await loadCompanies()
  const landRawData = await loadLand()
  const companies = addTotalLandToCompanies(addOwnedLandToCompanies(landRawData, transformCompanies(companiesRawData)))

  const commandLineArguments = parseArgs(process.argv.slice(2))
  const mode = commandLineArguments.mode
  const companyId = commandLineArguments._[0]
  switch (mode) {
    case 'from_root':
      getCompanyFromRootPrintLines(companyId, companies).forEach(line => console.log(line))
  }
})();