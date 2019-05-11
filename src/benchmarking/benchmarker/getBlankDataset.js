'use strict';

function createBlankDataset(count) {
  const colors = ['red', 'blue', 'green', 'orange', 'black', 'purple', 'violet', 'brown', 'aquamarine', 'yellow'];

  const dataset = [];

  let { r, g, b, a } = this.ptColor;

  for (let i = 0; i < count; i += 1) {
    dataset.push({
      // label: i,
      pointBorderColor: `rgba(${r}, ${g}, ${b}, ${a})`,
      pointBackgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
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
