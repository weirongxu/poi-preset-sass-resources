function injectResourcesToVue(options, presetOptions) {
  const loader = {
    loader: 'sass-resources-loader',
    options: {
      resources: presetOptions.resources,
    },
  }
  if (presetOptions.scope.includes('vue/sass')) {
    options.loaders.sass.push(loader)
  }
  if (presetOptions.scope.includes('vue/scss')) {
    options.loaders.scss.push(loader)
  }
  return options
}

function injectResources(rule, presetOptions) {
  const options = {
    resources: presetOptions.resources,
  }
  rule
    .use('sass-resources-loader')
      .loader('sass-resources-loader')
      .options(options)
}

/**
 * Add sass-resources support to Vue.
 * @name sassResourcesPreset
 * @param {Object} options
 * @param {String|String[]} [options.resources]
 * @param {String[]} [options.scope=['vue/scss', 'vue/sass', 'scss', 'sass']]
 *
 */
module.exports = options => {
  if (!options.resources) {
    throw new Error('Missing required parameter: resources')
  }

  return poi => {
    options = poi.merge(options, {
      scope: ['vue/scss', 'vue/sass', 'scss', 'sass'],
    })

    poi.extendWebpack(config => {
      config.module
        .rule('vue')
          .use('vue-loader')
            .tap(opt => injectResourcesToVue(opt, options))
            .end()
      if (options.scope.includes('sass')) {
        injectResources(config.module.rule('sass'), options)
      }
      if (options.scope.includes('scss')) {
        injectResources(config.module.rule('scss'), options)
      }
    })
  }
}
