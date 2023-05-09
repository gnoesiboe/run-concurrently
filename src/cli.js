#!/usr/bin/env node

const argv = require('yargs')
    .command(
        'run-concurrent-from-config [task]',
        'Uses concurrently to run the supplied task from a configuration file.',
        (yargs) => {
            yargs.positional('task', {
                describe: "Task to execute. Defaults to 'build'",
                type: 'string',
            });
        }
    )
    .option('config', {
        alias: 'c',
        type: 'string',
        describe:
            'Server path to the configuration file used. (can be part of package.json if desirable)',
    })
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        default: false,
    })
    .help('h')
    .alias('h', 'help').argv;

const args = argv._;
const task = args[0] || 'build';
const configFilePath = argv.config || `${process.cwd()}/package.json`;
const verbose = argv.verbose;
const {
    logSection,
    logDebug,
    logError,
    logSuccess,
} = require('./utility/consoleHelper');

logSection('Parse config file');

const { getConfigForTask } = require('./utility/configHelper');
const configForTask = getConfigForTask(task, configFilePath);

if (verbose) {
    logDebug('With configuration:', '\n');
    logDebug(configForTask);
    logDebug(''); // line break
}

logSuccess('done', '\n');

logSection('Run concurrently');

const concurrently = require('concurrently');
const {
    convertTaskConfigurationToConcurrentlyArguments,
} = require('./utility/concurrentlyArgumentsHelper');

const [commands, options] =
    convertTaskConfigurationToConcurrentlyArguments(configForTask);

if (verbose) {
    logDebug('With commands:\n');
    logDebug(commands);

    logDebug('\nWith options:\n');
    logDebug(options);
    logDebug(''); // line break
}

concurrently(commands, options).then(
    () => {
        logSuccess('\ndone');
    },
    (errorResponse) => {
        const commandWithError = errorResponse.find(
            (closeEvent) => closeEvent.exitCode > 0
        );

        logError('\nOne of tasks returned error:');
        logDebug(commandWithError);

        process.exit(commandWithError.exitCode);
    }
);
