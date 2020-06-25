const chalk = require('chalk');

exports.logSection = function (...args) {
    const decorate = chalk.magenta.bold.underline;

    console.log(decorate(...args), '\n');
};

exports.logDebug = function (...args) {
    console.debug(...args);
};

exports.logInfo = function (...args) {
    console.log(...args);
};

exports.logError = function (...args) {
    const decorate = chalk.red.bold;

    console.log(decorate(...args));
};

exports.logSuccess = function (...args) {
    const decorate = chalk.green;

    console.log(decorate(...args));
};
