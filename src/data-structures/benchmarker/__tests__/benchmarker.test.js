
const benchmarker = require('../benchmarker.js');

const calculateAverageFromSingleDataSet = benchmarker.calculateAverageFromSingleDataSet;

describe('avg data sets', () => {
  it('works with regular data no duplicatse in a single set', () => {
    let data = [
      {'data':[{'x':1,'y':3},{'x':2,'y':5},{'x':3,'y':0},{'x':4,'y':0}]},
      {'data':[{'x':1,'y':4},{'x':2,'y':2},{'x':3,'y':3},{'x':4,'y':2}]},
      {'data':[{'x':1,'y':5},{'x':2,'y':0},{'x':3,'y':3},{'x':4,'y':3}]},
      {'data':[{'x':1,'y':2},{'x':2,'y':3},{'x':3,'y':2},{'x':4,'y':2}]},
    ];

    let expected = [{'x':1,'y':14/4},{'x':2,'y':10/4},{'x':3,'y':8/4},{'x':4,'y':7/4}];

    let result = calculateAverageFromSingleDataSet(data);
    
    expect(result).toEqual(expected);
  });
  it('works with irregular data, duplicatse in a single set', () => {
    let data = [
      {'data':[{'x':1,'y':3},{'x':1,'y':100},{'x':2,'y':5},{'x':3,'y':0},{'x':4,'y':0}]},
      {'data':[{'x':1,'y':4},{'x':2,'y':2},{'x':3,'y':3},{'x':4,'y':2}]},
      {'data':[{'x':1,'y':5},{'x':2,'y':0},{'x':3,'y':3},{'x':4,'y':3}]},
      {'data':[{'x':1,'y':2},{'x':2,'y':3},{'x':3,'y':2},{'x':4,'y':2}]},
    ];

    let expected = [{'x':1,'y':114/5},{'x':2,'y':10/4},{'x':3,'y':8/4},{'x':4,'y':7/4}];

    let result = calculateAverageFromSingleDataSet(data);
    
    expect(result).toEqual(expected);
  });
});
