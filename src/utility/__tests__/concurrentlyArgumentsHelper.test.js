const {
    convertTaskConfigurationToConcurrentlyArguments,
} = require('./../concurrentlyArgumentsHelper');

describe('concurrentlyArgumentsHelper', () => {
    describe('With a valid configuration supplied', () => {
        it('should return the correponding commands and options for concurrently', () => {
            const config = {
                subTasks: [
                    {
                        workingDirectory: './assets/admin',
                        command: 'npm run build',
                        name: 'admin',
                    },
                    {
                        workingDirectory: './assets/website',
                        command: 'npm run build',
                        name: 'website',
                    },
                ],
                options: {
                    prefixLength: 20,
                },
            };

            const [
                commands,
                options,
            ] = convertTaskConfigurationToConcurrentlyArguments(config);

            expect(commands).toEqual([
                {
                    command: 'cd ./assets/admin && npm run build',
                    name: 'admin',
                    prefixColor: 'yellow.bold',
                },
                {
                    command: 'cd ./assets/website && npm run build',
                    name: 'website',
                    prefixColor: 'blue.bold',
                },
            ]);

            expect(options).toEqual({
                killOthers: ['failure', 'success'],
                prefixLength: 20,
            });
        });
    });
});
