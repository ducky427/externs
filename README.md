
# externs-electron

## Requirements

* JDK 1.7+
* Leiningen 2.5.3
* node.js 5.1.1 [This is done to match the verion of node.js being used in Electron v0.36.4]

On Mac/Linux, installing node.js using [Node Version Manager](https://github.com/creationix/nvm) is recommended.

This project uses Electron v0.36.4. Please check [Electron's GitHub page](https://github.com/atom/electron) for the latest version. The version is specified in `Gruntfile.js` under the `Grunt Config` section.

## Setup

On Mac/Linux:

```
scripts/setup.sh
```

On Windows:

```
scripts\setup.bat
```

This will install the node dependencies for the project, along with grunt and bower and will also run `grunt setup`.


## Running the app

Build the ClojureScript Code:

```
grunt cljsbuild-prod
```

Now launch the electron app with the parameter of `data.edn`:

```
grunt launch:data.edn
```

## Grunt commands

To run a command, type `grunt <command>` in the terminal.


| Command       | Description                                                                               |
|---------------|-------------------------------------------------------------------------------------------|
| setup         | Download electron project, installs bower dependencies and setups up the app config file. |
| launch        | Launches the electron app                                                                 |
| release       | Creates a Win/OSX/Linux executables                                                       |
| outdated      | List all outdated clj/cljs/node/bower dependencies                                        |

## Leiningen commands

To run a command, type `lein <command>` in the terminal.

| Command       | Description                                                                               |
|---------------|-------------------------------------------------------------------------------------------|
| cljfmt fix    | Auto-formats all clj/cljs code. See [cljfmt](https://github.com/weavejester/cljfmt)       |
| kibit         | Statically analyse clj/cljs and give suggestions                                          |
