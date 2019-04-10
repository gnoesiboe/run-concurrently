const { getConfigForTask } = require('./../configHelper');

const cwd = process.cwd();

describe('configHelper', () => {
    describe('With no config file to be found on the server', () => {
        it('should throw an error', () => {
            const errorCheck = () => {
                getConfigForTask('build', './nonExistant.json');
            };

            expect(errorCheck).toThrow(
                'We extract the configuration from the package.json file and expect it to be available from the directory you run this from'
            );
        });
    });

    describe('With a config json that does not contain the required root key', () => {
        it('should throw an error', () => {
            const errorCheck = () => {
                getConfigForTask(
                    'build',
                    `${cwd}/src/utility/__fixtures__/configWithoutRequiredKey.json`
                );
            };

            expect(errorCheck).toThrow(
                "Expecting there to be a 'concurrentTasks' key in the package.json to extract the configuration from"
            );
        });
    });

    describe("With a config json that doesn't contain a setup for the required task", () => {
        it('should throw an error', () => {
            const task = 'build';
            const configFilePath = `${cwd}/src/utility/__fixtures__/configWithoutSetupForBuildTask.json`;

            const errorCheck = () => {
                getConfigForTask(task, configFilePath);
            };

            expect(errorCheck).toThrow(
                `Missing configuration in config file (${configFilePath}) for '${task}' task`
            );
        });
    });

    describe("With a config json that doesn't contain the required keys for a sub-task", () => {
        it('should throw an error', () => {
            const task = 'build';
            const configFilePath = `${cwd}/src/utility/__fixtures__/configWithoutRequiredSubTaskKey.json`;

            const errorCheck = () => {
                getConfigForTask(task, configFilePath);
            };

            expect(errorCheck).toThrow();
        });
    });

    describe('With a valid task configuration', () => {
        it('should return the correct configuration', () => {
            const configFilePath = `${cwd}/src/utility/__fixtures__/validConfig.json`;
            const config = getConfigForTask('build', configFilePath);

            expect(config).toEqual({
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
            });
        });
    });
});
