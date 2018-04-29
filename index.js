function injectResourcesToVue(options, resources, scope) {
  const loader = {
    loader: 'sass-resources-loader',
    options: {
      resources,
    },
  }
  if (scope.includes('vue/sass')) {
    options.loaders.sass.push(loader)
  }
  if (scope.includes('vue/scss')) {
    options.loaders.scss.push(loader)
  }
  return options
}

function injectResources(rule, resources) {
  const options = {
    resources,
  }
  rule
    .use('sass-resources-loader')
      .loader('sass-resources-loader')
      .options(options)
}

/**
 * Add sass-resources support to Poi.
 * @name sassResourcesPreset
 * @param {Object} options
 * @param {String|String[]} [options.resources]
 * @param {String[]} [options.scope=['vue/scss', 'vue/sass', 'scss', 'sass']]
 *
 */
module.exports = ({
  scope = ['vue/scss', 'vue/sass', 'scss', 'sass'],
  resources,
}) => {
  if (!resources) {
    throw new Error('Missing required parameter: resources')
  }

  return poi => {
    poi.chainWebpack(config => {
      config.module
        .rule('vue')
          .use('vue-loader')
            .tap(opt => injectResourcesToVue(opt, resources, scope))
            .end()
      if (scope.includes('sass')) {
        injectResources(config.module.rule('sass'), resources)
      }
      if (scope.includes('scss')) {
        injectResources(config.module.rule('scss'), resources)
      }
    })
  }
}
