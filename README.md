
# externs

This project can be used to generate and maintain Javascript foreign dependencies for ClojureScript using the excellent cljsjs/packages.

This project is just a POC. Please don't use it, yet.

I've shameless copied code for generating the externs from jmmk/javascript-externs-generator. My hat tip to [Michael](https://github.com/jmmk) for his work.

## Rationale

Maintaing externs for cljsjs/packages can be quite cumbersome. Quite often, they can be created using http://www.dotnetwise.com/Code/Externs/ or jmmk/javascript-externs-generator.

I've created an app, which when given an appropriate edn file, can generate the necessary extern and the boot file for packages.

An example edn file is:

```clojure
{:lib-version "4.12.0"
 :version     "2"
 :file        "https://cdnjs.cloudflare.com/ajax/libs/vis/{version}/vis.js"
 :file-min    "https://cdnjs.cloudflare.com/ajax/libs/vis/4.12.0/vis.min.js"
 :object      "vis"
 :package     "vis"
 :url         "http://visjs.org/"
 :scm         "https://github.com/almende/vis"
 :description "Dynamic, browser-based visualization library"}
```

## Requirements

* JDK 1.7+
* Leiningen 2.5.3
* node.js 5.1.1 [This is done to match the verion of node.js being used in Electron v0.36.5]

On Mac/Linux, installing node.js using [Node Version Manager](https://github.com/creationix/nvm) is recommended.

This project uses Electron v0.36.5. Please check [Electron's GitHub page](https://github.com/atom/electron) for the latest version. The version is specified in `Gruntfile.js` under the `Grunt Config` section.

## Setup

On Mac/Linux:

```
scripts/setup.sh
```

On Windows:

```
scripts\setup.bat
```

This will install the node dependencies for the project, along with grunt and will also run `grunt setup`.


## Running the app

Build the ClojureScript Code:

```
grunt cljsbuild-prod
```

Now launch the electron app with the parameter of `data.edn`:

```
grunt launch:data.edn
```

## Sample usage

```
git clone https://github.com/ducky427/packages packages
git clone https://github.com/ducky427/externs
cd externs
grunt cljsbuild-prod
grunt launch:../packages/vis/data.edn
```
