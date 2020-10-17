import { getCompanyFromRoot } from '../../src/modules/fromRoot';

describe('getCompanyFromRoot', () => {
  it('will return the correct data', () => {
    const data = getCompanyFromRoot('A', {
      A: {
        name: 'Company A',
        parent: 'B',
        owned: [],
        land: 50
      },
      B: {
        name: 'Company B',
        parent: 'C',
        owned: ['A'],
        land: 120,
      },
      C: {
        name: 'Company C',
        parent: null,
        owned: ['B'],
        land: 125
      }
    })

    const expectedOutput = {
      id: 'A',
      name: 'Company A',
      land: 50,
      owned: [],
      parent: {
        id: 'B',
        name: 'Company B',
        land: 120,
        owned: [{
          name: 'Company A',
          land: 50
        }],
        parent: {
          id: 'C',
          name: 'Company C',
          land: 125,
          owned: [{
            name: 'Company B',
            land: 120
          }],
          parent: null
        }
      }
    }

    expect(data).toEqual(expectedOutput);
  });
});