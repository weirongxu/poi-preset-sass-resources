# poi-preset-sass-resources

Add [sass-resources-loader](https://github.com/shakacode/sass-resources-loader) support to vue component.

## Install

```sh
npm i -g poi-preset-sass-resources
```

## Usage

```javascript
// poi.config.js
module.exports = {
  presets: [
    require('poi-preset-sass-resources')({
      resources: 'path/to/file.scss'
    })
  ]
}
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### sassResourcesPreset

Add sass-resources support to Vue.

**Parameters**

-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `options.resources` **([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>)?** 
    -   `options.scope` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>**  (optional, default `['vue/scss','vue/sass','scss','sass']`)
