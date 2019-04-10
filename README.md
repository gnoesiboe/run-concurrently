# `run-concurrently`

Node cli task that uses [`concurrently`](https://www.npmjs.com/package/concurrently) combined with a JSON configuration in `package.json` or seperate file, to make concurrent tasks better readable and easier to manage. It for instance can be used to build a project in one command, as it consists of seperate individual applications. Within our organisation we plan on using it for building several seperate webpack applications.

## Use

1. Add your task configuration to your application's `package.json` or seperate json file.
2. Use the cli command to execute the tasks concurrently
3. Setup shortcuts in the root of your application for easier execution (for instance `scripts` in `package.json` or `make`)

### Configuration

Can be placed in `package.json`, located in the location that this task is run from:

_Format:_

```json
{
    ...,
    "concurrentTasks": {
        "<task_name>": {
            "subTasks": [
                {
                    "workingDirectory": "<directory_to_execute_code_in>",
                    "command": "<command_to_execute_in_working_directory>",
                    "name": "<prefix_that_is_used_to_distinguish_seperate_tasks_output>"
                },
                ...
            ]
        }
    }
}


```

Example, added to `package.json`:

```json
{
    ...,
    "concurrentTasks": {
        "build": {
            "subTasks": [
                {
                    "workingDirectory": "./assets/a",
                    "command": "npm run build",
                    "name": "website"
                },
                {
                    "workingDirectory": "./assets/b",
                    "command": "npm run build",
                    "name": "admin"
                },
                {
                    "workingDirectory": "./assets/c",
                    "command": "npm run build",
                    "name": "frontend"
                }
            ],
            "options": {
                "prefixLength": 20
            }
        },
        "build:watch": {
            "subTasks": [...]
        }
    }
}
```

You can also place the configuration outside the `package.json` and into a seperate file. For this task to find it, you have to use the `--config` option to supply the server path to it. See below for more information.

### CLI command usage

#### Arguments

| name   | description                                | type     | required | default value |
| ------ | ------------------------------------------ | -------- | -------- | ------------- |
| `task` | The task to execute from the configuration | `string` | `false`  | 'build'       |

#### Options

| name                | description                                                  | type     | required | default value                                         |
| ------------------- | ------------------------------------------------------------ | -------- | -------- | ----------------------------------------------------- |
| `--config` or `-c`  | Path to an alternate configuration file that you want to use | `string` | `false`  | fallback on package.json in current working directory |
| `--help` or `-h`    | Prints information about how to use this cli command         | na.      | `false`  | na.                                                   |
| `--verbose` or `-v` | If flagged with verbose, extra debug output is displayed     | na.      | `false`  | na.                                                   |

#### Example

```bash
run-concurrently build --config=/some/dir/runConcurrentlyConfig.json --verbose
```

## Developmemt

@todo

### Running tests

@todo
