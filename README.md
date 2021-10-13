# [F5 Anything](https://marketplace.visualstudio.com/items?itemName=discretegames.f5anything)

Lets you put any normal console command into a VSCode launch.json configuration
so you can run it with F5 (or whatever your normal run/debug keybind is).

Simply install the extension then add a configuration like this to the
[launch.json](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations) file in the .vscode folder of your workspace:

```json
{
    "name": "F5 Anything: My Custom Command",
    "type": "f5anything",
    "request": "launch",
    "command": "echo Put your command here",
}
```

Replace the `echo Put your command here` with whatever command you want. It may include
[variables such as `${file}`](https://code.visualstudio.com/docs/editor/variables-reference).
When the launch configuration is run, the command will be run in a
[VSCode integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).

The full launch.json would look like:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "F5 Anything: My Custom Command",
            "type": "f5anything",
            "request": "launch",
            "command": "echo Put your command here",
        }
    ]
}
```

A quick way to add configurations is the "Add Configuration..." button on the bottom right of a launch.json.
Hit that and start typing "F5 Anything" for a premade configuration:

![adding configurations example screenshot](./configurations.png "Adding Configurations")

The basic configuration only has the required configuration properties (`"name"`, `"type"`, `"request"`, and `"command"`).
The full configuration has three additional preset properties, each of which are optional:

- `"terminalName"` (string, defaults to `"F5 Anything"`):
The name given to the dedicated integrated terminal F5 Anything creates for itself.

- `"terminalIndex"` (integer, defaults to `-1`):
The index of the integrated terminal in the VSCode terminal list to send commands to. When -1 or out of range
a dedicated terminal is created and used. Note that terminals are 0-indexed in order of creation, not by visual order.

- `"showTerminal"` (boolean, defaults to `true`):
Whether or not the terminal an F5 Anything command is sent to is given focus.

So, for example, this launch configuration will send commands to the terminal at index 0 but not switch focus to it:

```json
{
    "name": "Another Example",
    "type": "f5anything",
    "request": "launch",
    "command": "echo Hi",
    "terminalIndex": 0,
    "showTerminal": false
}
```

See [the example workspace](https://github.com/discretegames/f5anything/tree/main/exampleWorkspace)
for some more launch configuration examples.

## Resources

- [Change Log](https://marketplace.visualstudio.com/items/discretegames.f5anything/changelog)

- [GitHub Repo](https://github.com/discretegames/f5anything)

- [Marketplace Page](https://marketplace.visualstudio.com/items?itemName=discretegames.f5anything)

- [VSCode Predefined Variables Reference](https://code.visualstudio.com/docs/editor/variables-reference)
