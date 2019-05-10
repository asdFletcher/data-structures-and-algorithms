'use strict';

function createBlankDataset(count, opacity) {
  const colors = ['red', 'blue', 'green', 'orange', 'black', 'purple', 'violet', 'brown', 'aquamarine', 'yellow'];

  const dataset = [];

  for (let i = 0; i < count; i += 1) {
    dataset.push({
      // label: i,
      pointBorderColor: 'rgba(0, 0, 0, 0)',
      pointBackgroundColor: `rgba(0, 0, 0, ${opacity / 100})`,
      pointRadius: '2',
      showLine: false,
      labels: {
        display: false,
      },
    });
  }

  return dataset;
}

module.exports = createBlankDataset;
