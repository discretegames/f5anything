# Change Log

All notable changes to the
["F5 Anything" VSCode extension](https://marketplace.visualstudio.com/items?itemName=discretegames.f5anything)
will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). Dates are YYYY-MM-DD.

## [1.2.0] - 2022-08-27

-   Added optional `"vscCommand"` configuration property that allows an internal VSCode command
(from the Ctrl+Shift+P menu) to be run alongside the normal terminal command.
-   Made the `"command"` configuration property optional and default to `""` so `"vscCommand"` can be used by itself.

## [1.1.0] - 2021-10-13

-   Added `"terminalName"` configuration property to allow changing the default "F5 Anything" terminal title.
-   Added full and basic premade launch configurations.
Full has all configuration properties whereas basic has only required ones.
-   Commands that are not strings will be converted to strings rather than displaying an error.

## [1.0.2] - 2021-10-09

-   Changed VS Marketplace icon and color.

## [1.0.1] - 2021-09-26

-   Tweaks to readme and description.

## [1.0.0] - 2021-09-25

Skipping to version 1.0.0 for "official" release.

No further development of this extension is planned except for bugfixes and tweaks.

## [0.0.1] - 2021-09-25

Initial release.

-   All core features implemented and manually tested. Including:
    -   Running arbitrary terminal commands from a launch.json configuration.
    -   Option to show terminal or not.
    -   Option of which terminal index to send command to.
-   Wrote readme.
-   Icon made.
-   Example workspace made.
