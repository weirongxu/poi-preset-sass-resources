# poi-preset-sass-resources

[![NPM version](https://img.shields.io/npm/v/poi-preset-sass-resources.svg?style=flat-square)](https://npmjs.com/package/poi-preset-sass-resources)
[![NPM downloads](https://img.shields.io/npm/dm/poi-preset-sass-resources.svg?style=flat-square)](https://npmjs.com/package/poi-preset-sass-resources)
[![Build Status](https://img.shields.io/travis/com/weirongxu/poi-preset-sass-resources.svg?style=flat-square)](https://travis-ci.com/weirongxu/poi-preset-sass-resources)

Add [sass-resources-loader](https://github.com/shakacode/sass-resources-loader) support to [Poi](https://github.com/egoist/poi).

## Install

```sh
npm i -g poi-preset-sass-resources
```

## Usage

```javascript
// poi.config.js
module.exports = {
  plugins: [
    {
      resolve: 'poi-preset-sass-resources'
      options: {
        resources: 'path/to/file.scss'
      }
    }
  ]
}
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [sassResourcesPreset](#sassresourcespreset)
    -   [Parameters](#parameters)

### sassResourcesPreset

Add sass-resources support to Poi.

#### Parameters

-   `api` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** poi api
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** plugin options
    -   `options.resources` **([String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>)?** resources paths
    -   `options.scope` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** plugin scope (optional, default `['scss','sass']`)
