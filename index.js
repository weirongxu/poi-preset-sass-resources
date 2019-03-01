const sassResourcesLoader = require.resolve('sass-resources-loader')

function injectResources(rule, resources) {
  const options = {
    resources,
  }

  const moduleQueryRule = rule.oneOf('module-query')
  const moduleExtRule = rule.oneOf('module-ext')
  const normalRule = rule.oneOf('normal')

  ;[moduleQueryRule, moduleExtRule, normalRule].forEach(rule => {
    rule
      .use('sass-resources-loader')
        .loader(sassResourcesLoader)
        .options(options)
  })
}

/**
 * Add sass-resources support to Poi.
 * @name sassResourcesPreset
 * @param {Object} options
 * @param {String|String[]} [options.resources]
 * @param {String[]} [options.scope=['scss', 'sass']]
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
