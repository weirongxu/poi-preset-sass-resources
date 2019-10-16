const sassResourcesLoader = require.resolve('sass-resources-loader')

function injectResources(rule, resources) {
  const options = {
    resources,
  }

  rule.oneOfs.store.forEach(rule => {
    rule
      .use('sass-resources-loader')
        .loader(sassResourcesLoader)
        .options(options)
  })
}

/**
 * Add sass-resources support to Poi.
 * @name sassResourcesPreset
 * @param {Object} api - poi api
 * @param {Object} options - plugin options
 * @param {String|String[]} [options.resources] - resources paths
 * @param {String[]} [options.scope=['scss', 'sass']] - plugin scope
 *
 */
exports.apply = (api, {
  scope = [
    'scss',
    'sass',
  ],
  resources,
}) => {
  if (!resources) {
    throw new Error('Missing required parameter: "resources"')
  }

  api.hook('createWebpackChain', config => {
    [
      'sass',
      'scss',
    ].forEach(ruleName => {
      if (scope.includes(ruleName)) {
        injectResources(config.module.rule(ruleName), resources)
      }
    })
  })
}
