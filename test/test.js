const path = require('path')
const fs = require('fs')
const glob = require('glob')
const test = require('ava')
const {poi} = require('./_utils')

const distPath = path.resolve(__dirname, 'fixtures/dist')
const resourcesPath = path.resolve(__dirname, 'fixtures/common.scss')

test('should required resources', t => {
  const cmd = poi('index.js', 'miss-resources', {})
  t.is(cmd.status, 1)
  t.true(cmd.output.toString().includes('Missing required parameter: resources'))
})

test('resources scss', t => {
  const cmd = poi('index.js', 'resources-scss', {
    resources: resourcesPath,
  })
  t.is(cmd.status, 0)
  const [clientCss] = glob.sync(path.resolve(distPath, 'resources-scss/main.*.css'))
  const cssContent = fs.readFileSync(clientCss).toString()
  t.true(cssContent.includes('display:flex'))
})
