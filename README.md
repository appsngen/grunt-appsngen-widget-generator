# grunt-appsngen-widget-generator

> Grunt task for generating Appsngen widget from Polymer component.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install --save-dev grunt-appsngen-widget-generator
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-appsngen-widget-generator');
```

## The "appsngen-widget-generator" task

### Overview
In your project's Gruntfile, add a section named `appsngen-widget-generator` to the data object passed into `grunt.initConfig()`.

> For correct work of task tag name should be the same as `name` property in `bower.json`

```js
grunt.initConfig({
    "appsngen-widget-generator": {
        options: {
            // Task-specific options go here.
        }
    },
});
```

### Options

#### options.id
Type: `String`
Default value: will be received from `name` property in `bower.json`, any passed value will have higher priority

Appsngen widget ID.

#### options.title
Type: `String`
Default value: will be received from `name` property in `bower.json` by replacing all `-` with whitespaces and capitalizing all words, any passed value will have higher priority

Appsngen widget title.

#### options.version
Type: `String`
Default value: will be received from `version` property in `bower.json`, any passed value will have higher priority

Appsngen widget version.

#### options.description
Type: `String`
Default value: will be received from `description` property in `bower.json`, any passed value will have higher priority

Appsngen widget description.

#### options.supportedDimensions
Type: `Array`
Default value: will be received from `supportedDimensions` property in `bower.json`, any passed value will have higher priority

List of supported dimensions (`SMALL`, `MEDIUM`, `LARGE`).

#### options.datasources
Type: `Array`
Default value: will be received from `datasources` property in `bower.json`, any passed value will have higher priority

List of used datasources in widget.
