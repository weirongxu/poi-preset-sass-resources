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
 * @param {String[]} [options.scope=['vue/scss', 'vue/sass', 'module.scss', 'module.sass', 'scss', 'sass']]
 *
 */
module.exports = ({
  scope = [
    'vue/scss',
    'vue/sass',
    'scss',
    'sass',
    'module.scss',
    'module.sass',
  ],
  resources,
}) => {
  if (!resources) {
    throw new Error('Missing required parameter: "resources"')
  }

  return poi => {
    poi.chainWebpack(config => {
      config.module
        .rule('vue')
          .use('vue-loader')
            .tap(opt => injectResourcesToVue(opt, resources, scope))
            .end()
      Object.entries({
        'module.sass': 'sass-module',
        'module.scss': 'scss-module',
        'sass': 'sass',
        'scss': 'scss',
      }).forEach(([ext, rule]) => {
        if (scope.includes(ext)) {
          injectResources(config.module.rule(rule), resources)
        }
      })
    })
  }
}
