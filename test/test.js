const path = require('path')
const fs = require('fs')
const glob = require('glob')
const test = require('ava')
const {poi} = require('./_utils')

const distPath = path.resolve(__dirname, 'fixtures/dist')
const scssResourcesPath = path.resolve(__dirname, 'fixtures/common.scss')
const sassResourcesPath = path.resolve(__dirname, 'fixtures/common.sass')

test('should required resources', t => {
  const cmd = poi('index.js', 'miss-resources', `{
    plugins: [require('../../')({})],
  }`)
  t.is(cmd.status, 1)
  t.true(cmd.output.toString().includes('Missing required parameter: "resources"'))
})

const testBuild = (t, sass, dist, resources) => {
  const cmd = poi('index.js', dist, `{
    plugins: [require('../../')({
      resources: ${JSON.stringify(resources)},
    })],
    define: {
      SASS: ${JSON.stringify(sass)},
    },
  }`)
  console.log(cmd.stdout.toString())
  console.log(cmd.stderr.toString())
  t.is(cmd.status, 0)
  const [clientCss] = glob.sync(path.resolve(distPath, `${dist}/main.*.css`))
  const cssContent = fs.readFileSync(clientCss).toString()
  t.true(cssContent.includes('display:flex'))
}

test('resources scss', t => {
  testBuild(
    t,
    false,
    'resources-scss',
    scssResourcesPath
  )
})

test('resources scss array', t => {
  testBuild(
    t,
    false,
    'resources-scss-array',
    [scssResourcesPath]
  )
})

test('resources sass', t => {
  testBuild(
    t,
    true,
    'resources-sass',
    sassResourcesPath
  )
})

test('resources sass array', t => {
  testBuild(
    t,
    true,
    'resources-sass-array',
    [sassResourcesPath]
  )
})
