const colors = ['yellow', 'blue', 'cyan', 'magenta', 'green', 'gray'];

function determineColorForIndex(index) {
    const noOfColors = colors.length;

    if (index < 0) {
        return determineColorForIndex(Math.abs(index));
    }

    if (index >= noOfColors) {
        return determineColorForIndex(index - noOfColors);
    }

    return colors[index];
}

exports.determineColorForIndex = determineColorForIndex;
exports.colors = colors;
