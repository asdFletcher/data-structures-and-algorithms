'use strict';

function createLogNData(startOfRange, endOfRange, color) {
  const data = [];
  const{ r, g, b, a } = color;

  if (startOfRange < endOfRange) {
    for (let i = startOfRange; i <= endOfRange; i += 1) {
      let y = Math.log2(i);
      data.push({ x: i, y: y });
    }
  } else {
    for (let i = startOfRange; i > endOfRange; i -= 1) {
      let y = Math.log2(i);
      data.push({ x: startOfRange-i, y: y });
    }
  }

  const formattedData = {
    label: 'Average',
    pointBorderColor: `rgba(${r}, ${g}, ${b}, ${a})`,
    pointBackgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
    pointRadius: '2',
    borderColor: `rgba(${r}, ${g}, ${b}, ${a})`,
    showLine: true,
    fill: false,
    labels: {
      display: true,
    },
    data: data,
  };

  return formattedData;
  // writeResultsToFile([formattedData], 'logn-from-' + startOfRange + '-to-' + endOfRange + '.json');
}

module.exports = createLogNData;
