exports.convertTaskConfigurationToConcurrentlyArguments = function (
    configForTask
) {
    const { determineColorForIndex } = require('./colorHelper');

    const commands = configForTask.subTasks.map(
        ({ workingDirectory, name, command }, index) => {
            command = workingDirectory
                ? `cd ${workingDirectory} && ${command}`
                : command;

            const prefixColor = `${determineColorForIndex(index)}.bold`;

            return { command, name, prefixColor };
        }
    );

    const DEFAULT_OPTIONS = {
        killOthers: ['failure', 'success'],
    };

    const options = {
        ...DEFAULT_OPTIONS,
        ...configForTask.options,
    };

    return [commands, options];
};
